// app/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import Main from "@/components/main";
import HomeSkeleton from "@/components/skeletons/home-skeleton";

<<<<<<< HEAD
const accent = "bg-[#A7744B]";
const accentHover = "hover:bg-[#8f613e]";
const accentText = "text-[#A7744B]";
const accentBorder = "border-[#A7744B]";
const accentBg50 = "hover:bg-[#A7744B]/5";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <Hero />

      {/* ABOUT / BRAND EXPLANATION */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-md shadow p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Tentang Kaluna
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-3">
              Handcrafted Home Living Goods &amp; Custom Tableware
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Kami menghadirkan koleksi keramik dan wooden tableware yang dibuat
              manual oleh artisan lokal. Website ini menyatukan identitas brand,
              proses custom, hingga pembayaran digital.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/about"
                className={`px-6 py-3 text-white rounded-sm transition ${accent} ${accentHover}`}
              >
                Pelajari Kami
              </Link>
              <Link
                href="/order"
                className={`px-6 py-3 rounded-sm transition border ${accentBorder} ${accentText} ${accentBg50}`}
              >
                Ajukan Custom Order
=======
export default function Home() {
  return (
    <div className="bg-[#FAF7F2]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10 space-y-14">
        {/* HERO */}
        <Hero />

        {/* ABOUT */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 ring-1 ring-black/5 shadow-md">
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
                           bg-[#224670] text-white hover:opacity-90 transition shadow-md"
              >
                View Catalog
              </Link>
              <Link
                href="/custom-order"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                           bg-white text-[#224670] ring-1 ring-black/10 hover:bg-black/[0.03] transition"
              >
                Submit Custom Order
>>>>>>> master
              </Link>
            </div>
          </div>

<<<<<<< HEAD
          <div className="bg-white rounded-md shadow p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Kenapa beralih ke Kaluna?
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Identitas brand penuh &amp; katalog eksklusif.</li>
              <li>✔ Payment gateway aman dan tercatat digital.</li>
              <li>✔ Layanan custom produk dengan konsultasi artisan.</li>
              <li>✔ Insight penjualan untuk Admin dan Owner.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCT / produkS SECTION */}
      <section className="py-16 border-t border-gray-200">
        <div className="text-center max-w-screen-md mx-auto px-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Katalog Unggulan
          </p>
          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            Produk Kaluna Living
          </h2>
          <p className="py-3 text-gray-600">
            Temukan koleksi keramik siap pakai atau kombinasikan dengan layanan
            custom kami.
          </p>
        </div>

        <Suspense fallback={<HomeSkeleton />}>
          <Main />
        </Suspense>

        <div className="text-center mt-8">
          <Link
            href="/product"
            className="px-8 py-3 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* CUSTOM ORDER SECTION */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Custom Order
            </p>
            <h2 className="text-3xl font-semibold text-gray-900 mt-3">
              Punya desain keramik sendiri?
            </h2>
            <p className="mt-4 text-gray-600">
              Unggah inspirasi warna, motif, atau bentuk yang kamu inginkan.
              Tim artisan kami siap berdiskusi untuk menghasilkan tableware
              unik hanya untukmu.
            </p>
            <Link
              href="/order"
              className={`inline-block mt-6 px-6 py-3 text-white rounded-sm transition ${accent} ${accentHover}`}
            >
              Ajukan Desain Sekarang
            </Link>
          </div>

          <div className="bg-white rounded-md shadow p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alur Custom Produk
            </h3>
            <ol className="space-y-3 text-gray-600 list-decimal list-inside">
              <li>Isi form custom &amp; unggah referensi desain.</li>
              <li>Admin meninjau, memberi estimasi harga dan timeline.</li>
              <li>
                Owner mengonfirmasi produksi, pembayaran tercatat digital.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* SIGNIN / CTA SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="bg-gray-900 rounded-md p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Siap mengelola purchase order &amp; custom product secara
                profesional?
              </h2>
              <p className="text-gray-300 mt-3">
                Login dengan akun Google untuk mengakses katalog, custom order,
                serta riwayat transaksi Anda.
              </p>
            </div>
            <Link
              href="/signin"
              className={`px-8 py-3 text-white rounded-sm transition ${accent} ${accentHover}`}
            >
              Masuk / Daftar
            </Link>
          </div>
        </div>
      </section>
=======
          <div className="rounded-2xl bg-white p-7 ring-1 ring-black/5 shadow-md">
            <h3 className="text-lg font-semibold tracking-tight text-[#111827]">
              Why Kaluna??
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#111827]/70">
              <li>•  Clean brand identity & exclusive catalog.</li>
              <li>• Custom product services with artisan consultation.</li>
              <li>• Transparent order history & payment status.</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-[#EFE7DD] p-4 ring-1 ring-black/5">
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
                         bg-white text-[#224670] ring-1 ring-black/10 hover:bg-black/[0.03] transition"
            >
              View All Product
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-[#224670] text-white p-7 md:p-10 shadow-md ring-1 ring-black/10">
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
>>>>>>> master
    </div>
  );
}
