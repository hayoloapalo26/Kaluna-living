import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiCheckCircle } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Payment Successful",
};

const PaymentSuccess = async ({
  searchParams,
}: {
  searchParams: Promise<{ transaction_status: string }>;
}) => {
  const paymentStatus = (await searchParams).transaction_status;
  if (paymentStatus === "pending") redirect("/payment/pending");
  if (paymentStatus === "failure") redirect("/payment/failure");

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/25 blur-3xl" />
        <div className="absolute top-12 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/22 blur-3xl" />
      </div>
      <div className="relative w-full max-w-lg rounded-3xl bg-white/90 p-8 shadow-md ring-1 ring-white/70 backdrop-blur text-center">
        <HiCheckCircle className="text-emerald-600 w-16 h-16 mx-auto my-4" />
        <h3 className="text-lg sm:text-2xl text-[#111827] font-semibold">
          Payment Done!
        </h3>
        <p className="text-[#111827]/70 my-2">
          Terima kasih, pembayaran kamu berhasil.
        </p>
        <p className="text-[#111827]/60">Have a great day!</p>
        <div className="pt-8">
          <Link
            href="/history-order"
            className="inline-flex w-full sm:w-auto justify-center rounded-2xl px-6 py-3
                       bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a]
                       text-white font-semibold hover:opacity-90 transition"
          >
            GO TO ORDER HISTORY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
