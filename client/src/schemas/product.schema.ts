import z from "zod";

export const addProductSchema = z.object({
  name: z.string().min(4),
  price: z.number(),
  isFeatured: z.boolean(),
  rating: z.number().min(0).max(5),
  company: z.string().min(4),
});

export const updateProductSchema = z.object({
  name: z.string().min(4).optional(),
  price: z.number().optional(),
  isFeatured: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  company: z.string().min(4).optional(),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
