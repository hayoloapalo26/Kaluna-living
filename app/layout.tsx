import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import WhatsAppPopup from "@/components/whatsapp-popup";
import "./globals.css";

<<<<<<< HEAD
const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
=======
const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
>>>>>>> master
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

  return (
<<<<<<< HEAD
    <html lang="en">
      <body className={`${josefinSans.className} antialiased`}>
        <SessionProvider session={session}>
          <Navbar />
          
          <main className="min-h-screen bg-gray-50">
            {children}
=======
    <html lang="en" className={josefin.variable}>
      <body className="min-h-screen text-kaluna-ink antialiased">
        <SessionProvider session={session}>
          <Navbar />

          {/* ✅ Global offset untuk fixed navbar */}
          <main className="pt-16">
            {/* ✅ Lebih lebar + ada panel supaya sisi kiri-kanan tidak kosong */}
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-10">
              <div className="rounded-3xl bg-white/55 ring-1 ring-black/5 shadow-sm backdrop-blur">
                <div className="px-4 md:px-8 py-8">{children}</div>
              </div>
            </div>
>>>>>>> master
          </main>

          <Footer />
          <WhatsAppPopup />
        </SessionProvider>
      </body>
    </html>
  );
}
