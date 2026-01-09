import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const session = await auth();
    let userId = (session?.user as any)?.id as string | undefined;

    if (!userId && session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = user?.id;
    }

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
