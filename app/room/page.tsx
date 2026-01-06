import { getprodukById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/add-to-cart-button";

export default async function produkDetailPage({ params }: { params: { id: string } }) {
  const produk = await getprodukById(params.id);

  if (!produk) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 mt-10 text-center text-gray-500">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/25 blur-3xl" />
        <div className="absolute top-12 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/22 blur-3xl" />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 bg-white/90 p-6 sm:p-8 rounded-3xl shadow-md ring-1 ring-white/70 backdrop-blur">

        {/* Gambar Produk */}
        <div className="relative w-full h-80 md:h-full">
          <Image
            src={produk.image}
            alt={produk.name}
            fill
            className="object-cover rounded-3xl"
          />
        </div>

        {/* Detail Produk */}
        <div className="flex flex-col justify-center">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
            Detail Produk
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            {produk.name}
          </h1>

          <p className="text-[#111827]/70 mb-5">
            {produk.description}
          </p>

          {/* Harga & Stok */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Harga
              </p>
              <p className="text-lg font-semibold text-[#f08c6a]">
                Rp {produk.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Stok
              </p>
              <p className="text-lg font-semibold text-[#111827]">
                {produk.capacity} pcs
              </p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <AddToCartButton
            produkId={produk.id}
            className="w-full py-3 bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white font-semibold rounded-2xl hover:opacity-90 transition"
            label="Add to cart"
          />

          <Link
            href="/"
            className="block w-full text-center border border-black/10 py-2 rounded-2xl hover:bg-white transition"
          >
            Kembali ke Beranda
          </Link>
        </div>

        </div>
      </div>
    </div>
  );
}
