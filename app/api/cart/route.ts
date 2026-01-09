// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET: ambil cart user + items
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          produk: true, // relasi dari CartItem -> Produk
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  // kalau belum ada cart, balikin struktur kosong
  if (!cart) {
    return NextResponse.json({ id: null, items: [] });
  }

  return NextResponse.json(cart);
}

// POST: add to cart (produkId + quantity)
export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const produkId = body?.produkId as string | undefined;
  const quantity = Number(body?.quantity ?? 1);

  if (!produkId || !Number.isFinite(quantity) || quantity < 1) {
    return NextResponse.json(
      { message: "Data tidak valid" },
      { status: 400 }
    );
  }

  const produk = await prisma.produk.findUnique({ where: { id: produkId } });
  if (!produk) {
    return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
  }

  const stock = Number(produk.capacity || 0);
  if (stock <= 0) {
    return NextResponse.json(
      {
        message:
          "Stok produk habis. Silakan hubungi admin untuk ketersediaan.",
      },
      { status: 400 }
    );
  }

  // pastikan cart ada
  const cart =
    (await prisma.cart.findFirst({ where: { userId } })) ??
    (await prisma.cart.create({ data: { userId } }));

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, produkId },
  });

  const nextQty = (existingItem?.quantity ?? 0) + quantity;
  if (nextQty > stock) {
    return NextResponse.json(
      {
        message: `Stok produk hanya tersedia ${stock}. Silakan kurangi jumlah atau hubungi admin.`,
      },
      { status: 400 }
    );
  }

  // upsert item (unique [cartId, produkId])
  await prisma.cartItem.upsert({
    where: {
      cartId_produkId: {
        cartId: cart.id,
        produkId,
      },
    },
    update: {
      quantity: { increment: quantity },
      price: produk.price, // simpan price saat ini
    },
    create: {
      cartId: cart.id,
      produkId,
      quantity,
      price: produk.price,
    },
  });

  const updated = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { produk: true } } },
  });

  return NextResponse.json(updated);
}

// PATCH: update quantity item (itemId + quantity)
export async function PATCH(req: Request) {
  const session = await auth();
  const userId = session?.user?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const itemId = body?.itemId as string | undefined;
  const quantity = Number(body?.quantity);

  if (!itemId || !Number.isFinite(quantity) || quantity < 1) {
    return NextResponse.json({ message: "Data tidak valid" }, { status: 400 });
  }

  // pastikan item milik user
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true, produk: true },
  });

  if (!item || item.cart.userId !== userId) {
    return NextResponse.json({ message: "Item tidak ditemukan" }, { status: 404 });
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

  if (quantity > stock) {
    return NextResponse.json(
      {
        message: `Stok produk hanya tersedia ${stock}. Silakan kurangi jumlah atau hubungi admin.`,
      },
      { status: 400 }
    );
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  return NextResponse.json({ ok: true });
}

// DELETE: hapus item (itemId)
export async function DELETE(req: Request) {
  const session = await auth();
  const userId = session?.user?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const itemId = body?.itemId as string | undefined;

  if (!itemId) {
    return NextResponse.json({ message: "Data tidak valid" }, { status: 400 });
  }

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!item || item.cart.userId !== userId) {
    return NextResponse.json({ message: "Item tidak ditemukan" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: itemId } });
  return NextResponse.json({ ok: true });
}
