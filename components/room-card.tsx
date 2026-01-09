import Image from "next/image";
import type { Produk } from "@prisma/client";

export default function produkCard({ produk }: { produk: Produk }) {
  return (
    <div className="rounded-2xl bg-white/90 ring-1 ring-white/70 shadow-md overflow-hidden">
      <div className="relative w-full h-56">
        <Image
          src={produk.image}
          alt={produk.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#111827]">{produk.name}</h3>
        <p className="text-[#111827]/60 text-sm mt-1">
          Stok tersedia: {produk.capacity}
        </p>
        <p className="text-[#224670] font-semibold mt-1">
          Rp {produk.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
