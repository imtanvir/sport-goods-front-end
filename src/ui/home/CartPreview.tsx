import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  allCartData,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/features/cart/cartSlice";
import { setIsFromCartProceed } from "../../redux/features/checkFromcartSlice/checkFromcartSlice";

const CartPreview = ({
  toggleCart,
  isCartOpen,
}: {
  toggleCart: () => void;
  isCartOpen: boolean;
}) => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(allCartData);
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  // 15% VAT
  const totalCost = subtotal * 1.15;
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 translate-y-24 right-0 z-50 rounded-bl-md w-full max-w-md bg-background p-6 shadow-lg transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-4 relative">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <IoMdClose className="text-xl" />
        </Button>
      </div>
      <div className="space-y-4 overflow-auto h-[55vh]">
        {cartData.map((item) => (
          <div key={item.product._id}>
            <div className="flex items-center gap-4">
              <img
                src={
                  item?.product?.image[0]?.url ??
                  "/src/assets/product-placeholder.png"
                }
                alt={item.product.name}
                width={64}
                height={64}
                className="rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(decrementQuantity({ id: item.product._id }))
                    }
                  >
                    -
                  </Button>
                  <span>Qty: {item.quantity}</span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(incrementQuantity({ id: item.product._id }))
                    }
                  >
                    +
                  </Button>
                </div>
                <div className="pt-3 flex items-center gap-4">
                  <span>
                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      dispatch(removeItem({ id: item.product._id }))
                    }
                    className="bg-red-600 hover:bg-red-500 hover:text-white text-white"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="mt-2" />
          </div>
        ))}
        {cartData && cartData?.length === 0 && (
          <div className=" absolute left-1/2 -translate-x-1/2 top-1/3">
            <h3 className="text-center font-semibold text-xl">
              Your cart is empty!
            </h3>
          </div>
        )}
      </div>
      <div className="mt-6 border-t pt-4 flex items-center justify-between">
        <span className="text-slate-900 font-semibold">
          Total (including 15% VAT):
        </span>
        <span className="font-medium">${totalCost.toFixed(2)}</span>
      </div>
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full bg-slate-950 hover:bg-slate-800 hover:text-white text-white"
          disabled={
            cartData.some((item) => item.product.stock_quantity === 0) ||
            cartData.length === 0
          }
          onClick={() => {
            navigate(`/billing`);
            toggleCart();
            dispatch(setIsFromCartProceed(true));
          }}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPreview;
