"use client";

import { useState } from "react";

type Props = {
  produkId: string;
  className?: string;
  label?: string;
};

export default function AddToCartButton({
  produkId,
  className,
  label = "Add to cart",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAdd = async () => {
    if (loading) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produkId, quantity: 1 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const text =
          data &&
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as any).message === "string"
            ? (data as any).message
            : "Gagal menambahkan ke keranjang.";

        setMessage({ type: "error", text });
        return;
      }

      setMessage({ type: "success", text: "Produk ditambahkan ke keranjang." });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cart:updated"));
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Terjadi kesalahan saat menambahkan produk.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleAdd}
        disabled={loading}
        className={className}
      >
        {loading ? "Menambahkan..." : label}
      </button>
      {message && (
        <p
          className={`text-xs ${
            message.type === "error"
              ? "text-red-600"
              : "text-emerald-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
