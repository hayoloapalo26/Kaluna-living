import Image from "next/image";
import { getprodukDetailById, getReservationByprodukId } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import ReserveForm from "@/components/reserve-form";

const produkDetail = async ({ produkId }: { produkId: string }) => {
  const [produk, disabledDate] = await Promise.all([
    getprodukDetailById(produkId),
    getReservationByprodukId(produkId),
  ]);
  if (!produk) return notFound();

  return (
    <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
      {/* Left Grid */}
      <div className="md:col-span-8">
        <Image
          src={produk.image}
          alt={produk.name}
          width={770}
          height={430}
          priority
          className="w-full rounded-3xl mb-8"
        />
        <h1 className="text-5xl font-semibold text-[#111827] mb-8">
          {produk.name}
        </h1>
        <p>{produk.description}</p>
        <h5 className="text-lg font-bold py-1 mt-1">Amenities:</h5>
        <div className="grid md:grid-cols-3">
          {produk.amenities.map(
            (item: { id: string; amenities: { name: string } }) => (
            <div className="flex gap-1 py-1" key={item.id}>
              <IoCheckmark className="size-5" />
              <span>{item.amenities.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right Grid */}
      <div className="md:col-span-4">
        <div className="px-4 py-6 bg-white/90 rounded-3xl ring-1 ring-white/70 shadow-md backdrop-blur">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <IoPeopleOutline className="size-4" />
              <span>
                {produk.capacity} {produk.capacity === 1 ? "person" : "people"}
              </span>
            </div>
            <h1 className="flex items-center">
              <span className="text-2xl font-semibold text-[#224670]">
                {formatCurrency(produk.price)}
              </span>
              <span className="text-[#111827]/45 text-sm">/Night</span>
            </h1>
          </div>
          {/* <BookForm
            post={post}
            order={order}
            StartDate={StartDate}
            EndDate={EndDate}
            rate={rate.idr}
          /> */}
          <ReserveForm produk={produk} disabledDate={disabledDate} />
        </div>
      </div>
    </div>
  );
};

export default produkDetail;
