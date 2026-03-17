import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ayomide | Premium Household Items",
  description: "Shop for premium household items, kitchenware, and daily essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
