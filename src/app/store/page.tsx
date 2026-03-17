import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StorePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Our Physical Store</h1>
      
      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Lagos Flagship Store</h2>
        <div className="space-y-4 text-gray-600 mb-8">
          <p><strong>Address:</strong><br/>123 Commerce Avenue, Lagos, Nigeria</p>
          <p><strong>Opening Hours:</strong><br/>Monday - Saturday: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p>
          <p><strong>Phone:</strong> +234 800 000 0000</p>
        </div>
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">Map integration goes here.</p>
        </div>
      </div>
      
      <Link href="/">
        <Button variant="outline">Back to Home</Button>
      </Link>
    </div>
  );
}
