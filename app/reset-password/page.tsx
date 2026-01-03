"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    setMessage(data.message);

    if (res.ok) {
      setTimeout(() => router.push("/signin"), 1500);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/30 blur-3xl" />
        <div className="absolute top-10 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/25 blur-3xl" />
      </div>
      <div className="relative bg-white/90 p-8 rounded-3xl ring-1 ring-white/70 shadow-md w-full max-w-md backdrop-blur">
        <h1 className="text-xl font-semibold mb-4">Buat Password Baru</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password baru"
            className="w-full ring-1 ring-black/10 px-3 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white py-2 rounded-2xl hover:opacity-90"
          >
            Simpan Password Baru
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-[#111827]/70">{message}</p>
        )}
      </div>
    </div>
  );
}
