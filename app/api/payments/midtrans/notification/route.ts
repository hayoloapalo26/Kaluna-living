// app/api/payments/midtrans/notification/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const runtime = "nodejs";

// Midtrans docs: signature_key = sha512(order_id + status_code + gross_amount + server_key)
function verifySignature(payload: any) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return false;

  const orderId = String(payload?.order_id ?? "");
  const statusCode = String(payload?.status_code ?? "");
  const grossAmount = String(payload?.gross_amount ?? "");
  const signatureKey = String(payload?.signature_key ?? "");

  if (!orderId || !statusCode || !grossAmount || !signatureKey) return false;

  const raw = orderId + statusCode + grossAmount + serverKey;
  const expected = crypto.createHash("sha512").update(raw).digest("hex");
  return expected === signatureKey;
}

// Mapping status Midtrans -> status internal
function mapOrderStatus(transactionStatus?: string, fraudStatus?: string) {
  const t = (transactionStatus || "").toLowerCase();
  const f = (fraudStatus || "").toLowerCase();

  // success cases
  if (t === "capture") {
    // credit card capture bisa "challenge" / "accept"
    if (f === "challenge") return "PENDING";
    return "PAID";
  }
  if (t === "settlement") return "PAID";

  // pending / waiting payment
  if (t === "pending") return "PENDING";

  // failed/cancelled/expired
  if (t === "deny") return "FAILED";
  if (t === "cancel") return "CANCELLED";
  if (t === "expire") return "EXPIRED";

  return "PENDING";
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // ✅ verifikasi signature (penting)
    if (!verifySignature(payload)) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const orderCode = String(payload.order_id || "");
    if (!orderCode) {
      return NextResponse.json({ message: "order_id kosong" }, { status: 400 });
    }

    const nextStatus = mapOrderStatus(
      payload.transaction_status,
      payload.fraud_status
    );

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { orderCode },
        include: { items: true },
      });

      if (!order) {
        throw new Error("ORDER_NOT_FOUND");
      }

      const shouldDeduct =
        nextStatus === "PAID" && order.paymentStatus !== "PAID";
      const finalStatus =
        order.paymentStatus === "PAID" ? "PAID" : nextStatus;

      const insufficient: string[] = [];

      if (shouldDeduct && order.items.length > 0) {
        const produkList = await tx.produk.findMany({
          where: { id: { in: order.items.map((it) => it.produkId) } },
          select: { id: true, name: true, capacity: true },
        });

        const produkMap = new Map(
          produkList.map((p) => [p.id, { name: p.name, capacity: p.capacity }])
        );

        for (const item of order.items) {
          const produk = produkMap.get(item.produkId);
          const stock = Number(produk?.capacity || 0);
          const nextStock = Math.max(0, stock - item.quantity);

          if (stock < item.quantity) {
            insufficient.push(
              `${produk?.name || "Produk"} (stok ${stock})`
            );
          }

          await tx.produk.update({
            where: { id: item.produkId },
            data: { capacity: nextStock },
          });
        }
      }

      const updatedOrder = await tx.order.update({
        where: { orderCode },
        data: { paymentStatus: finalStatus as any },
      });

      await tx.orderPayment.upsert({
        where: { orderId: updatedOrder.id },
        update: {
          transactionStatus: String(payload.transaction_status ?? ""),
          fraudStatus: String(payload.fraud_status ?? ""),
          rawNotification: payload,
        },
        create: {
          orderId: updatedOrder.id,
          provider: "MIDTRANS",
          transactionStatus: String(payload.transaction_status ?? ""),
          fraudStatus: String(payload.fraud_status ?? ""),
          rawNotification: payload,
        },
      });

      return { orderId: updatedOrder.id, insufficient };
    });

    if (result.insufficient.length > 0) {
      console.warn(
        "STOCK WARNING for order",
        orderCode,
        "items:",
        result.insufficient.join(", ")
      );
    }

    // Midtrans expects 200 OK
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("POST /api/payments/midtrans/notification error:", error);
    if (error instanceof Error && error.message === "ORDER_NOT_FOUND") {
      return NextResponse.json({ message: "Order tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Gagal memproses notifikasi Midtrans" },
      { status: 500 }
    );
  }
}
