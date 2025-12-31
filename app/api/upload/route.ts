<<<<<<< HEAD
import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
=======
import { NextResponse } from "next/server";
import {
  deleteCloudinaryImageByPublicId,
  deleteCloudinaryImageByUrl,
  requireCloudinaryConfig,
  uploadImageBuffer,
} from "@/lib/cloudinary";

export const runtime = "nodejs";

export const PUT = async (request: Request) => {
  requireCloudinaryConfig();

>>>>>>> master
  const form = await request.formData();
  const file = form.get("file") as File;

  if (file.size === 0 || file.size === undefined) {
    return NextResponse.json({ message: "File is required" }, { status: 400 });
  }
  if (file.size > 4000000) {
    return NextResponse.json(
      { message: "File must be less than 4MB" },
      { status: 400 }
    );
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "File must be an image" },
      { status: 400 }
    );
  }
<<<<<<< HEAD
  const blob = await put(file.name, file, {
    access: "public",
    multipart: true,
  });
  return NextResponse.json(blob);
=======

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult = (await uploadImageBuffer(buffer, file.name)) as any;

  return NextResponse.json({
    url: uploadResult.secure_url,
    secure_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
    bytes: uploadResult.bytes,
    format: uploadResult.format,
    width: uploadResult.width,
    height: uploadResult.height,
  });
>>>>>>> master
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("imageUrl") as string;
<<<<<<< HEAD
  await del(imageUrl);
=======
  const publicId = searchParams.get("publicId") as string | null;

  if (!imageUrl && !publicId) {
    return NextResponse.json(
      { message: "imageUrl atau publicId wajib diisi" },
      { status: 400 }
    );
  }

  if (publicId) {
    await deleteCloudinaryImageByPublicId(publicId);
  } else if (imageUrl) {
    await deleteCloudinaryImageByUrl(imageUrl);
  }

>>>>>>> master
  return NextResponse.json({ status: 200 });
};
