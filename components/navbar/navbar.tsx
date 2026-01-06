"use client";

import Link from "next/link";
import Image from "next/image";
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

  const role = (session?.user as any)?.role as
    | "ADMIN"
    | "OWNER"
    | "CUSTOMER"
    | undefined;

  const isAdminLike = role === "ADMIN" || role === "OWNER";

  const [cartCount, setCartCount] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

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
    if (status !== "authenticated" || isAdminLike) {
      setCartCount(0);
      return;
    }

    const loadCartCount = async () => {
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

    const handleUpdated = () => {
      loadCartCount();
    };

    window.addEventListener("cart:updated", handleUpdated);
    return () => window.removeEventListener("cart:updated", handleUpdated);
  }, [status, isAdminLike]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kaluna-theme");
      const preferred =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      const nextTheme =
        stored === "light" || stored === "dark" ? stored : preferred;
      setTheme(nextTheme);
      setMounted(true);
    } catch {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("kaluna-theme", theme);
    } catch {}
  }, [theme, mounted]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.9),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(224,233,244,0.8),transparent_50%)]" />
          <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a]" />
        </div>
        <div className="relative bg-[#fff7ef]/85 backdrop-blur-xl border-b border-black/5">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="h-16 flex items-center justify-between gap-4">
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

              {!isAdminLike && (
                <div className="hidden md:block">
                  <div className="rounded-full bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] p-[1.5px] shadow-sm">
                    <nav className="flex items-center gap-1 rounded-full bg-[#fff7ef]/90 backdrop-blur px-1 py-1 ring-1 ring-white/40">
                      {NAV.map((it) => {
                        const active = isActive(it.href);
                        return (
                          <Link
                            key={it.href}
                            href={it.href}
                            prefetch={it.href === "/history-order" ? false : undefined}
                            className={[
                              "group relative px-4 py-2 text-sm font-semibold transition",
                              active ? "text-white" : "text-[#2b2520]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "absolute inset-0 rounded-full transition",
                                active
                                  ? "bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] shadow-md"
                                  : "bg-transparent group-hover:bg-white/85",
                              ].join(" ")}
                            />
                            <span className="relative z-10">{it.label}</span>
                            <span
                              className={[
                                "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition",
                                active
                                  ? "bg-[#f6c56e]"
                                  : "bg-[#f6c56e]/70 opacity-0 group-hover:opacity-80",
                              ].join(" ")}
                            />
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
              {!isAdminLike && (
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center rounded-full w-10 h-10
                             bg-white/85 ring-1 ring-black/10 hover:bg-white transition"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Toggle menu"
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6l12 12M18 6l-12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
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
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="theme-toggle inline-flex items-center justify-center rounded-full w-10 h-10
                           bg-white/85 ring-1 ring-black/10 hover:bg-white transition"
                aria-label="Toggle tema"
                aria-pressed={theme === "dark"}
                title={theme === "dark" ? "Mode terang" : "Mode gelap"}
              >
                {mounted && theme === "dark" ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4V2M12 22v-2M4 12H2m20 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4l-1.4 1.4m15.6-15.6 1.4-1.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {!isAdminLike && session && (
                <Link
                  href="/cart"
                  className="
                    relative
                    group
                    inline-flex items-center justify-center
                    w-11 h-11
                    rounded-full
                    bg-gradient-to-br from-white to-[#fbe6d6]
                    ring-1 ring-[#f08c6a]/40
                    shadow-sm
                    hover:shadow-md
                    hover:ring-[#f08c6a]/70
                    hover:from-white hover:to-[#ffe6d6]
                    transition-all
                    duration-200
                  "
                  aria-label="Keranjang"
                  title="Keranjang"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                      text-[#224670]
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

                  {cartCount > 0 && (
                    <span
                      className="
                        absolute -top-1 -right-1
                        min-w-[18px] h-[18px]
                        px-[5px]
                        flex items-center justify-center
                        rounded-full
                        bg-gradient-to-br from-[#f08c6a] to-[#f6c56e]
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

              {session && (
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/80 ring-1 ring-black/10 px-2 py-1 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#224670] to-[#3b6aa0] text-white flex items-center justify-center font-bold">
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

              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold
                             bg-white/85 ring-1 ring-black/10 hover:bg-white transition shadow-sm"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold
                             bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white hover:opacity-90 transition shadow-sm"
                >
                  Sign In
                </Link>
              )}
              </div>
          </div>
        </div>
      </div>

      {!isAdminLike && mobileOpen && (
        <div className="md:hidden bg-[#fff7ef]/95 backdrop-blur border-b border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="rounded-3xl bg-gradient-to-br from-white/90 to-[#fbe7dc] ring-1 ring-black/5 p-2 shadow-sm space-y-2">
              {NAV.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMobileOpen(false)}
                  prefetch={it.href === "/history-order" ? false : undefined}
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
        </div>
      )}
      </div>
    </header>
  );
}
