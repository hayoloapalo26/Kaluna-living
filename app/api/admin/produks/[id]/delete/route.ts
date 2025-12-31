import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { deleteCloudinaryImageByUrl } from "@/lib/cloudinary";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // optional: validasi id
    if (!id) {
      return NextResponse.json({ message: "ID produk tidak valid" }, { status: 400 });
    }

    const produk = await prisma.produk.findUnique({
      where: { id },
      select: { image: true },
    });

    if (produk?.image) {
      await deleteCloudinaryImageByUrl(produk.image);
    }

    await prisma.produk.delete({
      where: { id },
    });

    // Redirect ke daftar produk setelah berhasil hapus
    return NextResponse.redirect(new URL("/admin/products", req.url));
  } catch (err: any) {
    console.error(err);

    // Kalau id tidak ditemukan, Prisma biasanya melempar error
    // Kita balikin 404 biar jelas
    return NextResponse.json(
      { message: "Gagal menghapus produk", error: err?.message },
      { status: 500 }
    );
  }
}
