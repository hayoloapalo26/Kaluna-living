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
<<<<<<< HEAD
    <footer className="bg-gray-950">
      <div className="max-w-screen-xl mx-auto w-full px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-7">
          {/* Logo + Description */}
          <div>
          <Image
                src="/logo.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[128px] h-auto"
                priority
              />
            <p className="text-gray-400">
              Home living goods that bring you joy.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/kalunaliving"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiInstagramLine />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/kalunalivinggoods"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiFacebookCircleLine />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiTiktokLine />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6281234546572"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiWhatsappLine />
=======
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
>>>>>>> master
              </a>
            </div>
          </div>

<<<<<<< HEAD
          {/* LINKS */}
          <div>
            <div className="flex gap-20">
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">
                  Links
                </h4>
                <ul className="space-y-5 text-gray-400">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      produks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* LEGAL */}
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">
                  Legal
                </h4>
                <ul className="space-y-5 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Legal
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Term &amp; Condition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Payment Method
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="mb-8 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>

            <form className="mt-5">
              <div className="mb-5">
                <input
                  type="text"
                  name="email"
                  className="w-full p-3 rounded-sm bg-white text-gray-800"
                  placeholder="johndoe@example.com"
                />
              </div>

              <button
                className="bg-[#A7744B] p-3 font-bold text-white w-full text-center rounded-sm 
                                 hover:bg-[#8F643E] transition"
              >
                Subscribe
              </button>
            </form>
=======
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
>>>>>>> master
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-700 py-8 text-center text-base text-gray-500">
        &copy; Copyright 2025 | Maulana-fti-unmer
=======
      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 text-center text-sm text-white/65">
          &copy; Copyright 2025 | Maulana-fti-unmer
        </div>
>>>>>>> master
      </div>
    </footer>
  );
};

export default Footer;
