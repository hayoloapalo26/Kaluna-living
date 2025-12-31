// app/api/admin/produks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
<<<<<<< HEAD
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

// GET /api/admin/produks
=======
import { uploadImageBuffer, requireCloudinaryConfig } from "@/lib/cloudinary";

export const runtime = "nodejs";

// GET /api/admin/produks  → ambil semua produk
>>>>>>> master
export async function GET() {
  try {
    const produks = await prisma.produk.findMany({
      orderBy: { createdAt: "desc" },
    });

<<<<<<< HEAD
    return NextResponse.json(produks, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/produks error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// POST /api/admin/produks
=======
    // kalau sukses, kirim list produk
    return NextResponse.json(produks, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/produks error:", error);

    // ⚠️ PENTING: jangan kirim 500 lagi, kirim array kosong + 200
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/admin/produks  → tambah produk
>>>>>>> master
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;

    if (!session || (role !== "ADMIN" && role !== "OWNER")) {
      return NextResponse.json(
        { message: "Tidak memiliki akses" },
        { status: 403 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const priceRaw = formData.get("price") as string | null;
    const capacityRaw = formData.get("capacity") as string | null;
    const file = formData.get("image") as File | null;

    if (!name || !priceRaw) {
      return NextResponse.json(
        { message: "Nama dan harga wajib diisi" },
        { status: 400 }
      );
    }

    const priceClean = priceRaw.replace(/[^\d]/g, "");
<<<<<<< HEAD
    const priceNumber = Number.parseInt(priceClean, 10);

    if (Number.isNaN(priceNumber)) {
=======
    const price = Number.parseInt(priceClean, 10);
    if (Number.isNaN(price)) {
>>>>>>> master
      return NextResponse.json(
        { message: "Format harga tidak valid" },
        { status: 400 }
      );
    }

<<<<<<< HEAD
    const capacityNumber = capacityRaw
      ? Math.max(1, Number.parseInt(capacityRaw, 10) || 1)
      : 1;

    let imagePath = "/uploads/default-produk.jpg";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const fileName = `${Date.now()}-${safeName}`;
      const fullPath = path.join(uploadsDir, fileName);

      await writeFile(fullPath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

=======
    const capacity = capacityRaw
      ? Math.max(1, Number.parseInt(capacityRaw, 10) || 1)
      : 1;

    requireCloudinaryConfig();

    if (!file || file.size === 0) {
      return NextResponse.json(
        { message: "Gambar wajib diisi" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = (await uploadImageBuffer(buffer, file.name)) as any;
    const imagePath = uploadResult.secure_url as string;

>>>>>>> master
    const produk = await prisma.produk.create({
      data: {
        name,
        description: description ?? "",
        image: imagePath,
<<<<<<< HEAD
        price: priceNumber,
        capacity: capacityNumber,
=======
        price,
        capacity,
>>>>>>> master
      },
    });

    return NextResponse.json(produk, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/produks error:", error);
    return NextResponse.json(
      { message: error?.message || "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}
