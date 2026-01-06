// auth.ts
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

type Role = "ADMIN" | "OWNER" | "CUSTOMER";

class MissingCredentialsError extends CredentialsSignin {
  code = "missing_credentials";
}

class UserNotFoundError extends CredentialsSignin {
  code = "user_not_found";
}

class InvalidPasswordError extends CredentialsSignin {
  code = "wrong_password";
}

class EmailNotVerifiedError extends CredentialsSignin {
  code = "email_not_verified";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username =
          typeof credentials?.username === "string"
            ? credentials.username.trim()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!username || !password) {
          throw new MissingCredentialsError();
        }

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          throw new UserNotFoundError();
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new InvalidPasswordError();
        }

        if (user.role === "CUSTOMER" && !user.emailVerified) {
          throw new EmailNotVerifiedError();
        }

        const role = user.role as Role;

        return {
          id: user.id,
          name: user.name ?? user.username,
          email: user.email,
          username: user.username,
          role,
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
