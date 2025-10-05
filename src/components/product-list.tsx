"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Product, ProductFilters } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useInfiniteProducts } from "@/lib/hooks";
import { Eye, Star, Package, TrendingUp } from "lucide-react";
import Image from "next/image";

interface Props {
  filters: ProductFilters;
}

function useIntersectionObserver(
  callback: () => void,
  hasNextPage: boolean,
  isFetchingNextPage: boolean
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !hasNextPage || isFetchingNextPage) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          callback();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    observerRef.current.observe(element);

    // eslint-disable-next-line consistent-return
    return () => {
      const observer = observerRef.current;
      if (observer) {
        observer.disconnect();
      }
    };
  }, [callback, hasNextPage, isFetchingNextPage]);

  return elementRef;
}

export const ProductList = ({ filters }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts(filters);

  const products = data?.pages.flatMap((page) => page.products) || [];
  const totalProducts = data?.pages[0]?.total || 0;

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const observerRef = useIntersectionObserver(loadMore, !!hasNextPage, isFetchingNextPage);

  const getStockVariant = (stock: number) => {
    if (stock < 20) return "destructive";
    if (stock < 50) return "secondary";
    return "default";
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-red-500 mb-2">Failed to load products</div>
            <p className="text-sm text-muted-foreground">
              Please try refreshing the page or check your connection.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Products</CardTitle>
            <Badge variant="outline" className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Live Data</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-3 w-[150px]" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[80px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[60px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[40px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[50px] rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-[60px]" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-lg font-medium mb-2">No products found</div>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see more products.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Products ({products.length} of {totalProducts})</CardTitle>
            <Badge variant="outline" className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Live Data</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="rounded-md object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">
                            {product.title}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {product.description.substring(0, 50)}
                            ...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.brand}
                    </TableCell>
                    <TableCell className="font-mono">
                      ${product.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStockVariant(product.stock)}>
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Infinite scroll loading indicator */}
          <div className="min-h-[60px] flex items-center justify-center">
            {hasNextPage ? (
              <div ref={observerRef} className="w-full">
                {isFetchingNextPage ? (
                  <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                    <span className="text-sm text-muted-foreground">Loading more products...</span>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="text-sm"
                    >
                      Load More Products
                    </Button>
                  </div>
                )}
              </div>
            ) : products.length > 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                All products loaded ({products.length} of {totalProducts})
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="flex space-x-6">
                <Image
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedProduct.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedProduct.brand}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {selectedProduct.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / 5.0
                      </span>
                    </div>
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-mono text-xl font-bold">
                        ${selectedProduct.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stock:</span>
                      <Badge variant={getStockVariant(selectedProduct.stock)}>
                        {selectedProduct.stock} units
                      </Badge>
                    </div>
                    {selectedProduct.discountPercentage > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount:</span>
                        <Badge variant="secondary">
                          {selectedProduct.discountPercentage}% off
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div>
                  <h4 className="font-semibold mb-3">Additional Images</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduct.images.slice(1, 4).map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${selectedProduct.title} ${index + 2}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
