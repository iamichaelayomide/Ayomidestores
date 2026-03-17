import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = (product.images.includes(",") ? product.images.split(",")[0].trim() : product.images) || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop";

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        {product.isDeal && (
          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}
        {product.isNewArrival && !product.isDeal && (
          <span className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">
            {formatPrice(product.salePrice || product.price)}
          </p>
          {product.salePrice && (
            <p className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
