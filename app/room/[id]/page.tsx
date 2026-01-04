// app/room/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getprodukById } from "@/lib/data";

export const dynamic = "force-dynamic";

interface ProdukPageProps {
  params: { id?: string };
}

export default async function ProdukDetailPage({ params }: ProdukPageProps) {
  const produk = await getprodukById(params?.id);

  if (!produk) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/25 blur-3xl" />
        <div className="absolute top-12 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/22 blur-3xl" />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-4 py-10 md:py-16 grid gap-10 md:grid-cols-[2fr,1.3fr]">
        {/* Gambar utama */}
        <div className="bg-white/90 rounded-3xl shadow-md ring-1 ring-white/70 overflow-hidden backdrop-blur">
          <div className="relative w-full h-80 md:h-[420px]">
            <Image
              src={produk.image}
              alt={produk.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Detail / info */}
        <div className="bg-white/90 rounded-3xl shadow-md ring-1 ring-white/70 p-6 md:p-8 flex flex-col gap-4 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Produk Detail
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827]">
            {produk.name}
          </h1>

          <p className="text-[#111827]/70 leading-relaxed">{produk.description}</p>

          <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-600">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Harga
              </p>
              <p className="text-lg font-semibold text-[#f08c6a]">
                Rp {produk.price.toLocaleString("id-ID")}{" "}
                <span className="text-xs text-gray-500">/ malam</span>
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Kapasitas
              </p>
              <p className="text-lg font-semibold text-[#111827]">
                {produk.capacity} orang
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/checkout?produkId=${produk.id}`}
              className="w-full text-center px-6 py-3 rounded-2xl bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white font-semibold hover:opacity-90 transition"
            >
              Pesan Sekarang
            </Link>

            <Link
              href="/"
              className="w-full text-center px-6 py-3 rounded-2xl border border-black/10 text-[#111827] hover:bg-white transition text-sm"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
