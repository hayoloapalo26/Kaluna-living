"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Manrope } from "next/font/google";
import OwnerMenu from "@/components/owner-menu";
import { resolveImageSrc } from "@/lib/image";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

type ProdukItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
};

export default function OwnerProductsPage() {
  const [produks, setProduks] = useState<ProdukItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

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

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        console.error("Response POST /api/admin/produks bukan JSON valid");
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

        setError(message);
        return;
      }

      if (data && typeof data === "object") {
        setProduks((prev) => [data as ProdukItem, ...prev]);
      }

      form.reset();
      setSuccess("Produk berhasil disimpan.");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan produk"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${display.variable} ${body.variable} owner-products`}>
      <div className="owner-container">
        <div className="owner-top">
          <Link href="/" className="ghost">
            Kembali
          </Link>
          <OwnerMenu />
        </div>

        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Kaluna Living</p>
            <h1 className="title">Kelola Produk</h1>
            <p className="subtitle">
              Tambah, ubah, dan pantau katalog produk agar selalu siap dipesan
              pelanggan.
            </p>
          </div>
          <div className="hero-card">
            <div className="hero-card__label">Total Produk</div>
            <div className="hero-card__value">{produks.length}</div>
            <div className="hero-card__meta">
              Update katalog langsung dari dashboard owner.
            </div>
          </div>
        </header>

        {(error || success) && (
          <div className="alerts">
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}
          </div>
        )}

        <div className="grid">
          <section className="panel form-panel">
            <div className="panel-header">
              <div>
                <h2>Tambah Produk</h2>
                <p>Lengkapi data utama produk sebelum ditampilkan.</p>
              </div>
              <span className="pill">Form</span>
            </div>

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="field">
                <label>Nama Produk</label>
                <input name="name" type="text" required />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Harga (Rupiah)</label>
                  <input name="price" type="number" min={0} required />
                </div>
                <div className="field">
                  <label>Kapasitas</label>
                  <input name="capacity" type="number" min={1} defaultValue={1} required />
                </div>
              </div>

              <div className="field">
                <label>Gambar (file)</label>
                <input name="image" type="file" accept="image/*" required />
              </div>

              <div className="field">
                <label>Deskripsi</label>
                <textarea name="description" rows={3} required />
              </div>

              <button type="submit" disabled={isSubmitting} className="primary-btn">
                {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
              </button>
            </form>
          </section>

          <section className="panel list-panel">
            <div className="panel-header">
              <div>
                <h2>Daftar Produk</h2>
                <p>Kelola detail produk yang tampil di katalog.</p>
              </div>
              <span className="pill">{produks.length} item</span>
            </div>

            {loading ? (
              <div className="empty">Memuat data produk...</div>
            ) : produks.length === 0 ? (
              <div className="empty">Belum ada produk.</div>
            ) : (
              <div className="product-grid">
                {produks.map((produk) => {
                  const imageSrc = resolveImageSrc(produk.image);
                  return (
                    <Link
                      key={produk.id}
                      href={`/owner/products/${produk.id}`}
                      className="product-card"
                    >
                      <div className="product-image">
                        <Image
                          src={imageSrc}
                          alt={produk.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="product-body">
                        <div className="product-name">{produk.name}</div>
                        <div className="product-meta">
                          Rp {produk.price.toLocaleString("id-ID")} • Kapasitas{" "}
                          {produk.capacity}
                        </div>
                        <p className="product-desc">{produk.description}</p>
                        <span className="product-link">Detail & edit →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      <style jsx>{`
        .owner-products {
          min-height: 100vh;
          color: #1f1a17;
          font-family: var(--font-body);
          background:
            radial-gradient(1100px 520px at 8% 8%, rgba(246, 197, 110, 0.35) 0%, rgba(246, 197, 110, 0) 60%),
            radial-gradient(800px 520px at 92% 0%, rgba(108, 180, 217, 0.28) 0%, rgba(108, 180, 217, 0) 55%),
            radial-gradient(900px 520px at 55% 100%, rgba(240, 140, 106, 0.25) 0%, rgba(240, 140, 106, 0) 60%),
            linear-gradient(180deg, #fff7ef 0%, #f6efe7 100%);
          position: relative;
          overflow: hidden;
        }

        .owner-products::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(31, 26, 23, 0.04) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.5;
          pointer-events: none;
        }

        .owner-container {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          padding: 96px 20px 72px;
        }

        .owner-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .ghost {
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(31, 26, 23, 0.16);
          font-size: 13px;
          color: #1f1a17;
          background: rgba(255, 255, 255, 0.6);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ghost:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(31, 26, 23, 0.08);
        }

        .hero {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
          align-items: stretch;
          margin-bottom: 22px;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.32em;
          font-size: 12px;
          color: #6f5c54;
          margin-bottom: 10px;
        }

        .title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3vw, 40px);
          margin-bottom: 10px;
          color: #1f1a17;
        }

        .subtitle {
          color: #6f5c54;
          font-size: 15px;
          line-height: 1.6;
          max-width: 520px;
        }

        .hero-card {
          background: linear-gradient(135deg, #ffffff 0%, #f7f1eb 100%);
          border-radius: 22px;
          padding: 22px;
          border: 1px solid rgba(31, 26, 23, 0.08);
          box-shadow: 0 18px 35px rgba(31, 26, 23, 0.12);
          position: relative;
          overflow: hidden;
        }

        .hero-card::after {
          content: "";
          position: absolute;
          right: -40px;
          top: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(240, 140, 106, 0.45), transparent 70%);
          opacity: 0.8;
        }

        .hero-card__label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #8a6f63;
        }

        .hero-card__value {
          font-size: 28px;
          font-weight: 700;
          margin: 10px 0 4px;
          font-family: var(--font-display);
        }

        .hero-card__meta {
          font-size: 13px;
          color: #6f5c54;
        }

        .alerts {
          display: grid;
          gap: 10px;
          margin-bottom: 18px;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 14px;
          font-size: 13px;
          border: 1px solid transparent;
        }

        .alert.error {
          background: rgba(240, 140, 106, 0.14);
          border-color: rgba(240, 140, 106, 0.25);
          color: #8a4a36;
        }

        .alert.success {
          background: rgba(108, 180, 217, 0.18);
          border-color: rgba(108, 180, 217, 0.3);
          color: #224670;
        }

        .grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          gap: 20px;
          align-items: start;
        }

        .panel {
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(31, 26, 23, 0.08);
          border-radius: 20px;
          box-shadow: 0 16px 30px rgba(31, 26, 23, 0.06);
          padding: 18px;
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .panel-header h2 {
          font-size: 18px;
          margin-bottom: 4px;
          font-family: var(--font-display);
        }

        .panel-header p {
          font-size: 12px;
          color: #7c6c62;
        }

        .pill {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          background: rgba(108, 180, 217, 0.18);
          color: #224670;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .form-grid {
          display: grid;
          gap: 14px;
        }

        .field {
          display: grid;
          gap: 8px;
        }

        .field-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .field label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #7c6c62;
          font-weight: 600;
        }

        .field input,
        .field textarea {
          border: 1px solid rgba(31, 26, 23, 0.12);
          background: rgba(255, 255, 255, 0.9);
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 14px;
          color: #1f1a17;
        }

        .field input:focus,
        .field textarea:focus {
          outline: none;
          border-color: rgba(34, 70, 112, 0.4);
          box-shadow: 0 0 0 3px rgba(108, 180, 217, 0.25);
        }

        .primary-btn {
          border: none;
          border-radius: 999px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #224670, #6cb4d9, #f08c6a);
          box-shadow: 0 12px 24px rgba(34, 70, 112, 0.2);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 30px rgba(34, 70, 112, 0.24);
        }

        .product-grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .product-card {
          display: grid;
          grid-template-rows: auto 1fr;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(31, 26, 23, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 30px rgba(31, 26, 23, 0.1);
        }

        .product-image {
          position: relative;
          width: 100%;
          height: 160px;
        }

        .product-body {
          padding: 12px 14px 14px;
          display: grid;
          gap: 6px;
        }

        .product-name {
          font-weight: 600;
          font-size: 14px;
        }

        .product-meta {
          font-size: 12px;
          color: #6f5c54;
        }

        .product-desc {
          font-size: 12px;
          color: #7c6c62;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-link {
          font-size: 12px;
          font-weight: 600;
          color: #224670;
        }

        .empty {
          padding: 18px;
          border-radius: 14px;
          border: 1px dashed rgba(31, 26, 23, 0.16);
          text-align: center;
          font-size: 13px;
          color: #7c6c62;
          background: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 960px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .owner-container {
            padding: 88px 16px 60px;
          }

          .owner-top {
            justify-content: center;
          }

          .field-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
