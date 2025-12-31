"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // kalau ada ?callbackUrl= pakai itu, kalau tidak → /admin
      const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError(res.error || "Login gagal");
        return;
      }

      const targetUrl = res?.url ?? callbackUrl;
      window.location.href = targetUrl;
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: brand copy */}
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-[0.32em] text-black/45">
              Kaluna Living
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#111827] leading-[1.1]">
              Welcome Back.
            </h1>
            <p className="mt-4 text-[#111827]/70 max-w-md leading-relaxed">
              Log in to access the catalog, custom orders, and transaction history. The look is minimal, warm, and focused on comfort.
            </p>

            <div className="mt-6 rounded-2xl bg-white ring-1 ring-black/5 p-5 shadow-md max-w-md">
              <p className="text-sm font-semibold text-[#111827]">Catatan</p>
              <p className="mt-1 text-sm text-[#111827]/70">
                Customers, Admins, and Owners will be directed according to their roles after logging in.
              </p>
            </div>
          </div>

          {/* Right: form card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-2xl bg-white ring-1 ring-black/5 shadow-md p-7 md:p-8">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.32em] text-black/45">
                  Sign In
                </p>
                <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-[#111827]">
                  Sign In Kaluna Living
                </h2>
                <p className="mt-2 text-sm text-[#111827]/65">
                  Enter username & password to continue.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mt-5 rounded-2xl bg-white ring-1 ring-red-500/20 p-4 text-red-700">
                  <p className="text-sm font-semibold">Login gagal</p>
                  <p className="text-sm mt-1 text-red-700/90">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Username */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#111827]">
                    Username
                  </label>
                  <input
                    type="text"
                    className="rounded-2xl px-4 py-3 text-sm text-[#111827]
                               ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#111827]">
                    Password
                  </label>
                  <input
                    type="password"
                    className="rounded-2xl px-4 py-3 text-sm text-[#111827]
                               ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                {/* Forgot password link */}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-[#224670] hover:opacity-80 transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#224670] text-white px-4 py-3 text-sm font-semibold
                             hover:opacity-90 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Memproses..." : "Sign In"}
                </button>
              </form>

              {/* Sign Up link */}
              <div className="mt-5 text-center text-sm text-[#111827]/65">
                Dont have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#224670] hover:opacity-80 transition"
                >
                  Sign Up
                </Link>
              </div>

              <p className="mt-5 text-xs text-center text-[#111827]/45 leading-relaxed">
                By signing in, you agree to Kaluna Living policies and authentication process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
