import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  useMakePaymentMutation,
  useUpdateProductQuantityMutation,
} from "../redux/api/baseApi";
import { billingDetails } from "../redux/features/BillingDetails/BillingDetailsSlice";
import {
  allCartData,
  setCartData,
  TCart,
} from "../redux/features/cart/cartSlice";
import { wereItFromCheckout } from "../redux/features/checkFromcartSlice/checkFromcartSlice";

const CheckoutForm = ({ cartTotal }: { cartTotal: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const [makePayment] = useMakePaymentMutation();
  const [updateProductQuantity] = useUpdateProductQuantityMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const paymentRef = useRef(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [chargedAmount, setChargedAmount] = useState(0);
  const handleClose = () => {
    setIsDialogOpen(false);
    navigate("/");
  };
  const handleCloseMain = () => {
    setIsMainOpen(false);
    navigate("/");
  };
  // Get all cart data from Redux store
  const cartData = useAppSelector(allCartData);
  const billDetails = useAppSelector(billingDetails);
  const isFormCart = useAppSelector(wereItFromCheckout);
  useEffect(() => {
    if (isFormCart === false) {
      setIsMainOpen(true);
      return;
    }

    const advancePayment = async () => {
      const response = await makePayment({
        amount: cartTotal.toFixed(2),
      });
      console.log({ response });
      setClientSecret(response.data.data.clientSecret);
    };

    if (paymentRef.current === 0 && cartTotal !== 0) {
      paymentRef.current = 1;
      advancePayment();
    }
  }, [cartTotal, makePayment, navigate]);

  const handleErr = () => {
    if (err) {
      setErr("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Payment processing...");

    setProcessing(true);
    if (!stripe || !elements) {
      toast.error("Stripe is not properly initialized.", { id: toastId });
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card element not found.", { id: toastId });
      setProcessing(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setProcessing(false);
      setErr(error.message ?? "An unexpected error occurred.");
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      return;
    } else {
      setErr("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: billDetails ?? {},
        },
      });

    if (confirmError) {
      setProcessing(false);
      toast.error(confirmError.message, { id: toastId, duration: 2000 });
    } else {
      if (paymentIntent && paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        toast.success("Your payment was successful!", {
          id: toastId,
          duration: 2000,
          className: "bg-green-500 text-white border-green-400",
        });
        setChargedAmount(parseFloat(cartTotal.toFixed(2)));
        // Update product quantities based on the cart data
        const updatePromises = cartData.map((item: TCart) =>
          updateProductQuantity({
            id: item.product._id,
            stock_quantity: item.product.stock_quantity - item.quantity,
          })
        );

        await Promise.all(updatePromises);
        dispatch(setCartData({ data: [] }));

        setIsDialogOpen(true);
        elements.getElement(CardElement)?.clear();
      }
    }
    setProcessing(false);
  };

  const options = {
    style: {
      base: {
        fontSize: "16px",
        fontFamily: "'Poppins', sans-serif",
        color: "#000000",
        "::placeholder": {
          color: "#a0aec0",
          fontStyle: "italic",
        },
        iconColor: "#4a5568",
        letterSpacing: "0.025em",
        padding: "12px 10px",
      },
      invalid: {
        color: "#e53e3e",
        iconColor: "#e53e3e",
      },
      complete: {
        color: "#38a169",
        iconColor: "#38a169",
      },
    },
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="px-5 md:py-10 flex flex-col gap-2 md:w-1/2 w-full mx-auto bg-white/50 dark:bg-gray-800/20 backdrop-blur-md border border-white/100 dark:border-gray-700/30 shadow-lg rounded-lg p-6"
      >
        <CardElement
          onChange={handleErr}
          className="dark:bg-gray-800/20 text-slate-900 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-lg rounded-lg p-6"
          options={options}
        />
        <p className="text-red-500">{err}</p>
        <p className="font-semibold bebas-neue-regular dark:text-slate-300 md:text-lg text-base">
          Your card will be charged{" "}
          <span className="text-indigo-500">
            ${cartTotal.toFixed(2) ?? chargedAmount}
          </span>
        </p>
        <Button
          type="submit"
          disabled={
            err.trim().length !== 0 ||
            cartTotal === 0 ||
            !stripe ||
            !clientSecret ||
            processing ||
            transactionId.length > 1
          }
          className={`button ${
            !stripe || !clientSecret || err
              ? "bg-slate-500 cursor-not-allowed hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-700"
              : transactionId
              ? "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 focus:ring-green-300"
              : "bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 focus:ring-indigo-300"
          } text-white focus:ring-4 mt-2 font-medium rounded-lg text-sm px-5 py-2 text-center`}
        >
          {processing && !err && (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          )}
          {!clientSecret ? (
            <>Wait...</>
          ) : !transactionId && !processing ? (
            <>Pay</>
          ) : (
            ""
          )}
          {!processing && transactionId && <>Payment Successful</>}
        </Button>
        <p className="text-center">
          Powered by <span className="text-indigo-500 font-thin">Stripe</span>
        </p>
      </form>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="flex flex-col  bg-indigo-600 border-indigo-600 ">
          <div className="flex justify-end">
            <AlertDialogCancel
              onClick={handleClose}
              className="w-10 h-10 p-0 flex"
            >
              <IoMdClose className="text-xl" />
            </AlertDialogCancel>
          </div>
          <AlertDialogTitle>
            <span className="text-2xl p-bold text-white">
              Order Paid successfully!
            </span>
            <span className="text-base block poppins-regular pb-4 text-slate-300">
              The order has been successfully paid. Make more order and enjoy.
            </span>
            <div>
              <span className="text-yellow-400">Charged Amount :</span> $
              {chargedAmount}
            </div>
            <p className="text-white pt-3">
              {transactionId && (
                <span>
                  Transaction id:{" "}
                  <span className="text-slate-300">{transactionId}</span>
                </span>
              )}
            </p>
          </AlertDialogTitle>

          <div className="flex justify-between"></div>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        <AlertDialog open={isMainOpen} onOpenChange={setIsMainOpen}>
          <AlertDialogContent className="flex flex-col  bg-yellow-500 border-yellow-500">
            <div className="flex justify-end">
              <AlertDialogCancel
                onClick={handleCloseMain}
                className="w-10 h-10 p-0 flex"
              >
                <IoMdClose className="text-xl" />
              </AlertDialogCancel>
            </div>
            <AlertDialogTitle>
              <span className="text-2xl font-bold text-slate-950">
                Bad Request!
              </span>
              <span className="text-base block poppins-regular py-4 text-slate-600">
                Don't navigate payment page that way. Please try from your Cart!
              </span>
            </AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default CheckoutForm;
