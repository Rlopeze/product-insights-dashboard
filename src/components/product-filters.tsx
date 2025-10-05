"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFilters as ProductFiltersType } from "@/types/product";
import { useCategories } from "@/lib/hooks";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
}

type FilterMode = "search" | "category";

export const ProductFilters = ({
  filters,
  onFiltersChange,
}: ProductFiltersProps) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const [currentMode, setCurrentMode] = useState<FilterMode>("search");

  const handleModeChange = (mode: FilterMode) => {
    onFiltersChange({});
    setCurrentMode(mode);
  };

  const handleSearchChange = (value: string) => {
    onFiltersChange({
      search: value || undefined,
      category: undefined
    });
    if (value && currentMode !== "search") {
      setCurrentMode("search");
    }
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      search: undefined,
      category: value === "all" ? undefined : value,
    });
    if (value !== "all" && currentMode !== "category") {
      setCurrentMode("category");
    }
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter Products</span>
          </CardTitle>
          <div className="flex items-center space-x-2 min-h-[32px]">
            {hasActiveFilters ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            ) : (
              <div className="w-0" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">Filter Mode:</span>
          </div>
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={currentMode === "search" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleModeChange("search")}
              className="text-xs px-3 py-1 h-7"
            >
              <Search className="h-3 w-3 mr-1" />
              Search
            </Button>
            <Button
              variant={currentMode === "category" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleModeChange("category")}
              className="text-xs px-3 py-1 h-7"
            >
              <Filter className="h-3 w-3 mr-1" />
              Category
            </Button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Choose one mode: search across all products or filter by category
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentMode === "search" ? (
          /* Search Mode */
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name, brand, or description..."
                value={filters.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Search across all products in the catalog
            </p>
          </div>
        ) : (
          /* Category Mode */
          <div className="space-y-2">
            <Select
              value={filters.category || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="border-primary/20 focus:border-primary">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesLoading ? (
                  <SelectItem value="loading" disabled>Loading...</SelectItem>
                ) : (
                  categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Browse products within a specific category
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
