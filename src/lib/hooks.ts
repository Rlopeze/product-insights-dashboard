"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProductFilters } from "@/types/product";
import {
  fetchProducts,
  fetchProductById,
  fetchProductInsights,
  fetchCategories,
} from "./actions";

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
}

export function useInfiniteProducts(filters?: ProductFilters) {
  const stableFilters = filters
    ? {
        search: filters.search || null,
        category: filters.category || null,
      }
    : null;

  return useInfiniteQuery({
    queryKey: ["products", "infinite", stableFilters],
    queryFn: ({ pageParam = { skip: 0, limit: 30 } }) =>
      fetchProducts(filters, pageParam),
    getNextPageParam: (lastPage) => {
      const { skip, limit, total } = lastPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? { skip: nextSkip, limit } : undefined;
    },
    initialPageParam: { skip: 0, limit: 30 },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

export function useProductInsights() {
  return useQuery({
    queryKey: ["insights"],
    queryFn: fetchProductInsights,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
