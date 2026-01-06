"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
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
  price: number;
  capacity: number;
  image: string;
  description: string;
  createdAt: string;
};

export default function OwnerProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [produk, setProduk] = useState<ProdukItem | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
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
          setError("Response server tidak valid");
          return;
        }

        if (!Array.isArray(data)) {
          setError("Format data produk tidak sesuai");
          return;
        }

        const list = data as ProdukItem[];
        const found = list.find((p) => p.id === id);

        if (!found) {
          setError("Produk tidak ditemukan");
          return;
        }

        setProduk(found);
        setPreview(resolveImageSrc(found.image));
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data produk"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !produk) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`/api/admin/produks/${id}`, {
        method: "PATCH",
        body: formData,
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        console.error("Response PATCH /api/admin/produks/[id] bukan JSON");
      }

      if (!res.ok) {
        const msg =
          data &&
          typeof data === "object" &&
          data !== null &&
          "message" in data
            ? (data as any).message
            : "Gagal menyimpan perubahan";

        setError(msg);
        return;
      }

      if (data && typeof data === "object") {
        const updated = data as ProdukItem;
        setProduk(updated);
        setPreview(resolveImageSrc(updated.image));
      }

      setSuccess("Perubahan berhasil disimpan.");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const ok = window.confirm(
      "Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
    );
    if (!ok) return;

    setDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/admin/produks/${id}`, {
        method: "DELETE",
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        console.error("Response DELETE /api/admin/produks/[id] bukan JSON");
      }

      if (!res.ok) {
        const msg =
          data &&
          typeof data === "object" &&
          data !== null &&
          "message" in data
            ? (data as any).message
            : "Gagal menghapus produk";

        setError(msg);
        return;
      }

      router.push("/owner/products");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menghapus produk");
    } finally {
      setDeleting(false);
    }
  };

  const imageSrc = preview || (produk ? resolveImageSrc(produk.image) : "/hero.jpg");
  const showInlineAlerts = Boolean(produk) && (error || success);

  let content: ReactNode;

  if (!id) {
    content = (
      <div className="panel empty">
        ID produk tidak ditemukan di URL.
        <Link href="/owner/products" className="link">
          Kembali ke daftar produk
        </Link>
      </div>
    );
  } else if (loading) {
    content = <div className="panel empty">Memuat detail produk...</div>;
  } else if (error || !produk) {
    content = (
      <div className="panel empty">
        {error ?? "Produk tidak ditemukan"}
        <Link href="/owner/products" className="link">
          Kembali ke daftar produk
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="detail-stack">
        <div className="panel detail-card">
          <div className="detail-media">
            <Image src={imageSrc} alt={produk.name} fill className="object-cover" />
          </div>

          <div className="detail-body">
            <h2 className="detail-title">{produk.name}</h2>
            <div className="detail-meta">
              <div>
                <span>Harga:</span> Rp {produk.price.toLocaleString("id-ID")}
              </div>
              <div>
                <span>Kapasitas:</span> {produk.capacity}
              </div>
              <div>
                <span>ID Produk:</span> {produk.id}
              </div>
              <div>
                <span>Dibuat:</span>{" "}
                {new Date(produk.createdAt).toLocaleString("id-ID")}
              </div>
            </div>

            <div className="detail-desc">
              <h3>Deskripsi</h3>
              <p>{produk.description}</p>
            </div>

            <div className="detail-actions">
              <button
                type="button"
                onClick={() => {
                  setEditMode((v) => !v);
                  setSuccess(null);
                  setError(null);
                }}
                className="primary-btn"
              >
                {editMode ? "Batal Edit" : "Edit Produk"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="danger-btn"
              >
                {deleting ? "Menghapus..." : "Hapus Produk"}
              </button>
            </div>
          </div>
        </div>

        {editMode && (
          <div className="panel form-panel">
            <div className="panel-header">
              <div>
                <h2>Edit Produk</h2>
                <p>Perbarui data dan gambar produk.</p>
              </div>
              <span className="pill">Edit</span>
            </div>

            <form onSubmit={handleUpdate} className="form-grid">
              <div className="field">
                <label>Nama Produk</label>
                <input type="text" name="name" defaultValue={produk.name} required />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Harga</label>
                  <input type="number" name="price" defaultValue={produk.price} required />
                </div>
                <div className="field">
                  <label>Kapasitas</label>
                  <input type="number" name="capacity" defaultValue={produk.capacity} required />
                </div>
              </div>

              <div className="field">
                <label>Gambar (opsional)</label>
                {preview && (
                  <div className="preview">
                    <Image src={preview} alt={produk.name} fill className="object-cover" />
                  </div>
                )}
                <input type="file" name="image" accept="image/*" onChange={handlePreviewChange} />
              </div>

              <div className="field">
                <label>Deskripsi</label>
                <textarea name="description" rows={3} defaultValue={produk.description} required />
              </div>

              <button type="submit" disabled={saving} className="primary-btn">
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${display.variable} ${body.variable} owner-detail`}>
      <div className="owner-container">
        <div className="owner-top">
          <Link href="/owner/products" className="ghost">
            Kembali
          </Link>
          <OwnerMenu />
        </div>

        <header className="hero">
          <div>
            <p className="eyebrow">Kaluna Living</p>
            <h1 className="title">{produk?.name ?? "Detail Produk"}</h1>
            <p className="subtitle">Periksa dan perbarui detail produk.</p>
          </div>
          <div className="hero-card">
            <div className="hero-card__label">Status</div>
            <div className="hero-card__value">{produk ? "Aktif" : "Draft"}</div>
            <div className="hero-card__meta">
              Kelola detail sebelum ditampilkan ke pelanggan.
            </div>
          </div>
        </header>

        {showInlineAlerts && (
          <div className="alerts">
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}
          </div>
        )}

        {content}
      </div>

      <style jsx>{`
        .owner-detail {
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

        .owner-detail::before {
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
          font-size: 24px;
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

        .panel {
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(31, 26, 23, 0.08);
          border-radius: 20px;
          box-shadow: 0 16px 30px rgba(31, 26, 23, 0.06);
          padding: 18px;
        }

        .detail-stack {
          display: grid;
          gap: 18px;
        }

        .detail-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 18px;
        }

        .detail-media {
          position: relative;
          width: 100%;
          min-height: 240px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(31, 26, 23, 0.08);
        }

        .detail-body {
          display: grid;
          gap: 14px;
          align-content: start;
        }

        .detail-title {
          font-size: 22px;
          font-family: var(--font-display);
        }

        .detail-meta {
          display: grid;
          gap: 6px;
          font-size: 13px;
          color: #6f5c54;
        }

        .detail-meta span {
          font-weight: 600;
          color: #1f1a17;
          margin-right: 6px;
        }

        .detail-desc h3 {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #7c6c62;
          margin-bottom: 6px;
        }

        .detail-desc p {
          font-size: 13px;
          color: #6f5c54;
          line-height: 1.55;
        }

        .detail-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
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

        .preview {
          position: relative;
          width: 140px;
          height: 140px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(31, 26, 23, 0.1);
        }

        .primary-btn {
          border: none;
          border-radius: 999px;
          padding: 10px 16px;
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

        .danger-btn {
          border: none;
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #b93a3a, #f08c6a);
          box-shadow: 0 12px 24px rgba(185, 58, 58, 0.2);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .danger-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .danger-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 30px rgba(185, 58, 58, 0.24);
        }

        .empty {
          padding: 18px;
          border-radius: 14px;
          border: 1px dashed rgba(31, 26, 23, 0.16);
          text-align: center;
          font-size: 13px;
          color: #7c6c62;
          background: rgba(255, 255, 255, 0.5);
          display: grid;
          gap: 10px;
          justify-items: center;
        }

        .link {
          font-size: 12px;
          color: #224670;
          font-weight: 600;
        }

        @media (max-width: 960px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .detail-card {
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
