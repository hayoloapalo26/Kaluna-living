// components/main.tsx
import Image from "next/image";
import Link from "next/link";
import { getproduks } from "@/lib/data";

export default async function Main() {
  const produks = await getproduks();

<<<<<<< HEAD
  // Kalau belum ada data produk
  if (!produks || produks.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 mt-10 text-center text-gray-500">
        Belum ada data produk. Admin perlu menambahkan produk di database.
=======
  if (!produks || produks.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 mt-10">
        <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5 shadow-md text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-black/40">
            Empty state
          </p>
          <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-[#111827]">
            Belum ada produk
          </h3>
          <p className="mt-2 text-sm text-[#111827]/70">
            Admin perlu menambahkan produk di database.
          </p>
        </div>
>>>>>>> master
      </div>
    );
  }

<<<<<<< HEAD
  // Kalau ada data produk
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-10 grid gap-8 md:grid-cols-3">
      {produks.map((produk) => (
        <article
          key={produk.id}
          className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col"
        >
          <div className="relative h-52 w-full">
=======
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 mt-10 grid gap-6 md:grid-cols-3">
      {produks.map((produk) => (
        <article
          key={produk.id}
          className="group rounded-2xl bg-white ring-1 ring-black/5 shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="relative h-56 w-full">
>>>>>>> master
            <Image
              src={produk.image}
              alt={produk.name}
              fill
<<<<<<< HEAD
              className="object-cover"
            />
          </div>

          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {produk.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              {produk.description}
            </p>

            <div className="mt-auto flex items-center justify-between pt-3">
              <p className="text-base font-semibold text-[#A7744B]">
                Rp {produk.price.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-gray-500">
=======
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-80" />
          </div>

          <div className="p-5 flex flex-col gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-[#111827] line-clamp-1">
                {produk.name}
              </h3>
              <p className="mt-1 text-sm text-[#111827]/65 line-clamp-2">
                {produk.description}
              </p>
            </div>

            <div className="flex items-end justify-between gap-3 pt-2">
              <p className="text-base font-semibold text-[#224670]">
                Rp {produk.price.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-black/50">
>>>>>>> master
                Stok: {produk.capacity} pcs
              </p>
            </div>

            <Link
<<<<<<< HEAD
              href={`/produk/${produk.id}`}
              className="mt-4 inline-block text-center w-full px-4 py-2 rounded-sm bg-gray-900 text-white hover:bg-gray-800 text-sm transition"
            >
              Lihat Detail
=======
              href="/produk"
              className="mt-2 inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold
                         bg-[#224670] text-white hover:opacity-90 transition shadow-md"
            >
              Lihat Katalog
>>>>>>> master
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
