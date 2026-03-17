import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/admin" className="font-bold tracking-tight text-lg">
            ADMIN<span className="text-gray-500">PANEL</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <LayoutDashboard className="w-4 h-4 text-gray-500" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <Package className="w-4 h-4 text-gray-500" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <ShoppingBag className="w-4 h-4 text-gray-500" /> Orders
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <Users className="w-4 h-4 text-gray-500" /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-900">
            <Settings className="w-4 h-4 text-gray-500" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-red-600">
            <LogOut className="w-4 h-4" /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 md:hidden">
          <Link href="/admin" className="font-bold tracking-tight text-lg">
            ADMIN<span className="text-gray-500">PANEL</span>
          </Link>
        </header>
        <div className="p-6 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
