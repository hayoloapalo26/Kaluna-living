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

    // 1) update order status
    const order = await prisma.order.update({
      where: { orderCode },
      data: { paymentStatus: nextStatus as any },
    });

    // 2) upsert order payment record (simpan raw notification)
    await prisma.orderPayment.upsert({
      where: { orderId: order.id },
      update: {
        transactionStatus: String(payload.transaction_status ?? ""),
        fraudStatus: String(payload.fraud_status ?? ""),
        rawNotification: payload,
      },
      create: {
        orderId: order.id,
        provider: "MIDTRANS",
        transactionStatus: String(payload.transaction_status ?? ""),
        fraudStatus: String(payload.fraud_status ?? ""),
        rawNotification: payload,
      },
    });

    // Midtrans expects 200 OK
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("POST /api/payments/midtrans/notification error:", error);
    return NextResponse.json(
      { message: "Gagal memproses notifikasi Midtrans" },
      { status: 500 }
    );
  }
}
