import { Response } from "express";
import { IProduct, Product } from "../models/product.models";
import { CustomRequest } from "../models/user.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import asyncHandler from "../utils/async-handler";

const addProduct = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { name, price, isFeatured, rating, company } = req.body;
  const product = await Product.create({
    name,
    price,
    company,
    isFeatured,
    rating,
  });

  if (!product) {
    throw new ApiError(400, "Failed to Create product");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, true, "Product Addedd Successfully", product));
});

const updateProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { productId } = req.params;
    const { name, price, isFeatured, rating, company } = req.body;
    let toBeUpdated = {};

    if (name) toBeUpdated = { ...toBeUpdated, name };
    if (price) toBeUpdated = { ...toBeUpdated, price };
    if (isFeatured) toBeUpdated = { ...toBeUpdated, isFeatured };
    if (rating) toBeUpdated = { ...toBeUpdated, rating };
    if (company) toBeUpdated = { ...toBeUpdated, company };

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: toBeUpdated },
      { new: true },
    );

    if (!product) {
      throw new ApiError(400, "Failed to Update product");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, true, "Product Updated Successfully", product),
      );
  },
);

const deleteProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new ApiError(400, "Failed to Delete product");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, true, "Product Deleted Successfully"));
  },
);

const getAllProducts = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { page, offset, isFeatured, maxPrice, rating } = req.query;
    
    let toBeFinded = {}

    if (isFeatured) toBeFinded = { ...toBeFinded, isFeatured : Boolean(isFeatured) };
    if (maxPrice) toBeFinded = { ...toBeFinded, price : { $lte : Number(maxPrice)} };
    if (rating) toBeFinded = { ...toBeFinded, rating : { $gte : Number(rating)} };

    const products = await Product.find(toBeFinded)
      .sort({ rating: -1, updatedAt: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(offset))
      .limit(Number(offset));

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Products fetched successfully", products),
      );
  },
);

const getFeaturedProducts = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { page, offset } = req.query;

    const products = await Product.find({ isFeatured: true })
      .sort({ rating: -1, updatedAt: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(offset))
      .limit(Number(offset));

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Products fetched successfully", products),
      );
  },
);

const getProductsByPrice = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { page, offset, maxPrice } = req.query;

    const products = await Product.find({ price: { $lte: maxPrice } })
      .sort({ rating: -1, updatedAt: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(offset))
      .limit(Number(offset));

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Products fetched successfully", products),
      );
  },
);

const getProductsByRating = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { page, offset, rating } = req.query;

    const products = await Product.find({ rating: { $gte: rating } })
      .sort({ rating: -1, updatedAt: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(offset))
      .limit(Number(offset));

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Products fetched successfully", products),
      );
  },
);

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating,
};
