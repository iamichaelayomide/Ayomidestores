import { Category, Product, Review } from '@prisma/client';

export type ProductWithCategory = Product & { category: Category };
export type ProductWithDetails = Product & {
  category: Category;
  reviews: Review[];
};

export type SafeUser = {
  id: string;
  name: string | null;
  email: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'MANAGER' | 'STAFF';
};

export type CartItemType = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};
