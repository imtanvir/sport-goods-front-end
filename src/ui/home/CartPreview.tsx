/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QpgKmBcKzb5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

const CartPreview = ({
  toggleCart,
  isCartOpen,
}: {
  toggleCart: () => void;
  isCartOpen: boolean;
}) => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Acme Circles T-Shirt",
      image: "/src/assets/placeholder.svg",
      quantity: 2,
      price: 29.99,
    },
    {
      id: 2,
      name: "Autumn Mug",
      image: "/src/assets/placeholder.svg",
      quantity: 1,
      price: 12.99,
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      image: "/src/assets/placeholder.svg",
      quantity: 3,
      price: 16.99,
    },
  ]);

  const totalCost = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background p-6 shadow-lg transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <IoMdClose className="text-xl" />
          </Button>
        </div>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src="/src/assets/placeholder.svg"
                alt={item.name}
                width={64}
                height={64}
                className="rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>Qty: {item.quantity}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Total: ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4 flex items-center justify-between">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-medium">${totalCost.toFixed(2)}</span>
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            View Cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPreview;
