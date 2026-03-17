import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-md">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="w-20 h-20 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Thank you for shopping with Ayomide. We have received your order and payment details. You will receive a confirmation email shortly.
      </p>
      <Link href="/shop" className="inline-block bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
}
