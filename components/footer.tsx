import Image from "next/image";
import Link from "next/link";
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTiktokLine,
  RiWhatsappLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#224670] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Kaluna Living"
                width={128}
                height={32}
                className="h-auto w-[120px] md:w-[132px]"
                priority
              />
            </Link>

            <p className="mt-4 text-white/75 leading-relaxed">
              Home living goods that bring you joy—minimal, warm, and crafted
              with care.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/kalunaliving"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10
                           hover:bg-white/15 transition"
                aria-label="Instagram"
              >
                <RiInstagramLine className="text-xl text-white" />
              </a>

              <a
                href="https://facebook.com/kalunalivinggoods"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10
                           hover:bg-white/15 transition"
                aria-label="Facebook"
              >
                <RiFacebookCircleLine className="text-xl text-white" />
              </a>

              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10
                           hover:bg-white/15 transition"
                aria-label="TikTok"
              >
                <RiTiktokLine className="text-xl text-white" />
              </a>

              <a
                href="https://wa.me/6281234546572"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10
                           hover:bg-white/15 transition"
                aria-label="WhatsApp"
              >
                <RiWhatsappLine className="text-xl text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:gap-10">
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">
                Links
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                <li>
                  <Link href="#" className="hover:text-[#DEA9B6] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#DEA9B6] transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#DEA9B6] transition">
                    Produk
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#DEA9B6] transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">
                Legal
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                <li>
                  <a href="#" className="hover:text-[#DEA9B6] transition">
                    Legal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#DEA9B6] transition">
                    Term &amp; Condition
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#DEA9B6] transition">
                    Payment Method
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#DEA9B6] transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">
              Newsletter
            </h4>
            <p className="mt-5 text-sm text-white/75 leading-relaxed">
              Dapatkan update koleksi baru, promo, dan cerita artisan Kaluna.
            </p>

            <form className="mt-6">
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white
                             placeholder:text-white/50 ring-1 ring-white/15
                             focus:outline-none focus:ring-2 focus:ring-[#DEA9B6]/70"
                  placeholder="johndoe@example.com"
                />

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold
                             bg-white text-[#224670] hover:opacity-90 transition shadow-md"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <p className="mt-4 text-xs text-white/55">
              Dengan subscribe, kamu setuju menerima email dari Kaluna Living.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 text-center text-sm text-white/65">
          &copy; Copyright 2025 | Maulana-fti-unmer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
