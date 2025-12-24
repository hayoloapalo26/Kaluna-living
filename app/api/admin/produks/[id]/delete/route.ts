import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
