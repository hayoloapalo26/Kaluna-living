// app/admin/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type UserInfo = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
};

type PaymentInfo = {
  transactionStatus: string | null;
  fraudStatus: string | null;
} | null;

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderRow = {
  id: string;
  orderCode: string;
  createdAt: string;
  user: UserInfo;
  grossAmount: number;
  paymentStatus: string;
  shippingStatus: string;
  items: OrderItem[];
  payment: PaymentInfo;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/admin/orders", {
          method: "GET",
          cache: "no-store",
        });

        let data: unknown = null;

        try {
          data = await res.json();
        } catch {
          console.error("Response GET /api/admin/orders bukan JSON valid");
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
              : "Gagal mengambil data pesanan";

          setError(message);
          return;
        }

        if (!Array.isArray(data)) {
          setError("Format data pesanan tidak sesuai");
          return;
        }

        setOrders(data as OrderRow[]);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data pesanan"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatTanggal = (value: string) =>
    new Date(value).toLocaleString("id-ID");

  const translatePaymentStatus = (status: string | undefined | null) => {
    if (!status) return "pending";
    switch (status) {
      case "PENDING":
        return "Menunggu";
      case "PAID":
        return "Dibayar";
      case "FAILED":
        return "Gagal";
      case "EXPIRED":
        return "Kedaluwarsa";
      case "CANCELLED":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const translateShippingStatus = (status: string | undefined | null) => {
    if (!status) return "pending";
    switch (status) {
      case "PENDING":
        return "Menunggu";
      case "PACKED":
        return "Dikemas";
      case "SHIPPED":
        return "Dikirim";
      case "DELIVERED":
        return "Diterima";
      default:
        return status;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin - Pesanan</h1>

      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {loading && !error && (
        <p className="text-sm text-gray-600">Memuat daftar pesanan...</p>
      )}

      {!loading && !error && (
        <>
          <p className="text-sm text-gray-600 mb-3">
            Total pesanan: <span className="font-semibold">{orders.length}</span>
          </p>

          {orders.length === 0 ? (
            <p className="text-sm text-gray-500">
              Belum ada pesanan dari pelanggan.
            </p>
          ) : (
            <div className="overflow-x-auto border rounded-lg bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-3 py-2 text-left">Tanggal</th>
                    <th className="px-3 py-2 text-left">Customer</th>
                    <th className="px-3 py-2 text-left">Item</th>
                    <th className="px-3 py-2 text-left">Total</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const itemCount = order.items?.length ?? 0;
                    const firstItem = order.items?.[0];
                    const itemLabel =
                      itemCount > 1 && firstItem
                        ? `${firstItem.name} +${itemCount - 1} item`
                        : firstItem?.name || "-";

                    return (
                      <tr
                        key={order.id}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          {formatTanggal(order.createdAt)}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium">
                            {order.user?.name ?? "Tanpa nama"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.user?.email}
                          </div>
                          {order.user?.phone && (
                            <div className="text-xs text-gray-500">
                              {order.user.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium">
                            {itemLabel}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          Rp{" "}
                          {Number(order.grossAmount || 0).toLocaleString("id-ID")}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex flex-col gap-1">
                            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                              Payment: {translatePaymentStatus(order.paymentStatus)}
                            </span>
                            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                              Shipping: {translateShippingStatus(order.shippingStatus)}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Lihat detail
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
