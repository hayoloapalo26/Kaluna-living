import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getReservationById } from "@/lib/data";
import { differenceInCalendarDays } from "date-fns";
import { PaymentButton } from "@/components/payment-button";

const CheckoutDetail = async ({ reservationId }: { reservationId: string }) => {
  const reservation = await getReservationById(reservationId);
  // console.log(reservation);
  if (!reservation || !reservation.payment)
    return <h1>No Reservation Found</h1>;

  const duration = differenceInCalendarDays(
    reservation.endDate,
    reservation.starDate
  );

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="order-2">
        <div className="flex flex-col mb-3 items-start bg-white/90 ring-1 ring-white/70 rounded-3xl shadow-md md:flex-row md:w-full overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={reservation.produk.image}
              width={500}
              height={300}
              className="object-cover w-full aspect-video md:rounded-none"
              alt="image"
            />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal w-full">
            <h5 className="mb-1 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111827]">
              {reservation.produk.name}
            </h5>
            <div className="flex items-center gap-1 font-2xl text-[#111827]/70">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl">
                  {formatCurrency(reservation.produk.price)}
                </span>
                <span>/ night</span>
              </div>
            </div>
          </div>
        </div>
        {/* Payment Button */}
        <PaymentButton reservation={reservation} />
      </div>
      <div className="ring-1 ring-white/70 px-3 py-5 bg-white/90 rounded-3xl shadow-md backdrop-blur">
        <table className="w-full">
          <tbody>
            <tr className="">
              <td className="py-2">Reservation ID</td>
              <td className="py-2 text-right truncate">#{reservation.id}</td>
            </tr>
            <tr className="">
              <td className="py-2">Name</td>
              <td className="py-2 text-right">{reservation.user.name}</td>
            </tr>
            <tr className="">
              <td className="py-2">Email</td>
              <td className="py-2 text-right">{reservation.user.email}</td>
            </tr>
            <tr className="">
              <td className="py-2 truncate">Phone Number</td>
              <td className="py-2 text-right truncate">
                {reservation.user.phone}
              </td>
            </tr>
            <tr className="">
              <td className="py-2">Arrival</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.starDate.toISOString())}
              </td>
            </tr>
            <tr className="">
              <td className="py-2">Departure</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.endDate.toISOString())}
              </td>
            </tr>
            <tr className="">
              <td className="py-2 truncate">Duration</td>
              <td className="py-2 text-right">
                <span>
                  {duration} {duration <= 1 ? "Night" : "Nights"}
                </span>
              </td>
            </tr>
            <tr className="">
              <td className="py-2 truncate">Amount in Rupiah</td>
              <td className="py-2 text-right truncate">
                <span>{formatCurrency(reservation.payment.amount)}</span>
              </td>
            </tr>
            <tr className="">
              <td className="py-2">Status</td>
              <td className="py-2 text-right">{reservation.payment.status}</td>
            </tr>
          </tbody>
        </table>
        {/* {order.Payment[0].status === "unpaid" ? (
          <PaymentButton order={order} />
        ) : null} */}
      </div>
    </div>
  );
};

export default CheckoutDetail;
