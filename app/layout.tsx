import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import WhatsAppPopup from "@/components/whatsapp-popup";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kaluna Living",
  description: "Hotel Booking Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const themeScript = `
    (function () {
      try {
        var stored = localStorage.getItem("kaluna-theme");
        var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
        document.documentElement.dataset.theme = theme;
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" className={josefin.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen text-kaluna-ink antialiased">
        <SessionProvider session={session}>
          <Navbar />

          {/* ✅ Global offset untuk fixed navbar */}
          <main className="pt-16">
            {/* ✅ Mobile: full-bleed, Desktop: panel */}
            <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-6 md:py-10">
              <div className="rounded-none md:rounded-[30px] bg-transparent md:bg-[linear-gradient(120deg,rgba(34,70,112,0.18),rgba(255,255,255,0.65),rgba(240,140,106,0.18))] p-0 md:p-[1.5px]">
                <div className="rounded-none md:rounded-[28px] bg-transparent md:bg-white/75 ring-0 md:ring-1 ring-white/50 shadow-none md:shadow-md md:backdrop-blur">
                  <div className="px-0 md:px-8 py-4 md:py-8">{children}</div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
          <WhatsAppPopup />
        </SessionProvider>
      </body>
    </html>
  );
}
