"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, User, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const cartCount = mounted ? totalItems : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 relative">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="text-xl font-bold tracking-tight text-black">
            AYOMIDE
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/shop" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Shop</Link>
            <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Categories</Link>
            <Link href="/deals" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Deals</Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">About Us</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-3 py-1 mr-2">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="bg-transparent border-none outline-none text-sm w-40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
