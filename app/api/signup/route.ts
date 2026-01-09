import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let createdUserId: string | null = null;

  try {
    const { name, email, username, phone, password } = await req.json();

    if (!name || !email || !username || !phone || !password) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return NextResponse.json(
        { message: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    const host = process.env.EMAIL_SERVER_HOST;
    const emailUser = process.env.EMAIL_SERVER_USER;
    const emailPass = process.env.EMAIL_SERVER_PASSWORD;
    const port = Number(process.env.EMAIL_SERVER_PORT || "465");

    if (!host || !emailUser || !emailPass) {
      return NextResponse.json(
        { message: "Email server belum dikonfigurasi." },
        { status: 500 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newUser = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          name,
          email,
          username,
          phone,
          password: hashed,
          role: "CUSTOMER",
        },
      });

      await tx.emailVerificationToken.create({
        data: {
          userId: created.id,
          token,
          expires,
        },
      });

      return created;
    });

    createdUserId = newUser.id;

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXTAUTH_URL ||
      process.env.AUTH_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
      "http://localhost:3000";

    const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const from =
      process.env.EMAIL_FROM || 'Kaluna Living <no-reply@example.com>';

    await transporter.sendMail({
      from,
      to: email,
      subject: "Aktivasi Akun - Kaluna Living",
      html: `
        <p>Halo ${name},</p>
        <p>Terima kasih sudah mendaftar di Kaluna Living.</p>
        <p>Silakan klik link berikut untuk aktivasi akun (berlaku 24 jam):</p>
        <p><a href="${verifyUrl}" target="_blank">${verifyUrl}</a></p>
        <p>Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
        <p>Terima kasih,<br/>Kaluna Living</p>
      `,
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil. Silakan cek email untuk aktivasi akun.",
        id: newUser.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    if (createdUserId) {
      try {
        await prisma.emailVerificationToken.deleteMany({
          where: { userId: createdUserId },
        });
        await prisma.user.delete({ where: { id: createdUserId } });
      } catch (cleanupError) {
        console.error("SIGNUP CLEANUP ERROR:", cleanupError);
      }
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
