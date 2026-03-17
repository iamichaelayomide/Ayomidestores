import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(Number(price));
}

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and dashes with a single dash
    .replace(/^-+|-+$/g, ""); // Trim dashes from the start and end
}
