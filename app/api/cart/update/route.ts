// app/api/cart/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Silakan login." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null) as
      | { itemId?: string; quantity?: number }
      | null;

    if (!body?.itemId || !body.quantity || body.quantity <= 0) {
      return NextResponse.json(
        { message: "Data tidak valid." },
        { status: 400 }
      );
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: body.itemId },
      include: { produk: true },
    });

    if (!item) {
      return NextResponse.json(
        { message: "Item tidak ditemukan." },
        { status: 404 }
      );
    }

    const stock = Number(item.produk?.capacity || 0);
    if (stock <= 0) {
      return NextResponse.json(
        {
          message:
            "Stok produk habis. Silakan hubungi admin untuk ketersediaan.",
        },
        { status: 400 }
      );
    }

    if (body.quantity > stock) {
      return NextResponse.json(
        {
          message: `Stok produk hanya tersedia ${stock}. Silakan kurangi jumlah atau hubungi admin.`,
        },
        { status: 400 }
      );
    }

    const updated = await prisma.cartItem.update({
      where: { id: body.itemId },
      data: { quantity: body.quantity },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("POST /api/cart/update error:", error);
    return NextResponse.json(
      { message: error?.message || "Gagal memperbarui cart." },
      { status: 500 }
    );
  }
}
