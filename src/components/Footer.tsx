import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight mb-4 block text-black">
              AYOMIDE
            </Link>
            <p className="text-sm text-gray-500">
              Your premium destination for high-quality household items, kitchenware, and daily essentials.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-black">All Products</Link></li>
              <li><Link href="/categories/kitchen-and-dining" className="hover:text-black">Kitchen & Dining</Link></li>
              <li><Link href="/categories/cleaning-laundry" className="hover:text-black">Cleaning Supplies</Link></li>
              <li><Link href="/deals" className="hover:text-black">Special Deals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-black">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-black">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-black">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Visit Our Store</h3>
            <address className="text-sm text-gray-500 not-italic space-y-2">
              <p>123 Commerce Avenue</p>
              <p>Lagos, Nigeria</p>
              <p>Mon - Sat: 9am - 6pm</p>
              <a href="tel:+2348000000000" className="block hover:text-black">+234 800 000 0000</a>
            </address>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ayomide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
