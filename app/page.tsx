// app/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import Main from "@/components/main";
import HomeSkeleton from "@/components/skeletons/home-skeleton";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/30 blur-3xl" />
        <div className="absolute top-8 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/25 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 py-10 space-y-14">
        {/* HERO */}
        <Hero />

        {/* ABOUT */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/85 p-7 ring-1 ring-white/60 shadow-md backdrop-blur">
            <p className="text-xs uppercase tracking-[0.32em] text-black/45">
              About Kaluna
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-[#111827]">
              Handcrafted home living goods & custom tableware
            </h2>
            <p className="mt-4 text-sm text-[#111827]/70 leading-relaxed">
              We present a collection of ceramic and wooden tableware
              handcrafted by local artisans. For special needs
              you can also submit a custom order with design references.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/produk"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                           bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a]
                           text-white hover:opacity-90 transition shadow-md"
              >
                View Catalog
              </Link>
              <Link
                href="/custom-order"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                           bg-white/90 text-[#224670] ring-1 ring-black/10 hover:bg-white transition"
              >
                Submit Custom Order
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-white/90 to-[#fbe7dc] p-7 ring-1 ring-white/60 shadow-md backdrop-blur">
            <h3 className="text-lg font-semibold tracking-tight text-[#111827]">
              Why Kaluna??
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#111827]/70">
              <li>•  Clean brand identity & exclusive catalog.</li>
              <li>• Custom product services with artisan consultation.</li>
              <li>• Transparent order history & payment status.</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-white/80 p-4 ring-1 ring-white/70">
              <p className="text-sm font-semibold text-[#111827]">
                Short story
              </p>
              <p className="mt-1 text-sm text-[#111827]/70 leading-relaxed">
                Kaluna was created to bring warm “home aesthethic”
                from the dining table to the coffee corner.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="pt-2">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.32em] text-black/45">
              Featured Catalog
            </p>
            <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-[#111827]">
              Kaluna Living Products
            </h2>
            <p className="mt-3 text-sm text-[#111827]/70">
              Discover ready-to-use ceramic collections or combine them with our custom services.
            </p>
          </div>

          <Suspense fallback={<HomeSkeleton />}>
            <Main />
          </Suspense>

          <div className="text-center mt-8">
            <Link
              href="/produk"
              className="inline-flex items-center justify-center rounded-2xl px-7 py-3 text-sm font-semibold
                         bg-white/90 text-[#224670] ring-1 ring-black/10 hover:bg-white transition"
            >
              View All Product
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] text-white p-7 md:p-10 shadow-md ring-1 ring-black/10">
          <div className="grid gap-6 md:grid-cols-[1fr,auto] items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Ready to shop or request a custom order?
              </h2>
              <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-2xl">
                Log in to access the catalog, custom orders, and transaction history.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-2xl px-7 py-3 text-sm font-semibold
                           bg-white text-[#224670] hover:opacity-90 transition shadow-md"
              >
                Log In / Sign Up
              </Link>
              <Link
                href="/custom-order"
                className="inline-flex items-center justify-center rounded-2xl px-7 py-3 text-sm font-semibold
                           bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15 transition"
              >
                Custom Order
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
