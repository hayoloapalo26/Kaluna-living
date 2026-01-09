import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function badgeClass(label: string) {
  const v = (label || "").toUpperCase();

  // UI-only mapping (aman walau backend pakai variasi string)
  if (v.includes("SUCCESS") || v.includes("SETTLEMENT") || v === "PAID") {
    return "bg-[#3f7d55]/10 text-[#3f7d55] ring-1 ring-[#3f7d55]/20";
  }
  if (v.includes("PENDING") || v.includes("WAIT") || v.includes("PROCESS")) {
    return "bg-[#e6a2b6]/15 text-[#111827] ring-1 ring-[#e6a2b6]/30";
  }
  if (v.includes("FAIL") || v.includes("CANCEL") || v.includes("EXPIRE") || v.includes("DENY")) {
    return "bg-red-500/10 text-red-700 ring-1 ring-red-500/20";
  }
  return "bg-black/[0.04] text-black/70 ring-1 ring-black/10";
}

export default async function HistoryOrderPage() {
  const session = await auth();
  let userId = (session?.user as any)?.id as string | undefined;

  if (!userId && session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    userId = user?.id;
  }

  if (!userId) {
    redirect("/signin?callbackUrl=/history-order");
  }

  const [orders, reservations] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { items: true, payment: true },
    }),
    prisma.reservation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        produk: { select: { name: true, image: true, price: true } },
        payment: true,
      },
    }),
  ]);

  const content = () => {
    if (orders.length === 0 && reservations.length === 0) {
      return (
        <div className="rounded-3xl bg-white/90 p-8 ring-1 ring-white/70 shadow-md backdrop-blur">
          <p className="text-xs uppercase tracking-[0.32em] text-black/40">
            Empty state
          </p>
          <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-[#111827]">
            No orders yet
          </h3>
          <p className="mt-2 text-sm text-[#111827]/70">
            After checkout, your order history will appear here.
          </p>
          <Link
            href="/produk"
            className="mt-6 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                       bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white hover:opacity-90 transition shadow-md"
          >
            ← Belanja Produk
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {orders.length > 0 && (
          <div className="space-y-5">
            <div className="text-xs uppercase tracking-[0.32em] text-black/45">
              Orders
            </div>

            {orders.map((o) => {
              const paymentLabel =
                o.payment?.transactionStatus || o.paymentStatus || "-";
              const orderLabel =
                o.paymentStatus || o.shippingStatus || "PENDING";

              return (
                <div
                  key={o.id}
                  className="rounded-3xl bg-white/90 p-5 md:p-6 ring-1 ring-white/70 shadow-md backdrop-blur"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-[#111827]">
                        Order{" "}
                        <span className="text-[#224670] break-all">
                          {o.orderCode}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-black/50">
                        {new Date(o.createdAt).toLocaleString("id-ID")}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(
                          orderLabel
                        )}`}
                        title="Status order"
                      >
                        Order: {orderLabel}
                      </span>

                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(
                          paymentLabel
                        )}`}
                        title="Status transaksi"
                      >
                        Payment: {paymentLabel}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/70 p-4 ring-1 ring-white/70">
                    <span className="text-sm text-[#111827]/75">Total</span>
                    <span className="text-base font-semibold text-[#224670]">
                      Rp {Number(o.grossAmount || 0).toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl bg-white/90 ring-1 ring-white/70 p-4">
                      <div className="text-sm font-semibold text-[#111827]">
                        Item
                      </div>

                      <div className="mt-3 space-y-3">
                        {o.items.map((it) => (
                          <div
                            key={it.id}
                            className="flex items-start justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-[#111827] line-clamp-1">
                                {it.name}
                              </div>
                              <div className="text-xs text-black/55 mt-0.5">
                                {it.quantity} x Rp{" "}
                                {Number(it.price || 0).toLocaleString("id-ID")}
                              </div>
                            </div>

                            <div className="text-sm font-semibold text-[#111827]">
                              Rp {(it.quantity * it.price).toLocaleString("id-ID")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl bg-white/90 ring-1 ring-white/70 p-4">
                        <div className="text-sm font-semibold text-[#111827]">
                          Delivery
                        </div>
                        <div className="mt-3 text-sm text-[#111827]/75 space-y-1">
                          <div>{o.recipientName || "-"}</div>
                          <div>{o.recipientPhone || "-"}</div>
                          <div className="leading-relaxed">
                            {(o.addressLine || "-") +
                              (o.city ? `, ${o.city}` : "") +
                              (o.province ? `, ${o.province}` : "") +
                              (o.postalCode ? `, ${o.postalCode}` : "")}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/90 ring-1 ring-white/70 p-4">
                        <div className="text-sm font-semibold text-[#111827]">
                          Payment
                        </div>
                        <div className="mt-3 text-sm text-[#111827]/75 space-y-1">
                          <div>
                            Transaction:{" "}
                            <span className="font-semibold text-[#111827]">
                              {o.payment?.transactionStatus || "-"}
                            </span>
                          </div>
                          <div>
                            Fraud:{" "}
                            <span className="font-semibold text-[#111827]">
                              {o.payment?.fraudStatus || "-"}
                            </span>
                          </div>

                          {o.payment?.redirectUrl && orderLabel === "PENDING" && (
                            <a
                              href={o.payment.redirectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex mt-3 items-center justify-center rounded-2xl px-4 py-2
                                         text-sm font-semibold bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white hover:opacity-90 transition shadow-md"
                            >
                              Pay
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {reservations.length > 0 && (
          <div className="space-y-5">
            <div className="text-xs uppercase tracking-[0.32em] text-black/45">
              Reservations
            </div>

            {reservations.map((r) => {
              const paymentLabel = r.payment?.status || "UNPAID";
              const total = r.payment?.amount ?? r.price;
              const range = `${new Date(r.starDate).toLocaleDateString("id-ID")} - ${new Date(
                r.endDate
              ).toLocaleDateString("id-ID")}`;

              return (
                <div
                  key={r.id}
                  className="rounded-3xl bg-white/90 p-5 md:p-6 ring-1 ring-white/70 shadow-md backdrop-blur"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-[#111827]">
                        Reservasi{" "}
                        <span className="text-[#224670] break-all">{r.id}</span>
                      </div>
                      <div className="mt-1 text-xs text-black/50">
                        {new Date(r.createdAt).toLocaleString("id-ID")}
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(
                        paymentLabel
                      )}`}
                      title="Status pembayaran"
                    >
                      Payment: {paymentLabel}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/70 p-4 ring-1 ring-white/70">
                    <span className="text-sm text-[#111827]/75">Total</span>
                    <span className="text-base font-semibold text-[#224670]">
                      Rp {Number(total || 0).toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl bg-white/90 ring-1 ring-white/70 p-4">
                      <div className="text-sm font-semibold text-[#111827]">
                        Produk
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="text-sm font-medium text-[#111827]">
                          {r.produk?.name || "-"}
                        </div>
                        <div className="text-xs text-black/55">
                          Tanggal: {range}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/90 ring-1 ring-white/70 p-4">
                      <div className="text-sm font-semibold text-[#111827]">
                        Pembayaran
                      </div>
                      <div className="mt-3 text-sm text-[#111827]/75 space-y-1">
                        <div>
                          Status:{" "}
                          <span className="font-semibold text-[#111827]">
                            {paymentLabel}
                          </span>
                        </div>
                        <div>
                          Nominal:{" "}
                          <span className="font-semibold text-[#111827]">
                            Rp {Number(total || 0).toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/25 blur-3xl" />
        <div className="absolute top-12 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/25 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-black/45">
              Customer
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-[#111827]">
              History Order
            </h1>
            <p className="mt-2 text-sm text-[#111827]/70">
              Your order history + payment & shipping status.
            </p>
          </div>

          <Link
            href="/produk"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold
                       bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white hover:opacity-90 transition shadow-md"
          >
            Shopping Again
          </Link>
        </div>

        <div className="mt-8">{content()}</div>
      </div>
    </div>
  );
}
