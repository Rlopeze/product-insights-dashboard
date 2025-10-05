"use server";

import {
  Product,
  ProductsResponse,
  ProductInsights,
  ProductFilters,
} from "@/types/product";

const DUMMYJSON_BASE_URL = "https://dummyjson.com";

export async function fetchProducts(
  filters?: ProductFilters,
  pageParam?: { skip: number; limit: number }
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams();
    const skip = pageParam?.skip || 0;
    const limit = pageParam?.limit || 30;
    params.append("skip", skip.toString());
    params.append("limit", limit.toString());
    let url: string;
    if (filters?.search) {
      params.append("q", filters.search);
      url = `${DUMMYJSON_BASE_URL}/products/search?${params.toString()}`;
    } else if (filters?.category) {
      url = `${DUMMYJSON_BASE_URL}/products/category/${filters.category}?${params.toString()}`;
    } else {
      url = `${DUMMYJSON_BASE_URL}/products?${params.toString()}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: ProductsResponse = await response.json();

    if (!data || !Array.isArray(data.products)) {
      throw new Error("Invalid products data received");
    }

    return data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${DUMMYJSON_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const product = await response.json();

    // Basic validation to ensure we have a valid product
    if (!product || !product.id) {
      throw new Error("Invalid product data received");
    }

    return product;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
}

export async function fetchProductInsights(): Promise<ProductInsights> {
  try {
    const response = await fetchProducts();
    const products = response.products;

    const totalProducts = response.total;
    if (totalProducts === 0) {
      return {
        totalProducts: 0,
        averagePrice: 0,
        averageRating: 0,
        totalStock: 0,
        categories: [],
        topRatedProducts: [],
        lowStockProducts: [],
      };
    }

    const averagePrice =
      products.reduce((sum, product) => sum + (product.price || 0), 0) /
      totalProducts;
    const averageRating =
      products.reduce((sum, product) => sum + (product.rating || 0), 0) /
      totalProducts;
    const totalStock = products.reduce(
      (sum, product) => sum + (product.stock || 0),
      0
    );

    // Group by category
    const categoryMap = new Map<
      string,
      { count: number; totalPrice: number }
    >();
    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      const existing = categoryMap.get(category) || {
        count: 0,
        totalPrice: 0,
      };
      categoryMap.set(category, {
        count: existing.count + 1,
        totalPrice: existing.totalPrice + (product.price || 0),
      });
    });

    const categories = Array.from(categoryMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        averagePrice: data.totalPrice / data.count,
      }))
      .sort((a, b) => b.count - a.count);

    // Top rated products (rating >= 4.5)
    const topRatedProducts = products
      .filter((product) => (product.rating || 0) >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);

    // Low stock products (stock < 20)
    const lowStockProducts = products
      .filter((product) => (product.stock || 0) < 20)
      .sort((a, b) => (a.stock || 0) - (b.stock || 0))
      .slice(0, 5);

    return {
      totalProducts,
      averagePrice: Math.round(averagePrice * 100) / 100,
      averageRating: Math.round(averageRating * 100) / 100,
      totalStock,
      categories,
      topRatedProducts,
      lowStockProducts,
    };
  } catch (error) {
    throw new Error("Failed to generate product insights");
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      `${DUMMYJSON_BASE_URL}/products/category-list`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
}
