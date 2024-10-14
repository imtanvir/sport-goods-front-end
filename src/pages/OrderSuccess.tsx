import { CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { useUpdateProductQuantityMutation } from "../redux/api/baseApi";
import {
  allCartData,
  setCartData,
  TCart,
} from "../redux/features/cart/cartSlice";

const OrderSuccess = () => {
  const cartData = useAppSelector(allCartData);

  const dispatch = useAppDispatch();
  const [updateProductQuantity] = useUpdateProductQuantityMutation();
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalCost = subtotal * 1.15;
  const [chargedAmount, setChargedAmount] = useState(0);
  const paymentOccursRef = useRef(0);

  useEffect(() => {
    const runPayment = async () => {
      setChargedAmount(parseFloat(totalCost.toFixed(2)));
      const updatePromises = cartData.map((item: TCart) =>
        updateProductQuantity({
          id: item.product._id,
          stock_quantity: item.product.stock_quantity - item.quantity,
        })
      );

      await Promise.all(updatePromises);
      dispatch(setCartData({ data: [] }));
    };

    if (paymentOccursRef.current === 0) {
      paymentOccursRef.current = 1;
      runPayment();
    }
  }, [cartData]);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Success!</h1>
            <p className="mt-2 text-lg text-gray-600">
              Your order has been successfully placed.
            </p>
            <p className="text-blue-500">
              You will be Charge:
              <span className=" font-extrabold text-base text-slate-900">
                ${chargedAmount}
              </span>{" "}
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link to={"/"}>
              <Button className="inline-flex items-center justify-center rounded-md bg-green-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
                Go To Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
