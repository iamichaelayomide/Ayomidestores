import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white text-center bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600&auto=format&fit=crop"
          alt="About Ayomide"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Our Mission</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Elevating everyday living with premium, curated household items designed for the modern home.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="space-y-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quality, Curated, Crafted</h2>
            <p className="text-gray-600 text-lg">Since 2024, Ayomide has been at the forefront of the household retail industry in Nigeria, providing high-quality solutions for homes across the nation.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Why We Started</h3>
              <p className="text-gray-600 leading-relaxed">
                We noticed a gap in the market for premium, reliable household items that don't just work well, but also look great. Your home is your sanctuary, and every item in it should contribute to its comfort and beauty.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From high-performance kitchenware to elegant storage solutions, we source only the best from global manufacturers and local craftsmen.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200">
              <img 
                src="/images/site/our-story.jpg" 
                alt="Our Story" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative aspect-square rounded-2xl overflow-hidden order-2 md:order-1 bg-gray-200">
              <img 
                src="/images/site/cleaning-category.jpg" 
                alt="Our Vision" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h3 className="text-2xl font-bold">Our Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                We are committed to sustainability and longevity. We believe in buying things that last. By choosing Ayomide, you're not just buying a product; you're investing in your home's future.
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-black font-bold">✓</span>
                  <span>Premium materials and craftsmanship</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">✓</span>
                  <span>Responsive and helpful customer service</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold">✓</span>
                  <span>Fast and secure delivery across Nigeria</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade your home?</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">Explore our collection of handpicked household essentials and transform your living space today.</p>
          <Link href="/shop" className="inline-flex items-center justify-center rounded-md bg-black px-10 py-4 text-lg font-medium text-white hover:bg-black/90 transition-colors">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
