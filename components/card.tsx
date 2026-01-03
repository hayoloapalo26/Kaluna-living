import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import type { Produk } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

type Props = {
  produk: Produk;
};

const Card = ({ produk }: Props) => {
  return (
    <div className="bg-white/90 shadow-lg rounded-2xl ring-1 ring-white/60 transition duration-100 hover:shadow-xl">
      {/* image wrapper */}
      <div className="h-[260px] w-auto rounded-t-2xl relative overflow-hidden">
        <Image
          src={produk.image}
          width={384}
          height={256}
          alt={produk.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-8">
        <h4 className="text-2xl font-medium">
          <Link
            href={`/produk/${produk.id}`}
            className="hover:text-[#1a1c24] transition duration-150"
          >
            {produk.name}
          </Link>
        </h4>

        <h4 className="text-xl mb-7">
          <span className="font-semibold text-[#224670]">
            {formatCurrency(produk.price)}
          </span>
          <span className="text-[#1a1c24]/45 text-sm">/Night</span>
        </h4>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IoPeopleOutline />
            <span>
              {produk.capacity} {produk.capacity === 1 ? "person" : "people"}
            </span>
          </div>

          <Link
            href={`/produk/${produk.id}`}
            className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white rounded-2xl
                       bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a]
                       hover:opacity-90 transition duration-150"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
