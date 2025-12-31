"use client";

import { useState } from "react";
<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> master

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
<<<<<<< HEAD

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24 pb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Kirim Link Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
=======
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "Jika email terdaftar, link reset akan dikirim.");
    } catch {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white ring-1 ring-black/5 shadow-md p-7 md:p-8">
            {/* Header */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.32em] text-black/45">
                Account Recovery
              </p>
              <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-[#111827]">
                Reset Password
              </h1>
              <p className="mt-2 text-sm text-[#111827]/65 leading-relaxed">
                Masukkan email yang terdaftar. Kami akan mengirimkan link untuk
                mengatur ulang password kamu.
              </p>
            </div>

            {/* Message */}
            {message && (
              <div className="mt-5 rounded-2xl bg-white ring-1 ring-black/10 p-4 text-center">
                <p className="text-sm text-[#111827]/80">{message}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827]
                             ring-1 ring-black/10 focus:outline-none
                             focus:ring-2 focus:ring-[#DEA9B6]/70"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#224670] text-white px-4 py-3
                           text-sm font-semibold hover:opacity-90 transition
                           shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Mengirim..." : "Kirim Link Reset"}
              </button>
            </form>

            {/* Back to sign in */}
            <div className="mt-6 text-center">
              <Link
                href="/signin"
                className="text-sm font-semibold text-[#224670] hover:opacity-80 transition"
              >
                ← Kembali ke Sign In
              </Link>
            </div>

            {/* Helper text */}
            <p className="mt-5 text-xs text-center text-[#111827]/45 leading-relaxed">
              Jika tidak menemukan email dari kami, periksa folder spam atau
              coba beberapa menit lagi.
            </p>
          </div>
        </div>
>>>>>>> master
      </div>
    </div>
  );
}
