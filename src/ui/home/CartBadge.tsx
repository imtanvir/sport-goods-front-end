import { IoCartSharp } from "react-icons/io5";

const CartBadge = () => {
  return (
    <>
      <div className="relative py-2">
        <div className="top-0 absolute left-2/3">
          <p className="flex h-2 w-2 items-center justify-center rounded-full bg-[#FB5733] p-[0.60rem] text-xs text-white">
            3
          </p>
        </div>
        <IoCartSharp className="z-20 text-[#111111] text-3xl" />
      </div>
    </>
  );
};

export default CartBadge;
