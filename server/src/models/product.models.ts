import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  isFeatured: boolean;
  rating: number;
  company: string;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
