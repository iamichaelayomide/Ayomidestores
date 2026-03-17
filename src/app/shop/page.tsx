import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export default async function ShopPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : undefined;
  const price = typeof params.price === 'string' ? params.price : undefined;
  
  let whereClause: any = { isPublished: true };
  
  if (q) {
    whereClause.OR = [
      { name: { contains: q } },
      { description: { contains: q } }
    ];
  }

  if (price === 'under-10k') {
    whereClause.price = { lt: 10000 };
  } else if (price === '10k-50k') {
    whereClause.price = { gte: 10000, lte: 50000 };
  } else if (price === 'over-50k') {
    whereClause.price = { gt: 50000 };
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        {q ? `Search Results for "${q}"` : "All Products"}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="space-y-6 sticky top-24">
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/shop" className="hover:text-black">All</Link></li>
                <li><Link href="/categories/kitchen-and-dining" className="hover:text-black">Kitchen & Dining</Link></li>
                <li><Link href="/categories/cleaning-laundry" className="hover:text-black">Cleaning</Link></li>
                <li><Link href="/categories/storage-organization" className="hover:text-black">Storage</Link></li>
                <li><Link href="/categories/personal-care" className="hover:text-black">Personal Care</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Price</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/shop" className={`hover:text-black ${!price ? 'font-bold text-black' : ''}`}>Any Price</Link></li>
                <li><Link href="/shop?price=under-10k" className={`hover:text-black ${price === 'under-10k' ? 'font-bold text-black' : ''}`}>Under ₦10,000</Link></li>
                <li><Link href="/shop?price=10k-50k" className={`hover:text-black ${price === '10k-50k' ? 'font-bold text-black' : ''}`}>₦10,000 - ₦50,000</Link></li>
                <li><Link href="/shop?price=over-50k" className={`hover:text-black ${price === 'over-50k' ? 'font-bold text-black' : ''}`}>Over ₦50,000</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed">
              <p className="text-gray-500">No products match your filters.</p>
              <Link href="/shop" className="text-blue-600 hover:underline mt-4 inline-block">Clear Filters</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
