import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl ring-1 ring-black/5 bg-white shadow-md">
      <div className="relative h-[420px] sm:h-[520px] md:h-[600px]">
        <Image
          src="/hero.jpg"
          alt="Kaluna Living"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Overlay: cukup kuat tapi tetap natural */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2d44]/90 via-[#224670]/55 to-[#f08c6a]/25" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-5 sm:px-8 md:px-10 pb-10 md:pb-12">
            <div className="max-w-3xl">
              {/* Brand label */}
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.35em] bg-white/15 !text-white ring-1 ring-white/25 backdrop-blur">
                KALUNA LIVING
              </span>

              {/* Headline */}
              <h1
                className="mt-5 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight !text-white leading-[1.08]"
                style={{ textShadow: "0 10px 40px rgba(0,0,0,0.65)" }}
              >
                Home living
                <br className="hidden sm:block" />
                that brings you joy.
              </h1>

              {/* ✅ Subheadline: paksa putih + rapi + pasti kebaca */}
              <div className="mt-6 max-w-xl">
                <p
                  className="inline-block rounded-2xl px-4 py-3 text-sm sm:text-base font-semibold
                             bg-[#1b2d44]/60 ring-1 ring-white/15 backdrop-blur
                             !text-white leading-relaxed"
                  style={{ textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}
                >
                  Kaluna Living is a home decor brand based in Surabaya, which combine the concept of simplicity with a twist of joyful color.
                  Our current products are ceramic & wooden tableware, which we believe those are the main things which could bring joy to your home. Every products we designed and handcrafted wholeheartedly by local artisan
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/produk"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                             bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] !text-white hover:opacity-90 transition shadow-lg"
                >
                  Belanja Produk
                </Link>

                <Link
                  href="/custom-order"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                             bg-white/20 !text-white ring-1 ring-white/40 hover:bg-white/30 transition"
                >
                  Ajukan Custom Order
                </Link>
              </div>

              {/* Badges */}
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full px-3 py-1 text-xs font-semibold bg-[#1b2d44]/65 !text-white ring-1 ring-white/20">
                  Secure Payment (Midtrans)
                </span>
                <span className="rounded-full px-3 py-1 text-xs font-semibold bg-[#1b2d44]/65 !text-white ring-1 ring-white/20">
                  Handcrafted by artisans
                </span>
                <span className="rounded-full px-3 py-1 text-xs font-semibold bg-[#1b2d44]/65 !text-white ring-1 ring-white/20">
                  Custom request
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
