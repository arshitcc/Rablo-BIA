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

const getAllProducts = (page: string) => {
  return apiClient.get(`/products?page=${page}&offset=10`);
};

const getFeaturedProducts = (page: string) => {
  return apiClient.get(`/products/featured?page=${page}&offset=10`);
};

const getProductsByPrice = (page: string, maxPrice: number) => {
  return apiClient.get(
    `/products/price?page=${page}&offset=10&maxPrice=${maxPrice}`
  );
};

const getProductsByRating = (page: string, rating: number) => {
  return apiClient.get(
    `/products/rating?page=${page}&offset=10&rating=${rating}`
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
