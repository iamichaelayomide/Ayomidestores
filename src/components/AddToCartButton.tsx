"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import { Product } from "@prisma/client";

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    const firstImage = product.images.includes(",") 
      ? product.images.split(",")[0].trim() 
      : product.images;

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: firstImage || "",
      quantity: quantity,
      stock: product.stock,
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
        <div className="flex items-center border rounded-md">
          <button 
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button 
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-500">{product.stock} in stock</span>
      </div>
      <Button size="lg" className="w-full md:w-auto flex items-center gap-2" onClick={handleAdd}>
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </Button>
    </div>
  );
}
