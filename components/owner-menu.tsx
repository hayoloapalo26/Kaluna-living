"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/owner/insights", label: "Insight" },
  { href: "/owner/products", label: "Kelola Produk" },
];

export default function OwnerMenu() {
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 ring-1 ring-black/10 p-1 shadow-sm">
      {ITEMS.map((item) => {
        const active = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "px-4 py-2 rounded-full text-sm font-semibold transition",
              active
                ? "text-white bg-gradient-to-r from-kaluna-navy via-kaluna-sky to-kaluna-coral shadow-sm"
                : "text-[#2b2520] hover:bg-white/90",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
