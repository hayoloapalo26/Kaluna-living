import { prisma } from "@/lib/prisma";

// Ambil semua produk
export const getproduks = async () => {
  try {
    const result = await prisma.produk.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (err) {
    console.error("Error getproduks:", err);
    return [];
  }
};

// Ambil produk by id (AMAN: tidak query kalau id kosong)
export const getprodukById = async (id?: string) => {
  try {
    if (!id) return null;

    const produk = await prisma.produk.findUnique({
      where: { id },
    });

    return produk;
  } catch (err) {
    console.error("Error getprodukById:", err);
    return null;
  }
};

// Add to cart
export const addToCart = async (
  userId: string,
  produkId: string,
  quantity = 1
) => {
  try {
    if (!userId) throw new Error("UserId wajib");
    if (!produkId) throw new Error("ProdukId wajib");

    const produk = await prisma.produk.findUnique({
      where: { id: produkId },
    });

    if (!produk) {
      throw new Error("Produk tidak ditemukan");
    }

    // Pakai cast any supaya TS nggak protes jika schema kamu tidak expose model secara typed
    const cartModel = (prisma as any).cart;
    const cartItemModel = (prisma as any).cartItem;

    if (!cartModel || !cartItemModel) {
      throw new Error(
        "Model cart/cartItem tidak ditemukan di Prisma Client. Periksa schema.prisma"
      );
    }

    // Cari cart existing untuk user ini
    let cart = await cartModel.findFirst({
      where: { userId },
    });

    // Kalau belum ada cart, buat baru
    if (!cart) {
      cart = await cartModel.create({
        data: { userId },
      });
    }

    // Tambah / update item di cart
    const item = await cartItemModel.upsert({
      where: {
        cartId_produkId: {
          cartId: cart.id,
          produkId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
        produkId,
        quantity,
        price: produk.price,
      },
    });

    return { cart, item };
  } catch (err) {
    console.error("Error addToCart:", err);
    throw err;
  }
};

// Ambil reservation milik user
export const getReservationByUserId = async (userId: string) => {
  try {
    if (!userId) return [];

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        produk: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (err) {
    console.error("Error getReservationByUserId:", err);
    return [];
  }
};
