"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Produk = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type CartItem = {
  id: string;
  quantity: number;
  price: number;
  produk: Produk;
};

type CartData = {
  id: string | null;
  items: CartItem[];
};

export default function CartPage() {
  const [cart, setCart] = useState<CartData>({ id: null, items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(() => {
    return cart.items.reduce((sum, it) => sum + it.quantity * it.price, 0);
  }, [cart.items]);

  const itemCount = useMemo(() => {
    return cart.items.reduce((sum, it) => sum + it.quantity, 0);
  }, [cart.items]);

  const hasItems = cart.items.length > 0;

  const loadCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Gagal mengambil cart");
        setCart({ id: null, items: [] });
        return;
      }

      setCart(data);
    } catch (e) {
      console.error(e);
      setError("Terjadi kesalahan saat mengambil cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQty = async (itemId: string, quantity: number) => {
    setError(null);
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.message || "Gagal mengubah jumlah item");
        return;
      }

      await loadCart();
    } catch (e) {
      console.error(e);
      setError("Terjadi kesalahan saat mengubah jumlah item");
    }
  };

  const removeItem = async (itemId: string) => {
    setError(null);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.message || "Gagal menghapus item");
        return;
      }

      await loadCart();
    } catch (e) {
      console.error(e);
      setError("Terjadi kesalahan saat menghapus item");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-[#e8d9cb]/60 blur-3xl" />
          <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-[#d9e6f4]/60 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(31,26,23,0.08)_1px,transparent_1px)] [background-size:26px_26px] opacity-40" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
          <div className="rounded-3xl bg-white/85 p-6 ring-1 ring-black/5 shadow-md">
            <p className="text-sm text-black/60">Memuat keranjang...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-[#e8d9cb]/60 blur-3xl" />
        <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-[#d9e6f4]/60 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(31,26,23,0.08)_1px,transparent_1px)] [background-size:26px_26px] opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-black/45">
                Keranjang
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#111827]">
                Ringkas Pesananmu
              </h1>
              <p className="text-[#111827]/70 max-w-2xl">
                Cek detail produk sebelum lanjut ke pembayaran.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-full bg-white/80 ring-1 ring-black/5 px-4 py-2 text-xs font-semibold text-[#224670]">
                {itemCount} item
              </div>
              <div className="rounded-full bg-white/80 ring-1 ring-black/5 px-4 py-2 text-xs font-semibold text-[#224670]">
                Total {total.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-white/90 p-4 ring-1 ring-red-500/20 text-red-700 shadow-md">
            <p className="text-sm font-semibold">Terjadi kesalahan</p>
            <p className="text-sm mt-1 text-red-700/90">{error}</p>
          </div>
        )}

        {!hasItems ? (
          <div className="mt-8 rounded-3xl bg-white/90 p-8 ring-1 ring-black/5 shadow-md">
            <p className="text-xs uppercase tracking-[0.32em] text-black/40">
              Empty cart
            </p>
            <h2 className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-[#111827]">
              Keranjang kamu masih kosong
            </h2>
            <p className="mt-2 text-sm text-[#111827]/70">
              Mulai belanja dari katalog untuk menambahkan produk.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/produk"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                           bg-[#224670] text-white hover:opacity-90 transition shadow-md"
              >
                Mulai Belanja
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                           bg-white ring-1 ring-black/10 hover:bg-black/[0.03] transition"
              >
                Kembali ke Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,0.45fr] items-start">
            <div className="space-y-4">
              {cart.items.map((it) => {
                const img = it.produk.image?.startsWith("/")
                  ? it.produk.image
                  : `/${it.produk.image}`;

                const lineTotal = it.quantity * it.price;

                return (
                  <div
                    key={it.id}
                    className="group rounded-3xl bg-white/90 p-4 md:p-5 ring-1 ring-black/5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-28 md:h-28 md:w-32 overflow-hidden rounded-3xl bg-black/[0.04] ring-1 ring-black/5">
                        <Image
                          src={img}
                          alt={it.produk.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 112px, 128px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-base font-semibold tracking-tight text-[#111827] line-clamp-1">
                              {it.produk.name}
                            </p>
                            <p className="mt-1 text-xs text-[#111827]/60">
                              Harga satuan
                            </p>
                            <p className="text-sm font-semibold text-[#224670]">
                              Rp {it.price.toLocaleString("id-ID")}
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(it.id)}
                            className="shrink-0 text-xs font-semibold text-red-600 hover:opacity-80 transition"
                            type="button"
                          >
                            Hapus
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-2xl bg-black/[0.04] ring-1 ring-black/10 overflow-hidden">
                            <button
                              onClick={() =>
                                updateQty(it.id, Math.max(1, it.quantity - 1))
                              }
                              className="h-9 w-10 text-[#224670] hover:bg-black/[0.05] transition"
                              type="button"
                              aria-label="Kurangi jumlah"
                            >
                              −
                            </button>
                            <div className="h-9 w-12 flex items-center justify-center text-sm font-semibold text-[#111827]">
                              {it.quantity}
                            </div>
                            <button
                              onClick={() => updateQty(it.id, it.quantity + 1)}
                              className="h-9 w-10 text-[#224670] hover:bg-black/[0.05] transition"
                              type="button"
                              aria-label="Tambah jumlah"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-sm text-[#111827]/70">
                            Subtotal{" "}
                            <span className="font-semibold text-[#111827]">
                              Rp {lineTotal.toLocaleString("id-ID")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl bg-white/90 p-5 md:p-6 ring-1 ring-black/5 shadow-md lg:sticky lg:top-24">
              <h2 className="text-base md:text-lg font-semibold tracking-tight text-[#111827]">
                Ringkasan
              </h2>

              <div className="mt-4 space-y-3 text-sm text-[#111827]/80">
                <div className="flex items-center justify-between">
                  <span>Subtotal ({itemCount} item)</span>
                  <span className="font-semibold text-[#111827]">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pengiriman</span>
                  <span className="text-[#111827]/60">Ditentukan di checkout</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Diskon</span>
                  <span>Rp 0</span>
                </div>
              </div>

              <div className="mt-5 border-t border-black/10 pt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-[#111827]">Total</span>
                <span className="text-base font-semibold text-[#224670]">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>

              <Link href="/cart/checkout" className="block mt-5">
                <button
                  className="w-full rounded-2xl bg-gradient-to-r from-[#224670] to-[#2f5e93] text-white px-4 py-3 text-sm font-semibold
                             hover:opacity-90 transition shadow-md"
                  type="button"
                >
                  Lanjut ke Pembayaran
                </button>
              </Link>

              <p className="text-xs text-[#111827]/60 mt-3 leading-relaxed">
                Pembayaran aman. Detail pengiriman akan diisi di tahap berikutnya.
              </p>

              <Link
                href="/produk"
                className="mt-4 inline-flex text-sm font-semibold text-[#224670] hover:opacity-80 transition"
              >
                Tambah item lainnya
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
