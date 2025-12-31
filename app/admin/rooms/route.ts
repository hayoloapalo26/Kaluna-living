export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = session?.user?.role;

    if (!session || (role !== "ADMIN" && role !== "OWNER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

<<<<<<< HEAD
    const name = String(formData.get("name") || "");
    const description = String(formData.get("description") || "");
    const price = Number(formData.get("price") || 0);
    const capacity = Number(formData.get("capacity") || 1);
    const imageFile = formData.get("image") as File | null;

    if (!name || !price || !imageFile) {
=======
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();

    // price bisa dikirim "15.000" -> bersihin jadi 15000
    const rawPrice = String(formData.get("price") || "0");
    const price = Number(rawPrice.replace(/[^\d]/g, "")) || 0;

    const capacity = Number(formData.get("capacity") || 1) || 1;

    const imageFile = formData.get("image");
    if (!(imageFile instanceof File)) {
>>>>>>> master
      return NextResponse.json(
        { error: "Nama, harga, dan gambar wajib diisi" },
        { status: 400 }
      );
    }

<<<<<<< HEAD
=======
    if (!name || price <= 0) {
      return NextResponse.json(
        { error: "Nama dan harga wajib diisi" },
        { status: 400 }
      );
    }

>>>>>>> master
    // ------- SIMPAN GAMBAR -------
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

<<<<<<< HEAD
    const ext = path.extname(imageFile.name);
=======
    const ext = path.extname(imageFile.name) || ".png";
>>>>>>> master
    const base = path.basename(imageFile.name, ext).replace(/\s+/g, "-");
    const filename = `${Date.now()}-${base}${ext}`;

    const filepath = path.join(uploadsDir, filename);
    await fs.writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;
    // ------------------------------

<<<<<<< HEAD
    const Produk = await prisma.Produk.create({
=======
    // IMPORTANT: Prisma client property biasanya lowercase -> prisma.produk
    const produk = await prisma.produk.create({
>>>>>>> master
      data: {
        name,
        description,
        price,
        capacity,
        image: imageUrl,
      },
    });

<<<<<<< HEAD
    return NextResponse.json(Produk, { status: 201 });
=======
    return NextResponse.json(produk, { status: 201 });
>>>>>>> master
  } catch (err: any) {
    console.error("Produk CREATE ERROR →", err);

    return NextResponse.json(
<<<<<<< HEAD
      { error: err.message || "Internal server error" },
=======
      { error: err?.message || "Internal server error" },
>>>>>>> master
      { status: 500 }
    );
  }
}
