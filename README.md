# HomeEssentials - Premium E-commerce Platform

A modern, fast, and scalable e-commerce application built with Next.js, React, Tailwind CSS, Prisma, and PostgreSQL. Tailored for a household items retail business with both online and physical store operations.

## Features Included

- 🛒 **Storefront**: Premium, Stripe/Apple-inspired modern UI.
- 📱 **Mobile-First Responsive**: Looks great on all devices.
- 🛍️ **Cart & Checkout**: Persistent cart using Zustand, with simulated Paystack & Bank Transfer options.
- 🔑 **Authentication**: NextAuth setup with Credentials provider (ready for OAuth).
- 🗄️ **Database**: Fully typed Prisma ORM setup.
- 📦 **Admin Dashboard**: Scaffolded backend to manage products, categories, and orders.
- ✨ **Design System**: Built with Tailwind CSS and radix-ui/shadcn-inspired components.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + Radix UI Primitives (via shadcn)
- **Database:** PostgreSQL + Prisma ORM
- **State Management:** Zustand (for Cart)
- **Authentication:** NextAuth.js
- **Icons:** Lucide React

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example`.

For Supabase:
- set `DATABASE_URL` to the Supabase pooled connection string
- set `DIRECT_URL` to the Supabase direct connection string
- keep `NEXTAUTH_URL` as `http://localhost:3000` for local development
- generate a long random `NEXTAUTH_SECRET`

```env
DATABASE_URL="postgresql://postgres:[password]@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secure_secret"
```

### 3. Setup Database and Seed Data

Push the Prisma schema to your database and seed it with placeholder household items and an admin user.

```bash
npx prisma db push
npm run db:seed
```

*Seed credentials:*
- **Admin Email:** `admin@homeessentials.com`
- **Admin Password:** `admin123`

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the storefront, and `http://localhost:3000/admin` to access the admin dashboard.

## Production Packaging

Build a deployable standalone package with:

```bash
npm run package
```

This creates a `release/` folder containing:

- the standalone Next.js server
- compiled static assets
- public assets
- Prisma schema files needed for deployment context

Run the packaged app from inside `release/` with:

```bash
node server.js
```

## Deploying With Supabase, Git, and Vercel

### Supabase

1. Create a new Supabase project.
2. Copy the pooled connection string into `DATABASE_URL`.
3. Copy the direct connection string into `DIRECT_URL`.
4. Run `npx prisma db push`.
5. Run `npm run db:seed` if you want the starter catalog and admin account.

### Git

Initialize Git and commit the project after confirming `.env` is not tracked:

```bash
git init
git add .
git commit -m "Initial commit"
```

Then create an empty GitHub repo and connect it:

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

### Vercel

1. Import the GitHub repo into Vercel.
2. Add these environment variables in the Vercel project settings:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
3. Set `NEXTAUTH_URL` to your production domain, for example `https://your-app.vercel.app`.
4. Redeploy after saving the variables.

## Extending the App

- **Payments**: Connect actual Paystack APIs in the `checkout` process. 
- **Images**: Integrate Cloudinary or UploadThing for handling product image uploads in the admin panel.
- **Emails**: Implement `resend` or `nodemailer` within API routes for order confirmation emails.
