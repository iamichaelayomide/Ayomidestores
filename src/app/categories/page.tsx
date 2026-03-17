import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shop by Category</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`}
            className="group relative h-80 rounded-2xl overflow-hidden"
          >
            <img 
              src={category.image || "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop"} 
              alt={category.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-sm text-gray-200 text-center line-clamp-2 max-w-[250px]">{category.description}</p>
              <span className="mt-4 px-4 py-2 bg-white text-black text-sm font-medium rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                Browse Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

