// app/signup/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> master

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          username,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrasi gagal");
      } else {
        setSuccess("Registrasi berhasil. Mengalihkan ke halaman login...");
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      }
    } catch {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
<<<<<<< HEAD
    // ⬇⬇⬇ padding top & bottom supaya tidak tertutup header
    <div className="min-h-screen bg-[#f7f7f7] pt-24 pb-16 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Buat akun baru sebagai Customer
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nama lengkap"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
              />
            </div>

            {/* No Telepon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. Telepon
              </label>
              <input
                type="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {/* Error & Success */}
            {error && <p className="text-xs text-red-600">{error}</p>}
            {success && <p className="text-xs text-green-600">{success}</p>}

            {/* Tombol submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-orange-500 hover:bg-orange-600 text-white py-2.5 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Buat Akun"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Sudah punya akun?{" "}
            <a
              href="/signin"
              className="text-orange-600 hover:underline font-medium"
            >
              Sign In
            </a>
          </p>
=======
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left copy */}
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-[0.32em] text-black/45">
              Kaluna Living
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#111827] leading-[1.1]">
              Create your account.
            </h1>
            <p className="mt-4 text-[#111827]/70 max-w-md leading-relaxed">
              Buat akun baru sebagai Customer untuk mulai belanja, checkout, dan
              melihat riwayat pesanan.
            </p>

            <div className="mt-6 rounded-2xl bg-white ring-1 ring-black/5 p-5 shadow-md max-w-md">
              <p className="text-sm font-semibold text-[#111827]">Aman & rapi</p>
              <p className="mt-1 text-sm text-[#111827]/70">
                Data kamu akan digunakan untuk pengiriman dan update transaksi.
              </p>
            </div>
          </div>

          {/* Form card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-2xl bg-white ring-1 ring-black/5 shadow-md p-7 md:p-8">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.32em] text-black/45">
                  Sign Up
                </p>
                <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-[#111827]">
                  Buat Akun Customer
                </h2>
                <p className="mt-2 text-sm text-[#111827]/65">
                  Isi data berikut untuk registrasi.
                </p>
              </div>

              {/* Alerts */}
              {error && (
                <div className="mt-5 rounded-2xl bg-white ring-1 ring-red-500/20 p-4 text-red-700">
                  <p className="text-sm font-semibold">Registrasi gagal</p>
                  <p className="text-sm mt-1 text-red-700/90">{error}</p>
                </div>
              )}

              {success && (
                <div className="mt-5 rounded-2xl bg-white ring-1 ring-emerald-500/20 p-4 text-emerald-700">
                  <p className="text-sm font-semibold">Berhasil</p>
                  <p className="text-sm mt-1 text-emerald-700/90">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827]
                               ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nama lengkap"
                    autoComplete="name"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827]
                               ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="username"
                    autoComplete="username"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827]
                               ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="email@example.com"
                    autoComplete="email"
                  />
                </div>

                {/* No Telepon */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-1">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827]
                               ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="08xxxxxxxxxx"
                    autoComplete="tel"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827]
                               ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <p className="mt-2 text-xs text-[#111827]/50">
                    Gunakan password yang mudah diingat tapi aman.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#224670] hover:opacity-90 text-white px-4 py-3 text-sm font-semibold
                             transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Buat Akun"}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-[#111827]/65">
                Sudah punya akun?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-[#224670] hover:opacity-80 transition"
                >
                  Sign In
                </Link>
              </p>

              <p className="mt-5 text-xs text-center text-[#111827]/45 leading-relaxed">
                Dengan mendaftar, kamu menyetujui kebijakan dan proses layanan Kaluna Living.
              </p>
            </div>
          </div>
>>>>>>> master
        </div>
      </div>
    </div>
  );
}
