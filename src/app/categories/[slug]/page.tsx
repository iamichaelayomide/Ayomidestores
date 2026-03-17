import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">{category.description}</p>
        )}
      </div>

      {category.products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          {category.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500 font-medium">No products found in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

