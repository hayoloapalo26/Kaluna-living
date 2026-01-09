// app/checkout/page.tsx
import { getprodukById } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";




interface CheckoutPageProps {
  searchParams: {
    produkId?: string;
  };
}

// SERVER ACTION – dipanggil saat form di-submit
async function createReservation(formData: FormData) {
  "use server";

  const session = await auth();

  if (!session?.user || !session.user.id) {
    // Kalau belum login, paksa ke halaman signin
    redirect("/signin");
  }

  const userId = session.user.id as string;
  const produkId = formData.get("produkId") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;


  if (!produkId || !startDateStr || !endDateStr) {
    throw new Error("Data reservasi tidak lengkap.");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Format tanggal tidak valid.");
  }

  if (endDate <= startDate) {
    throw new Error("Tanggal check-out harus setelah check-in.");
  }

  // Hitung jumlah malam
  const oneDay = 1000 * 60 * 60 * 24;
  const nights = Math.round(
    (endDate.getTime() - startDate.getTime()) / oneDay
  );

  // Ambil data produk untuk harga
  const produk = await prisma.produk.findUnique({
    where: { id: produkId },
  });

  if (!produk) {
    throw new Error("produk tidak ditemukan.");
  }

  const totalPrice = produk.price * nights;

  // SIMPAN KE DB
  await prisma.reservation.create({
    data: {
      // schema kamu pakai field "starDate" (typo) – ikuti saja
      starDate: startDate,
      endDate: endDate,
      price: totalPrice,
      userId,
      produkId,
    },
  });

  // Setelah berhasil, redirect ke riwayat pesanan
  redirect("/history-order");
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const produkId = searchParams.produkId;

  if (!produkId) {
    redirect("/");
  }

  const produk = await getprodukById(produkId);

  if (!produk) {
    return notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/25 blur-3xl" />
        <div className="absolute top-12 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/22 blur-3xl" />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-4 py-10 md:py-16 grid gap-10 md:grid-cols-[2fr,1.3fr]">
        {/* Ringkasan Produk */}
        <div className="bg-white/90 rounded-3xl shadow-md ring-1 ring-white/70 p-6 md:p-8 flex flex-col gap-4 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Ringkasan Produk
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {produk.name}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {produk.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-600">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Harga
              </p>
              <p className="text-lg font-semibold text-[#f08c6a]">
                Rp {produk.price.toLocaleString("id-ID")}{" "}
                <span className="text-xs text-gray-500">/ malam</span>
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Kapasitas
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {produk.capacity} orang
              </p>
            </div>
          </div>
        </div>

        {/* Form reservasi */}
        <div className="bg-white/90 rounded-3xl shadow-md ring-1 ring-white/70 p-6 md:p-8 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Form Reservasi
          </p>

          <h2 className="mt-3 text-xl font-semibold text-gray-900">
            Lengkapi detail pemesanan
          </h2>

          <form action={createReservation} className="mt-6 space-y-4">
            {/* kirim produkId ke server action */}
            <input type="hidden" name="produkId" value={produk.id} />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tanggal Check-in
                </label>
                <input
                  type="date"
                  name="startDate"
                  className="mt-1 w-full rounded-2xl ring-1 ring-black/10 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tanggal Check-out
                </label>
                <input
                  type="date"
                  name="endDate"
                  className="mt-1 w-full rounded-2xl ring-1 ring-black/10 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jumlah tamu
              </label>
              <input
                type="number"
                name="guestCount"
                min={1}
                defaultValue={1}
                className="mt-1 w-full rounded-2xl ring-1 ring-black/10 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Konfirmasi &amp; Simpan Reservasi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
