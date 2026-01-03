"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Playfair_Display, Manrope } from "next/font/google";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

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

type MonthItem = { ym: string; revenue: number; orders: number };
type TopProduct = { produkId: string; name: string; qty: number; revenue: number };

type InsightResponse = {
  summary: { totalRevenue: number; totalOrders: number; avgOrderValue: number };
  monthly: MonthItem[];
  topProducts: TopProduct[];
  message?: string;
};

function rupiah(n: number) {
  return `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
}

function monthLabel(ym: string) {
  const [y, m] = ym.split("-");
  const year = Number(y);
  const month = Number(m);
  if (!year || !month) return ym;
  const d = new Date(year, month - 1, 1);
  return d.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
}

export default function OwnerInsightPage() {
  const [months, setMonths] = useState(12);
  const [top, setTop] = useState(10);

  const [data, setData] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`/api/owner/insights?months=${months}&top=${top}`, {
          cache: "no-store",
        });
        const json = (await res.json().catch(() => null)) as InsightResponse | null;

        if (!res.ok) {
          setErr(json?.message || "Gagal mengambil insight.");
          setData(null);
          return;
        }

        if (!json) {
          setErr("Response server tidak valid.");
          setData(null);
          return;
        }

        setData(json);
      } catch (e) {
        console.error(e);
        setErr("Gagal mengambil insight.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [months, top]);

  const monthly = useMemo(() => data?.monthly ?? [], [data]);
  const topProducts = useMemo(() => data?.topProducts ?? [], [data]);
  const summary = data?.summary ?? {
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
  };

  const latest = monthly[monthly.length - 1];
  const latestLabel = latest ? monthLabel(latest.ym) : "Bulan terakhir";
  const maxRevenue = useMemo(
    () =>
      topProducts.reduce((max, p) => (p.revenue > max ? p.revenue : max), 0),
    [topProducts]
  );

  return (
    <div className={`${display.variable} ${body.variable} insight-page`}>
      <div className="insight-container">
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Kaluna Living</p>
            <h1 className="title">Insight Bisnis</h1>
            <p className="subtitle">
              Ringkasan pemasukan dan performa penjualan Kaluna Living dalam satu
              tampilan.
            </p>

            <div className="hero-actions">
              <Link href="/" className="ghost">
                Kembali
              </Link>
              {loading && <span className="loading-pill">Memuat data...</span>}
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card__label">Periode {months} bulan</div>
            <div className="hero-card__value">{rupiah(summary.totalRevenue)}</div>
            <div className="hero-card__meta">
              {summary.totalOrders} order | Rata-rata {rupiah(summary.avgOrderValue)}
            </div>
            <div className="hero-card__footer">
              {latestLabel} | {latest?.orders ?? 0} order
            </div>
          </div>
        </header>

        <section className="panel controls reveal" style={{ animationDelay: "60ms" }}>
          <div className="control-group">
            <span className="control-label">Periode</span>
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="control-select"
            >
              <option value={3}>3 bulan</option>
              <option value={6}>6 bulan</option>
              <option value={12}>12 bulan</option>
              <option value={24}>24 bulan</option>
            </select>
          </div>

          <div className="control-group">
            <span className="control-label">Top produk</span>
            <select
              value={top}
              onChange={(e) => setTop(Number(e.target.value))}
              className="control-select"
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={20}>Top 20</option>
            </select>
          </div>

          <div className="control-note">
            Data terbarui setelah pembayaran sukses.
          </div>
        </section>

        {err && (
          <div className="alert reveal" style={{ animationDelay: "120ms" }}>
            {err}
          </div>
        )}

        <section className="kpi-grid">
          <div className="panel kpi-card reveal" style={{ animationDelay: "140ms" }}>
            <div className="kpi-label">Total Pemasukan</div>
            <div className="kpi-value">{rupiah(summary.totalRevenue)}</div>
            <div className="kpi-note">Akumulasi {months} bulan terakhir</div>
          </div>

          <div className="panel kpi-card reveal" style={{ animationDelay: "170ms" }}>
            <div className="kpi-label">Total Order</div>
            <div className="kpi-value">{summary.totalOrders}</div>
            <div className="kpi-note">Order dengan status PAID</div>
          </div>

          <div className="panel kpi-card reveal" style={{ animationDelay: "200ms" }}>
            <div className="kpi-label">Rata-rata Order</div>
            <div className="kpi-value">{rupiah(summary.avgOrderValue)}</div>
            <div className="kpi-note">Nilai rata-rata per transaksi</div>
          </div>
        </section>

        <section className="charts-grid">
          <div className="panel chart-card reveal" style={{ animationDelay: "240ms" }}>
            <div className="panel-header">
              <div>
                <h2>Pemasukan per Bulan</h2>
                <p>Tren revenue dari transaksi sukses.</p>
              </div>
              <span className="pill">Revenue</span>
            </div>

            <div className="chart-wrap">
              {monthly.length === 0 ? (
                <div className="empty">Belum ada data pemasukan.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthly} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eadfd6" />
                    <XAxis dataKey="ym" tickFormatter={monthLabel} stroke="#7c6c62" />
                    <YAxis
                      tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
                      stroke="#7c6c62"
                    />
                    <Tooltip
                      formatter={(v: any) => rupiah(Number(v))}
                      labelFormatter={(v) => `Bulan: ${monthLabel(String(v))}`}
                      contentStyle={{
                        background: "rgba(255,255,255,0.94)",
                        border: "1px solid rgba(31,26,23,0.08)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 24px rgba(31,26,23,0.08)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#c86c4f"
                      strokeWidth={3}
                      dot={{ r: 3, fill: "#c86c4f" }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="panel chart-card reveal" style={{ animationDelay: "280ms" }}>
            <div className="panel-header">
              <div>
                <h2>Order per Bulan</h2>
                <p>Jumlah order berhasil per bulan.</p>
              </div>
              <span className="pill">Orders</span>
            </div>

            <div className="chart-wrap">
              {monthly.length === 0 ? (
                <div className="empty">Belum ada data order.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthly} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="orderBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#274760" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#274760" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eadfd6" />
                    <XAxis dataKey="ym" tickFormatter={monthLabel} stroke="#7c6c62" />
                    <YAxis stroke="#7c6c62" allowDecimals={false} />
                    <Tooltip
                      formatter={(v: any) => `${Number(v).toLocaleString("id-ID")} order`}
                      labelFormatter={(v) => `Bulan: ${monthLabel(String(v))}`}
                      contentStyle={{
                        background: "rgba(255,255,255,0.94)",
                        border: "1px solid rgba(31,26,23,0.08)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 24px rgba(31,26,23,0.08)",
                      }}
                    />
                    <Bar dataKey="orders" fill="url(#orderBar)" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>

        <section className="panel top-products reveal" style={{ animationDelay: "320ms" }}>
          <div className="panel-header">
            <div>
              <h2>Produk Terlaris</h2>
              <p>Berdasarkan total quantity terjual dari transaksi PAID.</p>
            </div>
            <span className="pill">Top {top}</span>
          </div>

          {topProducts.length === 0 ? (
            <div className="empty">Belum ada data penjualan pada periode ini.</div>
          ) : (
            <div className="top-table">
              <div className="top-head">
                <span>#</span>
                <span>Produk</span>
                <span>Terjual</span>
                <span>Omzet</span>
              </div>
              {topProducts.map((p, idx) => {
                const width =
                  maxRevenue > 0 ? Math.max(8, (p.revenue / maxRevenue) * 100) : 0;
                return (
                  <div className="top-row" key={`${p.produkId}-${idx}`}>
                    <div className="rank">#{idx + 1}</div>
                    <div className="prod">
                      <div className="prod-name">{p.name}</div>
                      <div className="prod-bar">
                        <span style={{ width: `${width}%` }} />
                      </div>
                    </div>
                    <div className="qty">{p.qty.toLocaleString("id-ID")}</div>
                    <div className="rev">{rupiah(p.revenue)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .insight-page {
          min-height: 100vh;
          color: #1f1a17;
          font-family: var(--font-body);
          background:
            radial-gradient(1100px 520px at 8% 8%, #f5e6d6 0%, rgba(245, 230, 214, 0) 60%),
            radial-gradient(800px 520px at 92% 0%, #dfe7f4 0%, rgba(223, 231, 244, 0) 55%),
            linear-gradient(180deg, #faf7f3 0%, #f3ede6 100%);
          position: relative;
          overflow: hidden;
        }

        .insight-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(31, 26, 23, 0.04) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.5;
          pointer-events: none;
        }

        .insight-container {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 96px 20px 72px;
          z-index: 1;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 28px;
          align-items: stretch;
          margin-bottom: 24px;
        }

        .hero-copy {
          background: transparent;
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

        .hero-actions {
          margin-top: 18px;
          display: flex;
          gap: 12px;
          align-items: center;
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

        .loading-pill {
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          background: rgba(39, 71, 96, 0.12);
          color: #274760;
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
          background: radial-gradient(circle at 30% 30%, rgba(200, 108, 79, 0.45), transparent 70%);
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

        .hero-card__footer {
          margin-top: 14px;
          font-size: 12px;
          color: #8a6f63;
        }

        .panel {
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(31, 26, 23, 0.08);
          border-radius: 20px;
          box-shadow: 0 16px 30px rgba(31, 26, 23, 0.06);
        }

        .controls {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          flex-wrap: wrap;
          padding: 16px 18px;
          margin-bottom: 20px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #7c6c62;
        }

        .control-select {
          border: 1px solid rgba(31, 26, 23, 0.12);
          background: #fff;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 13px;
          min-width: 130px;
        }

        .control-note {
          margin-left: auto;
          font-size: 12px;
          color: #7c6c62;
        }

        .alert {
          background: rgba(200, 108, 79, 0.12);
          border: 1px solid rgba(200, 108, 79, 0.22);
          color: #8a4a36;
          padding: 12px 16px;
          border-radius: 14px;
          margin-bottom: 18px;
          font-size: 13px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 22px;
        }

        .kpi-card {
          padding: 18px 20px;
        }

        .kpi-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #7c6c62;
        }

        .kpi-value {
          font-size: 22px;
          font-weight: 700;
          margin-top: 8px;
        }

        .kpi-note {
          margin-top: 8px;
          font-size: 12px;
          color: #7c6c62;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
        }

        .chart-card {
          padding: 18px 18px 8px;
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
          background: rgba(39, 71, 96, 0.1);
          color: #274760;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .chart-wrap {
          height: 280px;
        }

        .empty {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #7c6c62;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 14px;
          border: 1px dashed rgba(31, 26, 23, 0.12);
        }

        .top-products {
          padding: 18px;
        }

        .top-table {
          display: grid;
          gap: 12px;
        }

        .top-head,
        .top-row {
          display: grid;
          grid-template-columns: 50px 1fr 90px 140px;
          gap: 12px;
          align-items: center;
        }

        .top-head {
          font-size: 12px;
          color: #7c6c62;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0 6px;
        }

        .top-row {
          padding: 10px 6px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(31, 26, 23, 0.06);
        }

        .rank {
          font-weight: 600;
          color: #274760;
        }

        .prod-name {
          font-weight: 600;
          margin-bottom: 6px;
        }

        .prod-bar {
          width: 100%;
          height: 6px;
          background: rgba(39, 71, 96, 0.12);
          border-radius: 999px;
          overflow: hidden;
        }

        .prod-bar span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #c86c4f 0%, #e4a47f 100%);
          border-radius: 999px;
        }

        .qty,
        .rev {
          text-align: right;
          font-weight: 600;
          color: #1f1a17;
        }

        .reveal {
          animation: rise 650ms ease both;
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 960px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .top-head {
            display: none;
          }

          .top-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .qty,
          .rev {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}
