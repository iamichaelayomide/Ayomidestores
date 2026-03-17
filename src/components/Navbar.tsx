"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, Menu, User, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const cartCount = totalItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 relative">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link href="/" className="text-xl font-bold tracking-tight text-black" onClick={closeMobileMenu}>
            AYOMIDE
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
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

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="border-t bg-white md:hidden">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4 flex items-center rounded-full bg-gray-100 px-4 py-2">
              <Search className="mr-2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="text-xs font-medium text-black">
                Search
              </button>
            </form>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive ? "bg-black text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full justify-center">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </Link>
              <Link href="/cart" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full justify-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
