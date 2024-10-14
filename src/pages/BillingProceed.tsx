import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { setDetails } from "../redux/features/BillingDetails/BillingDetailsSlice";
import { wereItFromCheckout } from "../redux/features/checkFromcartSlice/checkFromcartSlice";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const BillingProceed = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const checkNavigate = useAppSelector(wereItFromCheckout);

  const navigate = useNavigate();
  const handleCloseMain = () => {
    setIsMainOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (checkNavigate === false) {
      setIsMainOpen(true);
      return;
    }
  }, [checkNavigate]);

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, address } = userDetails;
    if (!name || !email || !phone || !address) {
      return;
    }

    dispatch(setDetails({ email, name, address: { city: address }, phone }));

    if (paymentMethod === "stripe") {
      setTimeout(() => {
        navigate("/checkout");
      }, 500);
    } else if (paymentMethod === "cash") {
      setTimeout(() => {
        navigate("/place-success");
      }, 500);
    }
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-8 bg-indigo-100 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">User Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userDetails.name}
                  placeholder="type your name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="type your email"
                  type="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="type your phone number"
                  type="tel"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={userDetails.address}
                  placeholder="type your address"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash on Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" disabled />
                <Label htmlFor="stripe" className="text-muted-foreground">
                  Stripe
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>
      </div>
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
    </section>
  );
};

export default BillingProceed;
