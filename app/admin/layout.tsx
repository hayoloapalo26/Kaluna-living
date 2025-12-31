// app/admin/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
<<<<<<< HEAD
    // pt-24 -> dorong konten ke bawah navbar yang fixed
    <div className="min-h-screen flex bg-gray-100 pt-24">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold">Kaluna Admin</h1>
          <p className="text-xs text-gray-500">Dashboard manajemen</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <Link
            href="/admin"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Overview
          </Link>
          <Link
            href="/admin/products"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Produk / produk
          </Link>
          <Link
            href="/admin/orders"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Pesanan
          </Link>
          <Link
            href="/admin/custom-orders"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Custom Order
          </Link>
          <Link
            href="/admin/insight"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Insight Penjualan
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <h2 className="text-lg font-medium">Admin Dashboard</h2>
        </header>

        <section className="p-6 flex-1">{children}</section>
      </main>
    </div>
  );
}
=======
    // offset dari navbar global (64px)
    <div className="min-h-screen pt-16 bg-[#faf7f2]">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="flex gap-6">
          {/* ================= SIDEBAR ================= */}
          <aside className="w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl bg-white border shadow-sm overflow-hidden">
              {/* Header sidebar */}
              <div className="px-6 py-5 border-b">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Kaluna Living
                </p>
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              </div>

              {/* Menu */}
              <nav className="px-3 py-4 text-sm space-y-1">
                <SidebarLink href="/admin">Overview</SidebarLink>
                <SidebarLink href="/admin/products">
                  Produk / Produk
                </SidebarLink>
                <SidebarLink href="/admin/orders">Pesanan</SidebarLink>
                <SidebarLink href="/admin/custom-orders">
                  Custom Order
                </SidebarLink>
                <SidebarLink href="/admin/insight">
                  Insight Penjualan
                </SidebarLink>
              </nav>

              {/* Footer sidebar */}
              <div className="border-t px-4 py-3">
                <Link
                  href="/"
                  className="text-xs text-gray-500 hover:text-gray-900"
                >
                  ← Kembali ke Home
                </Link>
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="flex-1 min-w-0">
            <div className="rounded-2xl bg-white border shadow-sm p-6 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
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
    <Link
      href={href}
      className="
        block rounded-lg px-4 py-2
        text-gray-700
        hover:bg-gray-100 hover:text-gray-900
        transition
      "
    >
      {children}
    </Link>
  );
}
>>>>>>> master
