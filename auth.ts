// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
<<<<<<< HEAD
import { prisma } from "@/lib/prisma";
=======
import prisma from "@/lib/prisma"; // ✅ pastikan default export prisma (bukan { prisma })
>>>>>>> master

type Role = "ADMIN" | "OWNER" | "CUSTOMER";

export const { handlers, auth, signIn, signOut } = NextAuth({
<<<<<<< HEAD
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },
=======
  session: { strategy: "jwt" },

  pages: { signIn: "/signin" },
>>>>>>> master

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
<<<<<<< HEAD
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
=======

      async authorize(credentials) {
        // ✅ NORMALIZE supaya TS yakin string (fix error {} is not assignable to string)
        const username =
          typeof credentials?.username === "string" ? credentials.username.trim() : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!username || !password) {
>>>>>>> master
          throw new Error("Username dan password wajib diisi");
        }

        const user = await prisma.user.findUnique({
<<<<<<< HEAD
          where: { username: credentials.username },
=======
          where: { username }, // ✅ sekarang pasti string
>>>>>>> master
        });

        if (!user) {
          throw new Error("Username atau password salah");
        }

<<<<<<< HEAD
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

=======
        const isValid = await bcrypt.compare(password, user.password); // ✅ password pasti string
>>>>>>> master
        if (!isValid) {
          throw new Error("Username atau password salah");
        }

        const role = user.role as Role;

        return {
          id: user.id,
          name: user.name ?? user.username,
          email: user.email,
          username: user.username,
<<<<<<< HEAD
          role, // "ADMIN" | "OWNER" | "CUSTOMER"
=======
          role,
>>>>>>> master
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.username = (user as any).username;
        token.role = (user as any).role as Role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).username = token.username as string;
        (session.user as any).role = token.role as Role;
      }
      return session;
    },
  },
});
