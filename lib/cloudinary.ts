import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const uploadFolder = process.env.CLOUDINARY_FOLDER || "kaluna-living";

const cloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export function requireCloudinaryConfig() {
  if (!cloudinaryConfigured) {
    throw new Error(
      "Cloudinary env belum lengkap (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)."
    );
  }
}

export async function uploadImageBuffer(buffer: Buffer, filename?: string) {
  requireCloudinaryConfig();

  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: uploadFolder,
        resource_type: "image",
        use_filename: true,
        unique_filename: true,
        filename_override: filename,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Gagal upload ke Cloudinary."));
          return;
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

export function extractCloudinaryPublicId(url: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("res.cloudinary.com")) {
      return null;
    }

    const parts = parsed.pathname.split("/").filter(Boolean);
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) {
      return null;
    }

    let publicIdParts = parts.slice(uploadIndex + 1);
    if (/^v\\d+$/.test(publicIdParts[0] || "")) {
      publicIdParts = publicIdParts.slice(1);
    }

    let publicId = publicIdParts.join("/");
    publicId = publicId.replace(/\\.[^/.]+$/, "");

    return publicId || null;
  } catch {
    return null;
  }
}

export async function deleteCloudinaryImageByUrl(url: string) {
  if (!cloudinaryConfigured) {
    return null;
  }

  const publicId = extractCloudinaryPublicId(url);
  if (!publicId) {
    return null;
  }

  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}

export async function deleteCloudinaryImageByPublicId(publicId: string) {
  if (!cloudinaryConfigured || !publicId) {
    return null;
  }

  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}
