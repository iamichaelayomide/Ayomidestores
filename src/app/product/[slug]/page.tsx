import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!product) {
    notFound();
  }

  // Handle images which are stored as a string in SQLite
  const images = product.images.includes(",") 
    ? product.images.split(",").map(img => img.trim())
    : [product.images];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
            <img 
              src={images[0] || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop"} 
              alt={product.name} 
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 hover:border-black transition-colors relative">
                  <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{product.category?.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-end gap-4 mb-6">
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(product.salePrice || product.price)}
            </p>
            {product.salePrice && (
              <p className="text-lg text-gray-500 line-through pb-0.5">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.shortDescription || product.description}
          </p>

          <AddToCartButton product={product} />

          <div className="mt-12 pt-8 border-t space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t text-sm text-gray-600">
              <div>
                <span className="font-medium text-black">SKU:</span> {product.sku}
              </div>
              <div>
                <span className="font-medium text-black">Category:</span> {product.category?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

