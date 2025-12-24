"use server";

import { produkSchema, ReserveSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

// =========================
// SAVE PRODUK
// =========================
export const saveproduk = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required." };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = produkSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } = validatedFields.data;

  try {
    // Buat produk dulu
    const produk = await prisma.produk.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
      },
    });

    // Kalau ada amenities, isi ke tabel join
    if (amenities?.length) {
      await prisma.produkAmenities.createMany({
        data: amenities.map((item) => ({
          produkId: produk.id,
          amenitiesId: item,
        })),
        skipDuplicates: true,
      });
    }
  } catch (error) {
    console.log(error);
    return { message: "Gagal menyimpan produk." };
  }

  redirect("/admin/produk");
};

// =========================
// UPDATE PRODUK
// =========================
export const updateproduk = async (
  image: string,
  produkId: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required." };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = produkSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } = validatedFields.data;

  try {
    await prisma.$transaction(async (tx) => {
      // Update data produk
      await tx.produk.update({
        where: { id: produkId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
        },
      });

      // Reset join amenities
      await tx.produkAmenities.deleteMany({
        where: { produkId },
      });

      // Insert join amenities baru
      if (amenities?.length) {
        await tx.produkAmenities.createMany({
          data: amenities.map((item) => ({
            produkId,
            amenitiesId: item,
          })),
          skipDuplicates: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return { message: "Gagal mengupdate produk." };
  }

  revalidatePath("/admin/produk");
  redirect("/admin/produk");
};

// =========================
// DELETE PRODUK
// =========================
export const deleteproduk = async (id: string, image: string) => {
  try {
    // Hapus file image di vercel blob (kalau memang image adalah blob URL)
    await del(image);

    // Hapus join amenities dulu (untuk hindari constraint)
    await prisma.produkAmenities.deleteMany({
      where: { produkId: id },
    });

    // Hapus produk
    await prisma.produk.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return { message: "Gagal menghapus produk." };
  }

  revalidatePath("/admin/produk");
};

// =========================
// CREATE RESERVATION / CHECKOUT
// =========================
export const createReserve = async (
  produkId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect(`/signin?redirect_url=produk/${produkId}`);
  }

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  const validatedFields = ReserveSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, phone } = validatedFields.data;

  const night = differenceInCalendarDays(endDate, startDate);
  if (night <= 0) return { messageDate: "Date must be at least 1 night" };

  const total = night * price;

  let reservationId: string | null = null;

  try {
    await prisma.$transaction(async (tx) => {
      // Update user
      await tx.user.update({
        data: { name, phone },
        where: { id: session.user.id as string },
      });

      // Create reservation + payment (FIX: payment lowercase)
      const reservation = await tx.reservation.create({
        data: {
          starDate: startDate, // pastikan schema kamu memang "starDate"
          endDate,
          price,
          produkId,
          userId: session.user.id as string,
          payment: {
            create: {
              amount: total,
              // status: "pending", // isi kalau field status ada di model Payment
            },
          },
        },
      });

      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
    return { message: "Gagal membuat reservasi/checkout." };
  }

  if (!reservationId) {
    return { message: "Gagal membuat reservasi/checkout (reservationId kosong)." };
  }

  redirect(`/checkout/${reservationId}`);
};
