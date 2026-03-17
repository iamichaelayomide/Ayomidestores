const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@homeessentials.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin created: ${admin.email}`);

  const categoriesData = [
    {
      name: "Kitchen & Dining",
      slug: "kitchen-and-dining",
      description: "Everything for your kitchen.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200",
    },
    {
      name: "Cleaning & Laundry",
      slug: "cleaning-laundry",
      description: "Keep your home spotless.",
      image: "/images/site/cleaning-category.jpg",
    },
    {
      name: "Storage & Organization",
      slug: "storage-organization",
      description: "Organize your space.",
      image: "/images/products/storage-basket.jpg",
    },
    {
      name: "Personal Care",
      slug: "personal-care",
      description: "Grooming and personal devices.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
    },
  ];

  const categories: Record<string, any> = {};

  for (const cat of categoriesData) {
    categories[cat.slug] = await prisma.category.create({
      data: cat,
    });
  }

  console.log("Categories created.");

  const productsData = [
    {
      name: "Non-Stick Frying Pan Set",
      slug: "non-stick-frying-pan-set",
      description: "Premium 3-piece non-stick frying pan set. Perfect for healthy cooking with less oil. Includes 8\", 10\", and 12\" pans.",
      shortDescription: "Premium 3-piece non-stick frying pan set.",
      price: 25000,
      salePrice: 21500,
      sku: "KT-PAN-001",
      stock: 50,
      images: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1200",
      featured: true,
      isDeal: true,
      isNewArrival: false,
      isPublished: true,
      categoryId: categories["kitchen-and-dining"].id,
      ratingAverage: 4.6,
      reviewCount: 18,
    },
    {
      name: "Electric Kettle 1.7L",
      slug: "electric-kettle-1-7l",
      description: "Fast boiling electric kettle with auto shut-off and stainless steel finish.",
      shortDescription: "Fast boiling stainless steel electric kettle.",
      price: 15000,
      salePrice: null,
      sku: "KT-KTL-002",
      stock: 100,
      images: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1200",
      featured: true,
      isDeal: false,
      isNewArrival: true,
      isPublished: true,
      categoryId: categories["kitchen-and-dining"].id,
      ratingAverage: 4.4,
      reviewCount: 11,
    },
    {
      name: "Cordless Hair Clipper",
      slug: "cordless-hair-clipper",
      description: "Professional cordless hair clipper with titanium blades and up to 4 hours battery life.",
      shortDescription: "Professional cordless hair clipper.",
      price: 18500,
      salePrice: 15000,
      sku: "PC-CLP-001",
      stock: 30,
      images: "/images/products/cordless-clipper.jpg",
      featured: true,
      isDeal: true,
      isNewArrival: false,
      isPublished: true,
      categoryId: categories["personal-care"].id,
      ratingAverage: 4.7,
      reviewCount: 24,
    },
    {
      name: "Storage Basket Set 4-Pack",
      slug: "storage-basket-set-4-pack",
      description: "Durable woven storage baskets for organizing clothes, toys, and household items.",
      shortDescription: "Durable woven storage baskets.",
      price: 12000,
      salePrice: null,
      sku: "ST-BSK-001",
      stock: 200,
      images: "/images/products/storage-basket.jpg",
      featured: false,
      isDeal: false,
      isNewArrival: true,
      isPublished: true,
      categoryId: categories["storage-organization"].id,
      ratingAverage: 4.3,
      reviewCount: 9,
    },
    {
      name: "Microfiber Cleaning Cloths 12-Pack",
      slug: "microfiber-cleaning-cloths",
      description: "Ultra-absorbent microfiber cloths for streak-free cleaning and safe use on most surfaces.",
      shortDescription: "Ultra-absorbent microfiber cloths.",
      price: 5500,
      salePrice: null,
      sku: "CL-MCF-001",
      stock: 500,
      images: "/images/products/cleaning-cloth.jpg",
      featured: true,
      isDeal: false,
      isNewArrival: false,
      isPublished: true,
      categoryId: categories["cleaning-laundry"].id,
      ratingAverage: 4.5,
      reviewCount: 31,
    },
    {
      name: "Dish Drying Rack",
      slug: "dish-drying-rack",
      description: "Compact dish drying rack with cutlery holder and rust-resistant frame.",
      shortDescription: "Compact rust-resistant dish drying rack.",
      price: 9800,
      salePrice: 8500,
      sku: "KT-DRK-003",
      stock: 75,
      images: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200",
      featured: false,
      isDeal: true,
      isNewArrival: false,
      isPublished: true,
      categoryId: categories["kitchen-and-dining"].id,
      ratingAverage: 4.2,
      reviewCount: 13,
    },
    {
      name: "Laundry Hamper",
      slug: "laundry-hamper",
      description: "Foldable laundry hamper with sturdy handles and breathable fabric body.",
      shortDescription: "Foldable laundry hamper with sturdy handles.",
      price: 8700,
      salePrice: null,
      sku: "CL-LDH-002",
      stock: 90,
      images: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=1200",
      featured: false,
      isDeal: false,
      isNewArrival: true,
      isPublished: true,
      categoryId: categories["cleaning-laundry"].id,
      ratingAverage: 4.1,
      reviewCount: 8,
    },
    {
      name: "Bathroom Organizer Shelf",
      slug: "bathroom-organizer-shelf",
      description: "Wall-mounted bathroom organizer shelf for soaps, lotions, and toiletries.",
      shortDescription: "Wall-mounted bathroom organizer shelf.",
      price: 7600,
      salePrice: null,
      sku: "ST-BTH-003",
      stock: 140,
      images: "/images/products/bathroom-shelf.jpg",
      featured: false,
      isDeal: false,
      isNewArrival: false,
      isPublished: true,
      categoryId: categories["storage-organization"].id,
      ratingAverage: 4.0,
      reviewCount: 6,
    },
    {
      name: "Electric Beard Trimmer",
      slug: "electric-beard-trimmer",
      description: "Rechargeable beard trimmer with adjustable guard lengths and precision blades.",
      shortDescription: "Rechargeable beard trimmer.",
      price: 14000,
      salePrice: 11900,
      sku: "PC-TRM-002",
      stock: 40,
      images: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200",
      featured: true,
      isDeal: true,
      isNewArrival: true,
      isPublished: true,
      categoryId: categories["personal-care"].id,
      ratingAverage: 4.6,
      reviewCount: 15,
    },
  ];

  for (const prod of productsData) {
    await prisma.product.create({
      data: prod,
    });
  }

  console.log("Products seeded successfully.");
}

main()
  .catch((e: any) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });