import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch some featured and deal products
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, isPublished: true },
    take: 4,
  });

  const deals = await prisma.product.findMany({
    where: { isDeal: true, isPublished: true },
    take: 4,
  });

  const faqs = [
    {
      q: "What is Ayomide?",
      a: "Ayomide is a premium household retail brand based in Nigeria, offering curated, high-quality items for your home."
    },
    {
      q: "Do you deliver nationwide?",
      a: "Yes, we deliver across all states in Nigeria. Delivery times and fees vary depending on your location."
    },
    {
      q: "Can I return an item if I don't like it?",
      a: "We offer a 14-day return policy for unused items in their original packaging. Please view our Returns page for full details."
    }
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Promo Bar */}
      <div className="bg-black text-white text-xs sm:text-sm py-2 px-4 text-center">
        Free delivery on orders over ₦50,000. Shop our latest household collections!
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100">
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full">
            <img
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600&auto=format&fit=crop"
              alt="Premium Household Items"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 z-10 px-6 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Elevate Your Everyday Living
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Discover our curated collection of premium household essentials. From smart kitchen appliances to elegant storage solutions.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Shop Now
                </Button>
              </Link>
              <Link href="/deals">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white bg-transparent">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Kitchen & Dining", slug: "kitchen-and-dining", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200" },
            { name: "Cleaning", slug: "cleaning-laundry", image: "/images/site/cleaning-category.jpg" },
            { name: "Storage", slug: "storage-organization", image: "/images/products/storage-basket.jpg" },
            { name: "Personal Care", slug: "personal-care", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200" }
          ].map((cat, i) => (
            <Link key={i} href={`/categories/${cat.slug}`} className="group relative rounded-lg overflow-hidden aspect-[4/5]">
              <img 
                src={cat.image} 
                alt={cat.name} 
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
          <Link href="/shop" className="text-sm font-medium underline underline-offset-4">View all</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* Fallback if no db seeded */}
          {featuredProducts.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
              No products found. Please run <code>npm run db:seed</code> to populate the database.
            </p>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We've got answers.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl border">
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="text-blue-600 hover:underline font-medium">View all FAQs</Link>
        </div>
      </section>

      {/* Physical Store Promo */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-sm relative h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&auto=format&fit=crop" 
              alt="Our Physical Store" 
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Visit Our Local Store</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Prefer to see it in person? Visit our flagship store in Lagos to explore our full collection. You can also order online and choose free in-store pickup at checkout.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded shadow-sm"><span className="text-xl">📍</span></div>
                <p className="font-medium">123 Commerce Avenue, Lagos</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded shadow-sm"><span className="text-xl">🕒</span></div>
                <p className="font-medium">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
            <Link href="/store">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Get Directions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
