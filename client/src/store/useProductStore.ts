import { create } from "zustand";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { IProduct } from "@/types";
import type {
  AddProductSchema,
  UpdateProductSchema,
} from "@/schemas/product.schema";
import {
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  getAllProducts as apiGetAllProducts,
  getFeaturedProducts as apiGetFeaturedProducts,
  getProductsByPrice as apiGetProductsByPrice,
  getProductsByRating as apiGetProductsByRating,
} from "@/api/product";

interface ProductState {
  product: IProduct | null;
  error: string | null;
  products: IProduct[];
  addProduct: (data: AddProductSchema) => Promise<void>;
  updateProduct: (
    data: UpdateProductSchema,
    productId: string
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  getAllProducts: (
    page: string,
    data?: { isFeatured?: string; maxPrice?: number; rating?: number }
  ) => Promise<void>;
  getFeaturedProducts: (page: string) => Promise<void>;
  getProductsByPrice: (page: string, maxPrice: number) => Promise<void>;
  getProductsByRating: (page: string, rating: number) => Promise<void>;
  clearError: () => void;
  updateProductStore: (product: IProduct | null) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  product: null,
  products: [],
  error: null,
  clearError: () => set({ error: null }),

  addProduct: async (data) => {
    set({ error: null });
    try {
      const response = await apiAddProduct(data);
      if (response.data.success) {
        const newProduct: IProduct = response.data.data;
        set({ products: [...get().products, newProduct] });
        toast.success("Product added successfully");
      } else {
        const msg = response.data.message || "Failed to add product";
        set({ error: msg });
        toast.error(msg);
      }
    } catch (err: AxiosError | any) {
      const msg = err.response?.data?.message || "Add product error";
      set({ error: msg });
      toast.error(msg);
    }
  },

  updateProduct: async (data, productId) => {
    set({ error: null });
    try {
      const response = await apiUpdateProduct(data, productId);
      if (response.data.success) {
        toast.success("Product updated successfully");
      } else {
        const msg = response.data.message || "Failed to update product";
        set({ error: msg });
        toast.error(msg);
      }
    } catch (err: AxiosError | any) {
      const msg = err.response?.data?.message || "Update product error";
      set({ error: msg });
      toast.error(msg);
    }
  },

  deleteProduct: async (productId) => {
    set({ error: null });
    try {
      const response = await apiDeleteProduct(productId);
      if (response.data.success) {
        toast.success("Product deleted successfully");
      } else {
        const msg = response.data.message || "Failed to delete product";
        set({ error: msg });
        toast.error(msg);
      }
    } catch (err: AxiosError | any) {
      const msg = err.response?.data?.message || "Delete product error";
      set({ error: msg });
      toast.error(msg);
    }
  },

  getAllProducts: async (page, data) => {
    set({ error: null });
    try {
      const response = await apiGetAllProducts(page, data);
      if (response.data.success) {
        set({ products: response.data.data });
      } else {
        const msg = response.data.message || "Failed to fetch products";
        set({ error: msg });
        toast.error(msg);
      }
    } catch (err: AxiosError | any) {
      const msg = err.response?.data?.message || "Fetch products error";
      set({ error: msg });
      toast.error(msg);
    }
  },

  getFeaturedProducts: async (page) => {
    set({ error: null });
    try {
      const response = await apiGetFeaturedProducts(page);
      if (response.data.success) {
        set({ products: response.data.data });
      } else {
        const msg =
          response.data.message || "Failed to fetch featured products";
        set({ error: msg });
        toast.error(msg);
      }
    } catch (err: AxiosError | any) {
      const msg =
        err.response?.data?.message || "Fetch featured products error";
      set({ error: msg });
      toast.error(msg);
    }
  },

  getProductsByPrice: async (page, maxPrice) => {
    set({ error: null });
    try {
      const response = await apiGetProductsByPrice(page, maxPrice);
      if (response.data.success) {
        set({ products: response.data.data });
      } else {
        const msg =
          response.data.message || "Failed to fetch products by price";
        set({ error: msg });
        toast.error(msg);
      }
    } catch (err: AxiosError | any) {
      const msg =
        err.response?.data?.message || "Fetch products by price error";
      set({ error: msg });
      toast.error(msg);
    }
  },

  getProductsByRating: async (page, rating) => {
    set({ error: null });
    try {
      const response = await apiGetProductsByRating(page, rating);
      if (response.data.success) {
        set({ products: response.data.data });
      } else {
        const msg =
          response.data.message || "Failed to fetch products by rating";
        set({ error: msg });
        toast.error(msg);
      }
    } catch (err: AxiosError | any) {
      const msg =
        err.response?.data?.message || "Fetch products by rating error";
      set({ error: msg });
      toast.error(msg);
    }
  },

  updateProductStore: (data) => {
    if (!data) set({ product: null });
    else
      set((state) => ({
        product: { ...state.product, ...data },
      }));
  },
}));
