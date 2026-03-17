import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [productCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
  ]);

  // Aggregate mock total revenue
  const totalRevenue = 1250000; // Placeholder

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><ShoppingBag className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{orderCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Package className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Products</p>
            <p className="text-2xl font-bold">{productCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Customers</p>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">Recent Orders</h2>
        </div>
        <div className="p-6 text-center text-gray-500 py-12">
          No recent orders to display.
        </div>
      </div>
    </div>
  );
}

