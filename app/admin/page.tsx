// app/admin/page.tsx
<<<<<<< HEAD

import { getproduks } from "@/lib/data";
import Link from "next/link";

export default async function AdminPage() {
  const produks = await getproduks();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Daftar Produk</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Nama Produk</th>
              <th className="px-4 py-2 text-left">Harga</th>
              <th className="px-4 py-2 text-left">Dibuat</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produks.map((produk: any, index: number) => (
              <tr key={produk.id ?? index} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{produk.name}</td>
                <td className="px-4 py-2">{produk.price}</td>
                <td className="px-4 py-2">
                  {produk.createdAt
                    ? new Date(produk.createdAt).toLocaleString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  {/* Sesuaikan link / aksi sesuai kebutuhanmu */}
                  <Link
                    href={`/admin/produks/${produk.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}

            {produks.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Belum ada data Produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
=======
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ProdukItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
};

export default function AdminOverviewPage() {
  const [produks, setProduks] = useState<ProdukItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil list produk untuk overview
  useEffect(() => {
    const fetchProduks = async () => {
      setError(null);
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchProduks();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin - Overview</h1>

      <p className="text-sm text-gray-600 mb-4">
        Ringkasan produk yang sudah diupload. Untuk menambah atau mengubah
        produk, gunakan menu{" "}
        <Link
          href="/admin/products"
          className="text-blue-600 hover:underline font-medium"
        >
          Produk / produk
        </Link>
        .
      </p>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && !error && (
        <p className="text-sm text-gray-600">Memuat daftar produk...</p>
      )}

      {/* LIST PRODUK */}
      {!loading && !error && (
        <>
          <h2 className="text-lg font-semibold mb-2">
            Daftar Produk ({produks.length})
          </h2>

          {produks.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada produk.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {produks.map((produk) => {
                const imageSrc = produk.image.startsWith("/")
                  ? produk.image
                  : `/${produk.image}`;

                return (
                  <Link
                    key={produk.id}
                    href={`/admin/products/${produk.id}`}
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
                      <div className="text-sm font-semibold">
                        {produk.name}
                      </div>
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
        </>
      )}
    </div>
>>>>>>> master
  );
}
