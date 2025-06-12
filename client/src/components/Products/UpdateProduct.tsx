import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  updateProductSchema,
  type UpdateProductSchema,
} from "@/schemas/product.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function UpdateProduct() {
  const { productId } = useParams<{ productId: string }>();
  const { updateProduct, product, updateProductStore } = useProductStore();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product
      ? {
          name: product.name,
          company: product.company,
          isFeatured: product.isFeatured || false,
          rating: product.rating,
          price: product.price,
        }
      : undefined,
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        company: product.company,
        isFeatured: product.isFeatured || false,
        rating: product.rating,
        price: product.price,
      });
    }
  }, [product, form]);

  const onSubmit = (data: UpdateProductSchema) => {
    if (!productId || !product?._id) return;

    try {
      updateProduct(data, product?._id || productId);
      updateProductStore(null);
      toast.success("Product updated successfully");
      navigate("/products");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Product
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel>Featured</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (0-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="e.g. 4.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="e.g. 99.99"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateProduct;
