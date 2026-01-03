// app/admin/page.tsx
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

  const formatRupiah = (value: number) =>
    `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

  const totalProduk = produks.length;
  const sumPrice = produks.reduce((sum, p) => sum + (p.price || 0), 0);
  const sumCapacity = produks.reduce((sum, p) => sum + (p.capacity || 0), 0);
  const avgPrice = totalProduk ? Math.round(sumPrice / totalProduk) : 0;
  const avgCapacity = totalProduk ? Math.round(sumCapacity / totalProduk) : 0;
  const minPrice = totalProduk
    ? Math.min(...produks.map((p) => p.price || 0))
    : 0;
  const maxPrice = totalProduk
    ? Math.max(...produks.map((p) => p.price || 0))
    : 0;

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
    <div className="admin-overview">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Dashboard Admin</p>
          <h1 className="hero-title display">Overview Produk</h1>
          <p className="hero-subtitle">
            Pantau katalog Kaluna Living, atur produk unggulan, dan pastikan
            data siap untuk kampanye berikutnya.
          </p>
          <div className="hero-actions">
            <Link href="/admin/products" className="hero-btn primary">
              Kelola Produk
            </Link>
            <Link href="/admin/orders" className="hero-btn ghost">
              Lihat Pesanan
            </Link>
          </div>
        </div>

        <div className="hero-stat">
          <div className="stat-label">Produk Aktif</div>
          <div className="stat-value">{totalProduk}</div>
          <div className="stat-meta">
            Rata-rata harga {formatRupiah(avgPrice)}
          </div>
          <div className="stat-foot">
            Rentang harga {formatRupiah(minPrice)} - {formatRupiah(maxPrice)}
          </div>
        </div>
      </section>

      <section className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Harga rata-rata</div>
          <div className="kpi-value">{formatRupiah(avgPrice)}</div>
          <div className="kpi-note">Per produk terdaftar</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Kapasitas rata-rata</div>
          <div className="kpi-value">{avgCapacity || 0}</div>
          <div className="kpi-note">Rata-rata kapasitas produk</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total katalog</div>
          <div className="kpi-value">{totalProduk}</div>
          <div className="kpi-note">Produk tersedia di dashboard</div>
        </div>
      </section>

      {error && <div className="alert">{error}</div>}

      {loading && !error && (
        <div className="loading-state">Memuat daftar produk...</div>
      )}

      {!loading && !error && (
        <section className="catalog">
          <div className="catalog-head">
            <div>
              <h2 className="catalog-title display">
                Daftar Produk ({produks.length})
              </h2>
              <p className="catalog-subtitle">
                Kelola detail produk untuk memastikan katalog tetap up to date.
              </p>
            </div>
            <Link href="/admin/products" className="hero-btn ghost">
              Lihat Semua
            </Link>
          </div>

          {produks.length === 0 ? (
            <div className="empty-card">Belum ada produk.</div>
          ) : (
            <div className="catalog-grid">
              {produks.map((produk, index) => {
                const imageSrc = produk.image.startsWith("/")
                  ? produk.image
                  : `/${produk.image}`;

                return (
                  <Link
                    key={produk.id}
                    href={`/admin/products/${produk.id}`}
                    className="product-card"
                  >
                    <div className="product-image">
                      <Image
                        src={imageSrc}
                        alt={produk.name}
                        fill
                        priority={index < 2}
                        className="object-cover"
                      />
                    </div>
                    <div className="product-body">
                      <div className="product-title">{produk.name}</div>
                      <div className="product-meta">
                        {formatRupiah(produk.price)} | Kapasitas {produk.capacity}
                      </div>
                      <p className="product-desc line-clamp-2">
                        {produk.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}

      <style jsx>{`
        .admin-overview {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 20px;
          padding: 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, #1f3a4a 0%, #284e63 55%, #c86c4f 100%);
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          top: -60px;
          right: 40px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-eyebrow {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
        }

        .hero-title {
          font-size: clamp(28px, 3.2vw, 40px);
          margin-bottom: 10px;
        }

        .hero-subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
          line-height: 1.6;
        }

        .hero-actions {
          margin-top: 18px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-btn.primary {
          background: #f6d2c5;
          color: #2c1f19;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
        }

        .hero-btn.ghost {
          background: rgba(255, 255, 255, 0.16);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hero-btn:hover {
          transform: translateY(-1px);
        }

        .hero-stat {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 18px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          backdrop-filter: blur(6px);
        }

        .stat-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.7);
        }

        .stat-value {
          font-size: 34px;
          font-weight: 700;
        }

        .stat-meta,
        .stat-foot {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.72);
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .kpi-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(31, 26, 23, 0.08);
          border-radius: 18px;
          padding: 16px 18px;
          box-shadow: 0 12px 24px rgba(31, 26, 23, 0.08);
        }

        .kpi-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #7c6c62;
        }

        .kpi-value {
          font-size: 20px;
          font-weight: 700;
          margin-top: 8px;
        }

        .kpi-note {
          margin-top: 6px;
          font-size: 12px;
          color: #7c6c62;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 14px;
          background: rgba(200, 108, 79, 0.12);
          border: 1px solid rgba(200, 108, 79, 0.2);
          color: #8a4a36;
          font-size: 13px;
        }

        .loading-state {
          padding: 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px dashed rgba(31, 26, 23, 0.12);
          font-size: 13px;
          color: #7c6c62;
        }

        .catalog {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .catalog-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .catalog-title {
          font-size: 22px;
        }

        .catalog-subtitle {
          font-size: 13px;
          color: #7c6c62;
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          border: 1px solid rgba(31, 26, 23, 0.08);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 30px rgba(31, 26, 23, 0.12);
        }

        .product-image {
          position: relative;
          height: 160px;
          width: 100%;
        }

        .product-body {
          padding: 14px 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .product-title {
          font-size: 14px;
          font-weight: 700;
          color: #1f1a17;
        }

        .product-meta {
          font-size: 12px;
          color: #7c6c62;
        }

        .product-desc {
          font-size: 12px;
          color: #6a5c55;
        }

        .empty-card {
          padding: 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px dashed rgba(31, 26, 23, 0.12);
          color: #7c6c62;
          font-size: 13px;
        }

        @media (max-width: 960px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .kpi-grid {
            grid-template-columns: 1fr;
          }

          .catalog-head {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
