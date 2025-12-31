<<<<<<< HEAD
// app/api/produks/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // ← TIDAK ada cek "ID produk tidak valid" di sini

    const formData = await req.formData();

    const name = formData.get("name");
    const priceRaw = formData.get("price");
    const capacityRaw = formData.get("capacity");
    const description = formData.get("description");
    const image = formData.get("image") as File | null;

    // Validasi data form (bukan ID)
    if (!name || !priceRaw || !capacityRaw || !description) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const price = Number(priceRaw);
    const capacity = Number(capacityRaw);

    if (Number.isNaN(price) || Number.isNaN(capacity)) {
      return NextResponse.json(
        { message: "Harga atau kapasitas tidak valid" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;

    // Jika upload gambar baru
    if (image && typeof image === "object" && "arrayBuffer" in image) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const originalName =
        typeof (image as any)?.name === "string"
          ? (image as any).name
          : "produk.jpg";

      const filename = `${Date.now()}-${originalName}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${filename}`;
    }

    // 🔥 Update berdasarkan ID
    const updated = await prisma.produk.update({
      where: { id },
      data: {
        name: String(name),
        price,
        capacity,
        description: String(description),
=======
// app/api/admin/produks/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  deleteCloudinaryImageByUrl,
  requireCloudinaryConfig,
  uploadImageBuffer,
} from "@/lib/cloudinary";

export const runtime = "nodejs";

// Util: ambil ID dari URL dengan aman
function getIdFromRequest(req: NextRequest): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean); // ["api","admin","produks","<id>"]
  return parts[parts.length - 1] || "";
}

// ========== GET DETAIL ==========
export async function GET(req: NextRequest) {
  try {
    const id = getIdFromRequest(req);

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ditemukan di URL" },
        { status: 400 }
      );
    }

    const produk = await prisma.produk.findUnique({
      where: { id },
    });

    if (!produk) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(produk, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/admin/produks/[id] error:", error);
    return NextResponse.json(
      { message: error?.message || "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// ========== PATCH / UPDATE ==========
export async function PATCH(req: NextRequest) {
  try {
    const id = getIdFromRequest(req);

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ditemukan di URL" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const priceRaw = formData.get("price") as string | null;
    const capacityRaw = formData.get("capacity") as string | null;
    const file = formData.get("image") as File | null;

    // parsing harga
    let price: number | undefined;
    if (priceRaw) {
      const clean = priceRaw.replace(/[^\d]/g, "");
      const parsed = Number.parseInt(clean, 10);
      if (!Number.isNaN(parsed)) {
        price = parsed;
      }
    }

    // parsing kapasitas
    let capacity: number | undefined;
    if (capacityRaw) {
      const parsed = Number.parseInt(capacityRaw, 10);
      if (!Number.isNaN(parsed)) {
        capacity = parsed;
      }
    }

    // upload gambar baru (opsional)
    let imagePath: string | undefined;
    if (file && file.size > 0) {
      requireCloudinaryConfig();

      const existing = await prisma.produk.findUnique({
        where: { id },
        select: { image: true },
      });

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult = (await uploadImageBuffer(buffer, file.name)) as any;
      imagePath = uploadResult.secure_url as string;

      if (existing?.image) {
        await deleteCloudinaryImageByUrl(existing.image);
      }
    }

    const updated = await prisma.produk.update({
      where: { id },
      data: {
        ...(name !== null && { name }),
        ...(description !== null && { description }),
        ...(price !== undefined && { price }),
        ...(capacity !== undefined && { capacity }),
>>>>>>> master
        ...(imagePath && { image: imagePath }),
      },
    });

    return NextResponse.json(updated, { status: 200 });
<<<<<<< HEAD
  } catch (err: any) {
    console.error("Gagal update produk:", err);

    if (
      typeof err?.message === "string" &&
      err.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan di database" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          typeof err?.message === "string"
            ? err.message
            : "Gagal update produk",
      },
=======
  } catch (error: any) {
    console.error("PATCH /api/admin/produks/[id] error:", error);
    return NextResponse.json(
      { message: error?.message || "Gagal mengupdate produk" },
      { status: 500 }
    );
  }
}

// ========== DELETE ==========
export async function DELETE(req: NextRequest) {
  try {
    const id = getIdFromRequest(req);

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ditemukan di URL" },
        { status: 400 }
      );
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

    return NextResponse.json(
      { message: "Produk berhasil dihapus" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/admin/produks/[id] error:", error);
    return NextResponse.json(
      { message: error?.message || "Gagal menghapus produk" },
>>>>>>> master
      { status: 500 }
    );
  }
}
