import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
<<<<<<< HEAD
    <div className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Background Image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize">
          Welcome To Kaluna Living
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Get Special offer just for you today.
        </p>

        {/* BUTTONS - WARM BROWN */}
        <div className="flex gap-5">
          {/* ORDER NOW */}
          <Link
            href="#"
            className="bg-[#A7744B] text-white py-2.5 px-6 md:px-10 text-lg font-semibold 
                     rounded-md shadow-md transition-all duration-300 
                     hover:bg-[#8F643E] hover:scale-105 hover:shadow-xl"
          >
            Order Now
          </Link>

          {/* CONTACT US */}
          <Link
            href="/contact"
            className="border border-[#A7744B] text-[#A7744B] py-2.5 px-6 md:px-10 
                     text-lg font-semibold rounded-md transition-all duration-300 
                     hover:bg-[#A7744B] hover:text-white hover:scale-105 hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
=======
    <section className="relative overflow-hidden rounded-3xl ring-1 ring-black/5 bg-white shadow-md">
      <div className="relative h-[520px] sm:h-[600px]">
        <Image
          src="/hero.jpg"
          alt="Kaluna Living"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Overlay: cukup kuat tapi tetap natural */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 sm:px-10 pb-12">
            <div className="max-w-3xl">
              {/* Brand label */}
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.35em] bg-white/15 !text-white ring-1 ring-white/20">
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
                             bg-black/55 ring-1 ring-white/15 backdrop-blur
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
                             bg-[#224670] !text-white hover:opacity-90 transition shadow-lg"
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
                <span className="rounded-full px-3 py-1 text-xs font-semibold bg-black/55 !text-white ring-1 ring-white/20">
                  Secure Payment (Midtrans)
                </span>
                <span className="rounded-full px-3 py-1 text-xs font-semibold bg-black/55 !text-white ring-1 ring-white/20">
                  Handcrafted by artisans
                </span>
                <span className="rounded-full px-3 py-1 text-xs font-semibold bg-black/55 !text-white ring-1 ring-white/20">
                  Custom request
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
>>>>>>> master
  );
};

export default Hero;
