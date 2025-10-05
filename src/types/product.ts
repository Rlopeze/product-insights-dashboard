export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductInsights {
  totalProducts: number;
  averagePrice: number;
  averageRating: number;
  totalStock: number;
  categories: {
    name: string;
    count: number;
    averagePrice: number;
  }[];
  topRatedProducts: Product[];
  lowStockProducts: Product[];
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}
