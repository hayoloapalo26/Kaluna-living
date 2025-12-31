import { prisma } from "@/lib/prisma";

<<<<<<< HEAD
=======
// Ambil semua produk
>>>>>>> master
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

<<<<<<< HEAD
export const getprodukById = async (id: string) => {
  try {
=======
// Ambil produk by id (AMAN: tidak query kalau id kosong)
export const getprodukById = async (id?: string) => {
  try {
    if (!id) return null;

>>>>>>> master
    const produk = await prisma.produk.findUnique({
      where: { id },
    });

    return produk;
  } catch (err) {
    console.error("Error getprodukById:", err);
    return null;
  }
};

<<<<<<< HEAD
=======
// Add to cart
>>>>>>> master
export const addToCart = async (
  userId: string,
  produkId: string,
  quantity = 1
) => {
  try {
<<<<<<< HEAD
=======
    if (!userId) throw new Error("UserId wajib");
    if (!produkId) throw new Error("ProdukId wajib");

>>>>>>> master
    const produk = await prisma.produk.findUnique({
      where: { id: produkId },
    });

    if (!produk) {
      throw new Error("Produk tidak ditemukan");
    }

<<<<<<< HEAD
    // Pakai cast any supaya TS nggak protes
    const cartModel = (prisma as any).cart;
    const cartItemModel = (prisma as any).cartItem;

=======
    // Pakai cast any supaya TS nggak protes jika schema kamu tidak expose model secara typed
    const cartModel = (prisma as any).cart;
    const cartItemModel = (prisma as any).cartItem;

    if (!cartModel || !cartItemModel) {
      throw new Error(
        "Model cart/cartItem tidak ditemukan di Prisma Client. Periksa schema.prisma"
      );
    }

>>>>>>> master
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

<<<<<<< HEAD
// === FUNCTION: getReservationByUserId ===
export const getReservationByUserId = async (userId: string) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        // sesuai saran TypeScript: pakai 'produk' (R besar)
=======
// Ambil reservation milik user
export const getReservationByUserId = async (userId: string) => {
  try {
    if (!userId) return [];

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
>>>>>>> master
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
<<<<<<< HEAD
=======

// Ambil reservation by id
export const getReservationById = async (id?: string) => {
  try {
    if (!id) return null;

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        produk: true,
        user: true,
        payment: true,
      },
    });

    return reservation;
  } catch (err) {
    console.error("Error getReservationById:", err);
    return null;
  }
};
>>>>>>> master
