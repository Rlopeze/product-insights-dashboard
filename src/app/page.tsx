"use client";

import { useState } from "react";
import { ProductFilters as ProductFiltersType } from "@/types/product";
import {
  InsightsCards,
  CategoryInsights,
  TopRatedProducts,
  LowStockAlert,
} from "@/components/insights-cards";
import { ProductFilters } from "@/components/product-filters";
import { ProductList } from "@/components/product-list";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/lib/hooks";
import { BarChart3, Package, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 500);
  const debouncedFilters = {
    ...filters,
    search: debouncedSearch || undefined,
  };

  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters);
    if (newFilters.search !== undefined) {
      setSearchInput(newFilters.search);
    } else {
      setSearchInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Product Insights Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Internal product catalog with real-time insights and analytics
              </p>
            </div>
            <Badge variant="outline" className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Live Data</span>
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Key Metrics</span>
          </h2>
          <InsightsCards />
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Product Insights</span>
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <CategoryInsights />
            <TopRatedProducts />
            <LowStockAlert />
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Product Catalog</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <ProductFilters filters={filters} onFiltersChange={handleFiltersChange} />
            </div>

            <div className="lg:col-span-3">
              <ProductList filters={debouncedFilters} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
