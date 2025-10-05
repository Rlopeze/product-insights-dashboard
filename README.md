x# Product Insights Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A comprehensive product catalog dashboard built with Next.js, TypeScript, shadcn/ui, and TanStack Query. This internal tool provides stakeholders with real-time insights into product data, helping drive data-driven decision making.

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rlopeze/product-insights-dashboard.git
   cd product-insights-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Quick Start

The dashboard is ready to use immediately after installation. It connects to the DummyJSON API to fetch product data, so no additional configuration is required.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main dashboard page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── insights-cards.tsx # KPI and insight cards
│   ├── product-filters.tsx # Filter components
│   └── product-list.tsx   # Product table and details
├── lib/                  # Utilities and configurations
│   ├── actions.ts        # Server actions for data fetching
│   ├── hooks.ts          # Custom React Query hooks
│   ├── query-client.tsx  # TanStack Query setup
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
    └── product.ts        # Product-related types
```
