import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../hooks/hook";
import { allCartData } from "../redux/features/cart/cartSlice";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const cartData = useAppSelector(allCartData);
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalCost = subtotal * 1.15;

  return (
    <>
      <section className=" dark:bg-gradient-to-b dark:from-background dark:to-muted bg-slate-50 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="container md:py-32 py-16 mx-auto">
          <h1 className="md:text-5xl text-3xl font-mono text-center py-5">
            Complete your payment!
          </h1>

          <div className="flex md:flex-row flex-col justify-center items-center gap-5">
            <Elements stripe={stripePromise}>
              <CheckoutForm cartTotal={totalCost} />
            </Elements>
          </div>
        </div>
        <p className="text-center text-yellow-600 dark:text-yellow-600 pb-5 md:font-semibold font-medium ">
          Note: Please do not reload the page while payment is processing,
          otherwise it could be fail.
        </p>
      </section>
    </>
  );
};

export default CheckoutPage;
