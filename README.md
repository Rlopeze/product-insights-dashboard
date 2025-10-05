# Product Insights Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A comprehensive product catalog dashboard built with Next.js, TypeScript, shadcn/ui, and TanStack Query. This internal tool provides stakeholders with real-time insights into product data, helping drive data-driven decision making.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Project Structure](#️-project-structure)
- [API Integration](#-api-integration)
- [Performance](#-performance-considerations)
- [Live Demo](#-live-demo)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### Core Functionality

- **Product Catalog**: Browse and search through the complete product catalog
- **Real-time Insights**: Key metrics including total products, average price, ratings, and stock levels
- **Advanced Filtering**: Filter by category, price range, rating, and search terms
- **Product Details**: Detailed view with images, descriptions, and specifications
- **Category Analysis**: Breakdown of products by category with average pricing
- **Stock Management**: Low stock alerts and inventory insights
- **Top Rated Products**: Highlighting of highest-rated products

### Technical Features

- **Server Actions**: Efficient data fetching with Next.js server actions
- **TanStack Query**: Client-side caching and state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error states and loading indicators
- **Performance**: Optimized with caching and image optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Data Fetching**: TanStack Query + Server Actions
- **API**: DummyJSON (https://dummyjson.com)
- **Icons**: Lucide React
- **Development**: ESLint, Prettier

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

## 🎯 Product Decisions & Design Philosophy

### User Experience Priorities

1. **Stakeholder-First Design**: Information hierarchy prioritizes what executives need to see first
2. **Quick Insights**: Key metrics are prominently displayed at the top
3. **Actionable Alerts**: Low stock warnings help prevent inventory issues
4. **Efficient Navigation**: Search and filters enable quick product discovery

### Technical Decisions

1. **Server Actions over API Routes**: Better performance and type safety
2. **TanStack Query**: Excellent caching and background updates
3. **shadcn/ui**: Consistent, accessible, and customizable components
4. **Mobile-First**: Responsive design for all device sizes

### Data Strategy

- **Caching**: 1-hour cache for API responses to reduce load
- **Error Handling**: Graceful degradation when API is unavailable
- **Real-time Feel**: Background updates with optimistic UI
- **Performance**: Image optimization and lazy loading

## 📊 Dashboard Sections

### 1. Key Metrics (Top Priority)

- Total Products: Quick overview of catalog size
- Average Price: Pricing insights across all products
- Average Rating: Quality indicator
- Total Stock: Inventory health

### 2. Product Insights

- **Category Breakdown**: Shows product distribution and average prices
- **Top Rated Products**: Highlights best-performing items
- **Low Stock Alert**: Critical inventory warnings

### 3. Product Catalog

- **Search & Filter**: Advanced filtering capabilities
- **Table View**: Comprehensive product information
- **Detail Modal**: Full product specifications and images

## 🔧 API Integration

The dashboard integrates with DummyJSON API endpoints:

- `/products` - Fetch all products with optional filtering
- `/products/{id}` - Get individual product details
- `/products/categories` - Retrieve available categories

### Data Processing

- Client-side search (since DummyJSON doesn't support text search)
- Server-side aggregation for insights
- Caching strategy for optimal performance

## 🚧 Current Limitations

1. **Search Functionality**: Limited to client-side filtering due to API constraints
2. **Real-time Updates**: Data refreshes every hour, not real-time
3. **Pagination**: All products loaded at once (could be optimized for large datasets)
4. **Analytics**: No historical data or trend analysis
5. **User Management**: No authentication or user-specific views

## 🚀 Future Improvements (Given More Time)

### Short Term (1-2 weeks)

- **Pagination**: Implement server-side pagination for better performance
- **Export Functionality**: CSV/Excel export for product data
- **Advanced Search**: Full-text search with highlighting
- **Bulk Actions**: Select multiple products for batch operations

### Medium Term (1-2 months)

- **Authentication**: User login and role-based access
- **Dashboard Customization**: User-configurable widgets and layouts
- **Historical Data**: Track product changes over time
- **Advanced Analytics**: Sales trends, seasonal patterns, price optimization
- **Mobile App**: React Native version for field teams

### Long Term (3-6 months)

- **Machine Learning**: Product recommendation engine
- **Integration**: Connect with real inventory management systems
- **Real-time Sync**: WebSocket integration for live updates
- **Advanced Reporting**: Automated insights and alerts
- **Multi-tenant**: Support for multiple organizations

## 🧪 Testing Strategy

While not implemented in this MVP, the testing strategy would include:

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: API integration and data flow
- **E2E Tests**: Critical user journeys
- **Performance Tests**: Load testing for large datasets
- **Accessibility Tests**: WCAG compliance verification

## 📈 Performance Considerations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Strategic caching at multiple levels
- **Bundle Size**: Tree shaking and minimal dependencies
- **SEO**: Server-side rendering for better search visibility

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/1e293b/ffffff?text=Dashboard+Overview" alt="Dashboard Overview" width="400"/>
  <img src="https://via.placeholder.com/800x400/1e293b/ffffff?text=Product+Details" alt="Product Details" width="400"/>
</div>

## 🌐 Live Demo

Visit the live application: [Product Insights Dashboard](https://product-insights-dashboard.vercel.app)

> **Note**: The live demo uses DummyJSON API for sample data. In production, this would connect to your actual product database.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Add TypeScript types for new features
- Update tests when adding new functionality
- Ensure responsive design for all new components

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <strong>Built with ❤️ for product teams who need better insights</strong>
  
  [⭐ Star this repo](https://github.com/Rlopeze/product-insights-dashboard) • 
  [🐛 Report Bug](https://github.com/Rlopeze/product-insights-dashboard/issues) • 
  [💡 Request Feature](https://github.com/Rlopeze/product-insights-dashboard/issues)
</div>
