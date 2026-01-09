import Link from "next/link";
import { deleteproduk } from "@/lib/actions";
import { IoPencil, IoTrashOutline } from "react-icons/io5";

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/produk/edit/${id}`}
      className="rounded-sm p-1 hover:bg-gray-200"
    >
      <IoPencil className="size-5" />
    </Link>
  );
};

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
  const deleteProdukWithId = async (_formData: FormData) => {
    await deleteproduk(id, image);
  };
  return (
    <form action={deleteProdukWithId}>
      <button
        type="submit"
        className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer"
      >
        <IoTrashOutline className="size-5" />
      </button>
    </form>
  );
};
