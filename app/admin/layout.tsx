"use client";

// app/admin/layout.tsx

import type { ReactNode } from "react";
import Link from "next/link";
import { Playfair_Display, Work_Sans } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // offset dari navbar global (64px)
    <div className={`${display.variable} ${body.variable} admin-shell`}>
      <div className="admin-inner">
        <div className="admin-grid">
          {/* ================= SIDEBAR ================= */}
          <aside className="admin-side">
            <div className="side-card">
              {/* Header sidebar */}
              <div className="side-header">
                <div>
                  <p className="side-eyebrow">
                  Kaluna Living
                  </p>
                  <h1 className="side-title display">Admin Center</h1>
                </div>
                <span className="side-pill">Live</span>
              </div>

              {/* Menu */}
              <nav className="side-nav">
                <SidebarLink href="/admin">Overview</SidebarLink>
                <SidebarLink href="/admin/products">Produk</SidebarLink>
                <SidebarLink href="/admin/orders">Pesanan</SidebarLink>
                <SidebarLink href="/admin/custom-orders">
                  Custom Order
                </SidebarLink>
                <SidebarLink href="/admin/insight">
                  Insight Penjualan
                </SidebarLink>
              </nav>

              {/* Footer sidebar */}
              <div className="side-footer">
                <Link
                  href="/"
                  className="side-footer-link"
                >
                  Kembali ke Home
                </Link>
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="admin-main">
            <div className="admin-surface">{children}</div>
          </main>
        </div>
      </div>
      <style jsx global>{`
        .admin-shell {
          min-height: 100vh;
          padding-top: 64px;
          font-family: var(--font-body);
          color: #1f1a17;
          background:
            radial-gradient(900px 520px at 12% 6%, rgba(246, 197, 110, 0.35) 0%, rgba(246, 197, 110, 0) 60%),
            radial-gradient(760px 520px at 95% 0%, rgba(108, 180, 217, 0.28) 0%, rgba(108, 180, 217, 0) 55%),
            radial-gradient(900px 520px at 60% 100%, rgba(240, 140, 106, 0.25) 0%, rgba(240, 140, 106, 0) 60%),
            linear-gradient(180deg, #fff7ef 0%, #f6efe7 100%);
          position: relative;
          overflow: hidden;
        }

        .admin-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(31, 26, 23, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.35;
          pointer-events: none;
        }

        .admin-shell .display {
          font-family: var(--font-display);
        }

        .admin-inner {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 28px 20px 56px;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
        }

        .admin-side {
          position: sticky;
          top: 92px;
          align-self: start;
        }

        .side-card {
          background: rgba(255, 255, 255, 0.85);
          border-radius: 22px;
          border: 1px solid rgba(31, 26, 23, 0.08);
          box-shadow: 0 18px 36px rgba(31, 26, 23, 0.08);
          overflow: hidden;
        }

        .side-header {
          padding: 20px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid rgba(31, 26, 23, 0.08);
        }

        .side-eyebrow {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #7c6c62;
          margin-bottom: 4px;
        }

        .side-title {
          font-size: 20px;
          color: #1f1a17;
        }

        .side-pill {
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(108, 180, 217, 0.2);
          color: #224670;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .side-nav {
          display: grid;
          gap: 8px;
          padding: 16px;
        }

        .side-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 14px;
          color: #3d332c;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
        }

        .side-link:hover {
          transform: translateY(-1px);
          border-color: rgba(31, 26, 23, 0.1);
          box-shadow: 0 10px 20px rgba(31, 26, 23, 0.08);
        }

        .side-footer {
          padding: 16px 20px;
          border-top: 1px solid rgba(31, 26, 23, 0.08);
        }

        .side-footer-link {
          font-size: 12px;
          color: #7c6c62;
        }

        .side-footer-link:hover {
          color: #1f1a17;
        }

        .admin-main {
          min-width: 0;
        }

        .admin-surface {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 26px;
          border: 1px solid rgba(31, 26, 23, 0.08);
          box-shadow: 0 20px 40px rgba(31, 26, 23, 0.1);
          padding: 28px;
        }

        @media (max-width: 1024px) {
          .admin-grid {
            grid-template-columns: 1fr;
          }

          .admin-side {
            position: static;
          }

          .side-nav {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .admin-inner {
            padding: 20px 14px 40px;
          }

          .admin-surface {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

/* ================= HELPER ================= */
function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="side-link">
      {children}
    </Link>
  );
}
