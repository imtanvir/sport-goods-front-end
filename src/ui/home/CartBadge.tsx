import { IoCartSharp } from "react-icons/io5";
import { useAppSelector } from "../../hooks/hook";
import { allCartData } from "../../redux/features/cart/cartSlice";

const CartBadge = () => {
  const cartData = useAppSelector(allCartData);
  return (
    <>
      <div className="relative py-2">
        <div
          className={`top-0 absolute left-2/3 ${
            cartData && cartData?.length === 0 ? "hidden" : ""
          }`}
        >
          <p className="flex  h-3 w-3 items-center justify-center rounded-full bg-[#FB5733] p-[0.60rem] text-xs text-white">
            {cartData && cartData.length !== 0
              ? cartData.length >= 10
                ? `9+`
                : cartData.length
              : null}
          </p>
        </div>
        <IoCartSharp className="z-20 text-[#111111] text-3xl" />
      </div>
    </>
  );
};

export default CartBadge;
