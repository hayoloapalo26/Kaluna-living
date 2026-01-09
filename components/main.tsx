// components/main.tsx
import Image from "next/image";
import Link from "next/link";
import { getproduks } from "@/lib/data";

export default async function Main() {
  const produks = await getproduks();

  if (!produks || produks.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 mt-10">
        <div className="rounded-3xl bg-white/90 p-8 ring-1 ring-white/60 shadow-md text-center backdrop-blur">
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
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 mt-10 grid gap-6 md:grid-cols-3">
      {produks.map((produk) => (
        <article
          key={produk.id}
          className="group rounded-3xl bg-[linear-gradient(135deg,rgba(108,180,217,0.4),rgba(255,255,255,0.9),rgba(240,140,106,0.35))] p-[1px] shadow-lg transition hover:-translate-y-0.5"
        >
          <div className="rounded-3xl bg-white/90 ring-1 ring-white/60 overflow-hidden">
            <div className="relative h-56 w-full">
              <Image
                src={produk.image}
                alt={produk.name}
                fill
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
                  Stok: {produk.capacity} pcs
                </p>
              </div>

              <Link
                href="/produk"
                className="mt-2 inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold
                           bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white hover:opacity-90 transition shadow-md"
              >
                Lihat Katalog
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
