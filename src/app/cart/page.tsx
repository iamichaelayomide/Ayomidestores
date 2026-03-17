"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="container mx-auto px-4 md:px-6 py-24 text-center">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-12 text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 pb-4 border-b">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 py-4 border-b">
                <div className="col-span-6 flex items-center gap-4">
                  <div className="h-24 w-24 rounded-md bg-gray-100 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-red-500 hover:underline mt-2 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-center hidden md:block">
                  {formatPrice(item.price)}
                </div>

                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-right font-medium">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>
            <div className="pt-4 border-t flex justify-between mb-6">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-lg">{formatPrice(totalPrice())}</span>
            </div>
            <Link href="/checkout" className="w-full">
              <Button size="lg" className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
