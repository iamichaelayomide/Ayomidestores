import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function DealsPage() {
  const products = await prisma.product.findMany({
    where: { isDeal: true, isPublished: true },
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Exclusive Deals</h1>
        <p className="text-gray-500">Save big on our premium household collections. Limited time offers!</p>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500 font-medium">No active deals at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

