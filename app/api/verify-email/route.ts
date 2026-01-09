import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body as { token?: string };

    if (!token) {
      return NextResponse.json(
        { message: "Token verifikasi wajib diisi." },
        { status: 400 }
      );
    }

    const tokenRecord = await prisma.emailVerificationToken.findUnique({
      where: { token },
      include: {
        user: {
          select: { emailVerified: true },
        },
      },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { message: "Token verifikasi tidak valid." },
        { status: 400 }
      );
    }

    if (tokenRecord.expires < new Date()) {
      await prisma.emailVerificationToken.delete({ where: { token } });
      return NextResponse.json(
        { message: "Token verifikasi sudah kadaluarsa." },
        { status: 400 }
      );
    }

    if (tokenRecord.user.emailVerified) {
      await prisma.emailVerificationToken.deleteMany({
        where: { userId: tokenRecord.userId },
      });
      return NextResponse.json(
        { message: "Akun sudah aktif." },
        { status: 200 }
      );
    }

    await prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { emailVerified: new Date() },
    });

    await prisma.emailVerificationToken.deleteMany({
      where: { userId: tokenRecord.userId },
    });

    return NextResponse.json(
      { message: "Akun berhasil diaktivasi. Silakan login." },
      { status: 200 }
    );
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
