import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

type SnapReqBody = {
  orderId?: string;
};

export async function POST(req: Request) {
  try {
    const session = await auth();

    // ✅ FIX TS: session bisa null, jadi guard dulu
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any)?.id as string | undefined;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as SnapReqBody;
    const orderId = body.orderId;

    if (!orderId) {
      return NextResponse.json({ message: "orderId wajib dikirim" }, { status: 400 });
    }

    if (!process.env.MIDTRANS_SERVER_KEY) {
      return NextResponse.json(
        { message: "MIDTRANS_SERVER_KEY belum ada di .env.local" },
        { status: 500 }
      );
    }

    // ✅ Ambil order by ID milik user + include items
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: true, payment: true },
    });

    if (!order) {
      return NextResponse.json({ message: "Order tidak ditemukan." }, { status: 404 });
    }

    // ✅ status aman (kalau prisma typings kamu aneh, ini tetap jalan)
    const orderStatus = (order as any).paymentStatus as string | undefined;
    if (orderStatus && orderStatus !== "PENDING") {
      return NextResponse.json(
        { message: "Order ini tidak berstatus PENDING (tidak bisa dibayar)." },
        { status: 400 }
      );
    }

    const snap = new Midtrans.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const item_details = order.items.map((it) => ({
      id: it.produkId,
      price: it.price,
      quantity: it.quantity,
      name: it.name,
    }));

    const customerName =
      order.recipientName ?? session.user.name ?? "Customer";
    const customerEmail =
      session.user.email ?? "customer@mail.com";

    const parameter = {
      transaction_details: {
        order_id: order.orderCode,
        gross_amount: order.grossAmount,
      },
      item_details,
      customer_details: {
        first_name: customerName,
        email: customerEmail,
        phone: order.recipientPhone ?? "",
        shipping_address: {
          first_name: order.recipientName ?? "",
          phone: order.recipientPhone ?? "",
          address: order.addressLine ?? "",
          city: order.city ?? "",
          postal_code: order.postalCode ?? "",
          country_code: "IDN",
        },
      },
    };

    const trx = await snap.createTransaction(parameter);

    await prisma.orderPayment.upsert({
      where: { orderId: order.id },
      update: {
        snapToken: trx.token,
        redirectUrl: trx.redirect_url,
        transactionStatus: "pending",
      },
      create: {
        orderId: order.id,
        provider: "MIDTRANS",
        snapToken: trx.token,
        redirectUrl: trx.redirect_url,
        transactionStatus: "pending",
      },
    });

    return NextResponse.json({
      token: trx.token,
      redirectUrl: trx.redirect_url,
    });
  } catch (err: any) {
    console.error("MIDTRANS SNAP ERROR:", err);

    const msg =
      err?.ApiResponse?.error_messages?.[0] ||
      err?.message ||
      "Gagal membuat transaksi Midtrans.";

    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
