"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<"FORM" | "PAYMENT_CONFIRM">("FORM");
  const [method, setMethod] = useState("PAYSTACK");

  useEffect(() => {
    setMounted(true);
  }, []);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: ""
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "BANK_TRANSFER") {
      setStep("PAYMENT_CONFIRM");
    } else {
      // Placeholder for Paystack redirect
      alert(`Redirecting to Paystack for payment...`);
      clearCart();
      router.push("/order-success");
    }
  };

  const handleConfirmTransfer = () => {
    clearCart();
    router.push("/order-success");
  };

  if (!mounted) {
    return <div className="text-center py-20">Loading checkout...</div>;
  }

  if (items.length === 0) {
    return <div className="text-center py-20">Cart is empty. Redirecting...</div>;
  }

  if (step === "PAYMENT_CONFIRM") {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Complete Your Payment</h1>
        <p className="text-gray-600 mb-8">Please transfer the total amount to the account below to confirm your order.</p>
        
        <div className="bg-gray-50 p-6 rounded-xl border mb-8 text-left space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Bank</span>
            <span className="font-semibold">GTBank</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Account Number</span>
            <span className="font-semibold tracking-wider text-lg">0123456789</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Account Name</span>
            <span className="font-semibold">Ayomide Essentials Ltd</span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-gray-500">Amount to Transfer</span>
            <span className="font-bold text-lg">{formatPrice(totalPrice() + 2000)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirmTransfer}>
            I Have Transferred
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setStep("FORM")}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 order-2 lg:order-1">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input required placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input required type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input required placeholder="+234 800 000 0000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Street Address</label>
                  <Input required placeholder="123 Main Street" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input required placeholder="Lagos" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${method === 'PAYSTACK' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="PAYSTACK" checked={method === 'PAYSTACK'} onChange={() => setMethod('PAYSTACK')} />
                  <div className="flex-1">
                    <div className="font-medium text-black">Pay with Card (Paystack)</div>
                    <div className="text-sm text-gray-500">Secure online payment</div>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${method === 'BANK_TRANSFER' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="BANK_TRANSFER" checked={method === 'BANK_TRANSFER'} onChange={() => setMethod('BANK_TRANSFER')} />
                  <div className="flex-1">
                    <div className="font-medium text-black">Bank Transfer</div>
                    <div className="text-sm text-gray-500">Direct transfer to our account</div>
                  </div>
                </label>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              {method === 'PAYSTACK' ? 'Pay Now' : 'Place Order'}
            </Button>
          </form>
        </div>

        <div className="w-full lg:w-96 shrink-0 order-1 lg:order-2">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Your Order</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded bg-gray-200 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 text-sm pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping (Flat Rate)</span>
                <span className="font-medium">{formatPrice(2000)}</span>
              </div>
            </div>
            <div className="pt-4 border-t flex justify-between mt-6">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-lg">{formatPrice(totalPrice() + 2000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
