"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type VerifyStatus = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const didVerify = useRef(false);

  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [message, setMessage] = useState("Memverifikasi akun...");

  useEffect(() => {
    if (didVerify.current) return;
    didVerify.current = true;

    if (!token) {
      setStatus("error");
      setMessage("Token verifikasi tidak ditemukan.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Verifikasi gagal.");
          return;
        }

        setStatus("success");
        setMessage(data.message || "Email berhasil diverifikasi.");
      } catch {
        setStatus("error");
        setMessage("Terjadi kesalahan jaringan.");
      }
    };

    verify();
  }, [token]);

  const statusClass =
    status === "success" ? "text-emerald-700" : status === "error" ? "text-red-700" : "text-[#111827]/70";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white ring-1 ring-black/5 shadow-md p-7">
        <p className="text-xs uppercase tracking-[0.32em] text-black/45">
          Kaluna Living
        </p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-[#111827]">
          Aktivasi Akun
        </h1>

        <p className={`mt-3 text-sm ${statusClass}`}>{message}</p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/signin"
            className="rounded-2xl bg-[#224670] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Ke halaman login
          </Link>
        </div>
      </div>
    </div>
  );
}
