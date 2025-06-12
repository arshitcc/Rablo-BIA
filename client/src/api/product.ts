import { apiClient } from "@/lib/axios";
import type {
  AddProductSchema,
  UpdateProductSchema,
} from "@/schemas/product.schema";

const addProduct = (data: AddProductSchema) => {
  return apiClient.post("/products", data);
};

const updateProduct = (data: UpdateProductSchema, productId: string) => {
  return apiClient.put(`/products/${productId}`, data);
};

const deleteProduct = (productId: string) => {
  return apiClient.delete(`/products/${productId}`);
};

const getAllProducts = (
  page: string,
  data?: { isFeatured?: string; maxPrice?: number; rating?: number }
) => {
  const url = new URLSearchParams();

  url.append("page", page);
  url.append("offset", "12");

  if (data?.isFeatured) {
    url.append("isFeatured", data.isFeatured.toString());
  }

 
  if (typeof data?.maxPrice === "number") {
    url.append("maxPrice", data.maxPrice.toString());
  }

  if (data?.rating) {
    url.append("rating", data.rating.toString());
  }

  return apiClient.get(`/products?${url.toString()}`);
};

const getFeaturedProducts = (page: string) => {
  return apiClient.get(`/products/featured?page=${page}&offset=12`);
};

const getProductsByPrice = (page: string, maxPrice: number) => {
  return apiClient.get(
    `/products/price?page=${page}&offset=12&maxPrice=${maxPrice}`
  );
};

const getProductsByRating = (page: string, rating: number) => {
  return apiClient.get(
    `/products/rating?page=${page}&offset=12&rating=${rating}`
  );
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating,
};
