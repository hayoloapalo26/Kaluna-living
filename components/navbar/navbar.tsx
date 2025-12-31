"use client";

import Link from "next/link";
import Image from "next/image";
<<<<<<< HEAD
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
=======
import { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type CartResponse = {
  id: string;
  items: Array<{ id: string; quantity: number }>;
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/produk", label: "Product" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/history-order", label: "History" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

>>>>>>> master
  const role = (session?.user as any)?.role as
    | "ADMIN"
    | "OWNER"
    | "CUSTOMER"
    | undefined;

  const isAdminLike = role === "ADMIN" || role === "OWNER";

<<<<<<< HEAD
  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link href={isAdminLike ? "/admin" : "/"}>
          <Image
            src="/logo.png"
            alt="Kaluna Living"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[128px] h-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          {/* 👉 MENU CUSTOMER: hanya tampil kalau BUKAN admin/owner */}
          {!isAdminLike && (
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link href="/">HOME</Link>
              <Link href="/about">ABOUT</Link>
              <Link href="/produk">PRODUCT</Link>
              <Link href="/checkout">ORDER</Link>
              <Link href="/myreservation">MY RESERVATION</Link>
            </nav>
          )}

          {/* Avatar + SignIn/SignOut */}
          <div className="flex items-center gap-3">
            {session && (
              <div className="text-sm bg-gray-50 border rounded-full flex items-center justify-center w-8 h-8">
                <span className="text-xs font-semibold">
                  {session.user?.name?.charAt(0) ??
                    (session.user as any)?.username?.charAt(0) ??
                    "U"}
                </span>
              </div>
            )}

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="py-2 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-sm text-sm"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/signin"
                className="py-2 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
=======
  const [cartCount, setCartCount] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = useMemo(() => {
    const name =
      session?.user?.name ??
      (session?.user as any)?.username ??
      (session?.user as any)?.email ??
      "User";
    const s = String(name).trim();
    return s ? s.charAt(0).toUpperCase() : "U";
  }, [session]);

  useEffect(() => {
    const loadCartCount = async () => {
      if (status !== "authenticated" || isAdminLike) return;

      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) {
          setCartCount(0);
          return;
        }
        const data = (await res.json()) as CartResponse;
        const totalQty = Array.isArray(data?.items)
          ? data.items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0)
          : 0;
        setCartCount(totalQty);
      } catch {
        setCartCount(0);
      }
    };

    loadCartCount();
  }, [status, isAdminLike]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Bar */}
      <div className="bg-[#faf7f2]/90 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <Link
              href={isAdminLike ? "/admin" : "/"}
              className="flex items-center gap-3"
              aria-label="Kaluna Living"
            >
              <Image
                src="/logo.png"
                alt="Kaluna Living"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Center: Nav (desktop customer only) */}
            {!isAdminLike && (
              <nav className="hidden md:flex items-center gap-2">
                {NAV.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={[
                      "px-4 py-2 rounded-full text-sm font-semibold transition",
                      isActive(it.href)
                        ? "bg-white ring-1 ring-black/10 text-[#111827]"
                        : "text-[#111827]/70 hover:text-[#111827] hover:bg-black/[0.03]",
                    ].join(" ")}
                  >
                    {it.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile menu button (customer only) */}
              {!isAdminLike && (
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center rounded-full w-10 h-10
                             bg-white ring-1 ring-black/10 hover:bg-black/[0.03] transition"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Toggle menu"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}

              {/* ✅ Cart icon – PREMIUM */}
              {!isAdminLike && session && (
                <Link
                  href="/cart"
                  className="
                    relative
                    group
                    inline-flex items-center justify-center
                    w-11 h-11
                    rounded-full
                    bg-white/90
                    ring-1 ring-black/10
                    shadow-sm
                    hover:shadow-md
                    hover:ring-black/20
                    hover:bg-black/[0.03]
                    transition-all
                    duration-200
                  "
                  aria-label="Keranjang"
                  title="Keranjang"
                >
                  {/* Cart icon */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                      text-[#111827]
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <path
                      d="M6 6h15l-2 8H7L6 6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6 5 3H2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  </svg>

                  {/* Badge */}
                  {cartCount > 0 && (
                    <span
                      className="
                        absolute -top-1 -right-1
                        min-w-[18px] h-[18px]
                        px-[5px]
                        flex items-center justify-center
                        rounded-full
                        bg-gradient-to-br from-red-500 to-red-600
                        text-white
                        text-[10px]
                        font-bold
                        leading-none
                        shadow-md
                        ring-2 ring-white
                      "
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Profile chip (when logged in) */}
              {session && (
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-white ring-1 ring-black/10 px-2 py-1">
                  <div className="w-9 h-9 rounded-full bg-[#224670] text-white flex items-center justify-center font-bold">
                    {initials}
                  </div>
                  <div className="pr-2">
                    <div className="text-xs font-semibold leading-tight text-[#111827] max-w-[120px] truncate">
                      {session.user?.name ??
                        (session.user as any)?.username ??
                        "User"}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-black/45">
                      {role ?? "USER"}
                    </div>
                  </div>
                </div>
              )}

              {/* Sign in/out */}
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold
                             bg-white ring-1 ring-black/10 hover:bg-black/[0.03] transition"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold
                             bg-[#224670] text-white hover:opacity-90 transition shadow-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer (customer only) */}
      {!isAdminLike && mobileOpen && (
        <div className="md:hidden bg-[#faf7f2]/95 backdrop-blur border-b border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            {NAV.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "block px-4 py-3 rounded-2xl text-sm font-semibold transition",
                  isActive(it.href)
                    ? "bg-white ring-1 ring-black/10 text-[#111827]"
                    : "text-[#111827]/70 hover:text-[#111827] hover:bg-black/[0.03]",
                ].join(" ")}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
>>>>>>> master
