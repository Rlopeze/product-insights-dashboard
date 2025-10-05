"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProductInsights } from "@/lib/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Star, TrendingUp, AlertTriangle } from "lucide-react";
import Image from 'next/image';

export const InsightsCards = () => {
  const { data: insights, isLoading, error } = useProductInsights();

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                Failed to load
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[80px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{insights.totalProducts}</div>
          <p className="text-xs text-muted-foreground">Across all categories</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${insights.averagePrice}</div>
          <p className="text-xs text-muted-foreground">Per product</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{insights.averageRating}</div>
          <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{insights.totalStock}</div>
          <p className="text-xs text-muted-foreground">Units available</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const CategoryInsights = () => {
  const { data: insights, isLoading, error } = useProductInsights();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Failed to load category data</div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!insights) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.categories.slice(0, 5).map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{category.name}</Badge>
              <span className="text-sm text-muted-foreground">
                ${category.averagePrice}
              </span>
            </div>
            <span className="text-sm font-medium">{category.count}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const TopRatedProducts = () => {
  const { data: insights, isLoading, error } = useProductInsights();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Rated Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Failed to load top rated products</div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Rated Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-12 w-12 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!insights) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Rated Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.topRatedProducts.slice(0, 3).map((product) => (
          <div key={product.id} className="flex items-center space-x-3">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={48}
              height={48}
              className="h-12 w-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.title}</p>
              <div className="flex items-center space-x-2">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {product.rating}
                </span>
              </div>
            </div>
            <Badge variant="secondary">${product.price}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const LowStockAlert = () => {
  const { data: insights, isLoading, error } = useProductInsights();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span>Low Stock Alert</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Failed to load low stock products</div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span>Low Stock Alert</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-12 w-12 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!insights || insights.lowStockProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-green-500" />
            <span>Stock Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-green-600 font-medium">
            All products are well stocked!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <span>Low Stock Alert</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.lowStockProducts.slice(0, 3).map((product) => (
          <div key={product.id} className="flex items-center space-x-3">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={48}
              height={48}
              className="h-12 w-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.title}</p>
              <p className="text-xs text-muted-foreground">
                {product.brand} •{product.category}
              </p>
            </div>
            <Badge variant="destructive">{product.stock} left</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
