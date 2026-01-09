"use client";

import { useTransition } from "react";
import { reservationProps } from "@/types/reservation";

export const PaymentButton = ({
  reservation,
}: {
  reservation: reservationProps;
}) => {
  const [isPending, startTransition] = useTransition();

  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });
        const { token } = await response.json();
        if (token) {
          if (window.snap) {
            window.snap.pay(token);
          } else {
            console.error("Midtrans snap belum tersedia di window.");
          }
        }
        // revalidatePath("/checkout/[id]");
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="px-10 py-4 mt-2 text-center font-semibold text-white w-full rounded-2xl
                 bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a]
                 hover:opacity-90 cursor-pointer"
    >
      {!isPending ? "Process Payment" : "Processing..."}
    </button>
  );
};
