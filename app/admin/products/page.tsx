// app/admin/products/page.tsx
"use client";

<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
=======
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { resolveImageSrc } from "@/lib/image";
>>>>>>> master

type ProdukItem = {
  id: string;
  name: string;
<<<<<<< HEAD
  price: number;
  capacity: number;
  image: string;
  description: string;
  createdAt: string;
=======
  description: string;
  image: string;
  price: number;
  capacity: number;
>>>>>>> master
};

export default function AdminProductsPage() {
  const [produks, setProduks] = useState<ProdukItem[]>([]);
<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Ambil data produk saat halaman load
  useEffect(() => {
    const fetchProduks = async () => {
      try {
        const res = await fetch("/api/admin/produks");

        if (!res.ok) {
          throw new Error("Gagal mengambil data produk");
        }

        const text = await res.text();
        let data: unknown = [];

        try {
          data = text ? JSON.parse(text) : [];
        } catch {
          console.error("Response GET /api/admin/produks bukan JSON valid:", text);
          throw new Error("Response server tidak valid (bukan JSON)");
        }

        if (Array.isArray(data)) {
          setProduks(data as ProdukItem[]);
        } else {
          throw new Error("Format data produk tidak sesuai");
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Terjadi kesalahan saat mengambil produk");
        }
=======
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GET: ambil semua produk
  useEffect(() => {
    const fetchProduks = async () => {
      setError(null);

      try {
        const res = await fetch("/api/admin/produks", {
          method: "GET",
          cache: "no-store",
        });

        let data: unknown = null;

        try {
          data = await res.json();
        } catch {
          console.error("Response GET /api/admin/produks bukan JSON valid");
          setError("Response server tidak valid");
          return;
        }

        if (!res.ok) {
          const message =
            data &&
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof (data as any).message === "string"
              ? (data as any).message
              : "Gagal mengambil data produk";

          // ❗ DI SINI TIDAK ADA throw, hanya setError
          setError(message);
          return;
        }

        if (!Array.isArray(data)) {
          setError("Format data produk tidak sesuai");
          return;
        }

        setProduks(data as ProdukItem[]);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil produk"
        );
>>>>>>> master
      }
    };

    fetchProduks();
  }, []);

<<<<<<< HEAD
  // Submit form tambah produk
=======
  // POST: tambah produk baru
>>>>>>> master
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/admin/produks", {
        method: "POST",
        body: formData,
      });

<<<<<<< HEAD
      const text = await res.text();
      let data: unknown = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        console.error(
          "Response POST /api/admin/produks bukan JSON valid:",
          text
        );
=======
      let data: unknown = null;

      try {
        data = await res.json();
      } catch {
        console.error("Response POST /api/admin/produks bukan JSON valid");
>>>>>>> master
      }

      if (!res.ok) {
        const message =
          data &&
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as any).message === "string"
            ? (data as any).message
            : "Gagal menyimpan produk";
<<<<<<< HEAD
        throw new Error(message);
=======

        setError(message);
        return;
>>>>>>> master
      }

      if (data && typeof data === "object") {
        setProduks((prev) => [data as ProdukItem, ...prev]);
      }

      form.reset();
      setSuccess("Produk berhasil disimpan.");
<<<<<<< HEAD
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan saat menyimpan produk");
      }
=======
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan produk"
      );
>>>>>>> master
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin - Produk</h1>

      {/* Alert */}
      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
<<<<<<< HEAD
=======

>>>>>>> master
      {success && (
        <div className="mb-4 bg-emerald-50 text-emerald-700 border border-emerald-300 px-4 py-2 rounded text-sm">
          {success}
        </div>
      )}

      {/* FORM TAMBAH PRODUK */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Nama Produk</label>
            <input
              name="name"
              type="text"
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Harga (Rupiah)
            </label>
            <input
              name="price"
              type="number"
              min={0}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Kapasitas</label>
            <input
              name="capacity"
              type="number"
              min={1}
              defaultValue={1}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Gambar (file)
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Deskripsi</label>
          <textarea
            name="description"
            rows={3}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-60"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>

<<<<<<< HEAD
      {/* DAFTAR PRODUK */}
=======
      {/* LIST PRODUK */}
>>>>>>> master
      <h2 className="text-lg font-semibold mb-2">Daftar Produk</h2>

      {produks.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada produk.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {produks.map((produk) => {
<<<<<<< HEAD
            const imageSrc = produk.image.startsWith("/")
              ? produk.image
              : `/${produk.image}`;
=======
            const imageSrc = resolveImageSrc(produk.image);
>>>>>>> master

            return (
              <Link
                key={produk.id}
<<<<<<< HEAD
                href={`/admin/produks/${produk.id}`}
=======
                href={`/admin/products/${produk.id}`}
>>>>>>> master
                className="border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={imageSrc}
                    alt={produk.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <div className="text-sm font-semibold">{produk.name}</div>
                  <div className="text-xs text-gray-600">
                    Rp {produk.price.toLocaleString("id-ID")} • Kapasitas{" "}
                    {produk.capacity}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {produk.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
