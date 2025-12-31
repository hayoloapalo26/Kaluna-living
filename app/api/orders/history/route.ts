import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = (session?.user as any)?.id as string | undefined;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        payment: true,
      },
    });

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        produk: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        payment: true,
      },
    });

    return NextResponse.json({ orders, reservations }, { status: 200 });
  } catch (err) {
    console.error("GET /api/orders/history error:", err);
    return NextResponse.json(
      { message: "Gagal mengambil history order." },
      { status: 500 }
    );
  }
}
