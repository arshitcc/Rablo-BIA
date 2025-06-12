import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2Icon, StarIcon, TrashIcon } from "lucide-react";
import type { IProduct } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function ProductsList() {
  const {
    products,
    error,
    clearError,
    getAllProducts,
    deleteProduct,
    updateProductStore,
  } = useProductStore();

  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("1");

  const [isFeaturedFilter, setIsFeaturedFilter] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minRating, setMinRating] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      clearError();
      await getAllProducts(page);
      setLoading(false);
    };
    fetch();
  }, [getAllProducts, page]);

  const filtered = products.filter((p: IProduct) => {
    if (isFeaturedFilter) {
      const want = isFeaturedFilter === "true";
      if (p.isFeatured !== want) return false;
    }
    if (maxPrice) {
      const mp = Number(maxPrice);
      if (p.price > mp) return false;
    }
    if (minRating) {
      const mr = Number(minRating);
      if (p.rating < mr) return false;
    }
    return true;
  });

  const handleUpdateProduct = (productId: string) => {
    const product = products.find((p: IProduct) => p._id === productId);
    if (product) {
      updateProductStore(product);
      navigate(`/products/update/${productId}`);
    } else {
      toast.error(`Product not found with ID ${productId}`);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      await getAllProducts(page);
    } catch (err: any) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Products</h2>
          {user?.role === "admin" && (
            <Link to="/products/add">
              <Button>Add Product</Button>
            </Link>
          )}
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label htmlFor="featured-filter">Featured</Label>
            <Select
              value={isFeaturedFilter}
              onValueChange={(val) => setIsFeaturedFilter(val)}
            >
              <SelectTrigger id="featured-filter">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="true">Featured</SelectItem>
                <SelectItem value="false">Not Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="max-price">Max Price</Label>
            <Input
              id="max-price"
              type="number"
              placeholder="e.g. 100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="min-rating">Min Rating</Label>
            <Input
              id="min-rating"
              type="number"
              step="0.1"
              placeholder="e.g. 4"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsFeaturedFilter("");
                setMaxPrice("");
                setMinRating("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 flex justify-center items-center">
            <Loader2Icon className="animate-spin h-12 w-12" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Card key={p._id} className="shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    {p.isFeatured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Company: {p.company}</p>
                  <p className="mb-2">Price: ₹{p.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <span className="mr-1">Rating:</span>
                    <div className="flex items-center">
                      <StarIcon
                        className={`w-4 h-4 text-yellow-500 mr-1 ${
                          p.rating > 0 ? "fill-yellow-500" : ""
                        }`}
                      />
                      <span>{p.rating}</span>
                    </div>
                  </div>
                </CardContent>
                {user?.role === "admin" && (
                  <CardFooter className="flex space-x-2 h-full items-end">
                    <Button
                      onClick={() => handleUpdateProduct(p._id)}
                      size="sm"
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={"destructive"} size="sm">
                          <TrashIcon className="w-4 h-4 mr-1 " /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you want to delete this product?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => handleDelete(p._id)}
                          >
                            Yes
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center space-x-2">
          <Button
            variant="outline"
            disabled={page === "1"}
            onClick={() =>
              setPage((prev) => String(Math.max(1, Number(prev) - 1)))
            }
          >
            Previous
          </Button>
          <span className="px-3 py-1">Page {page}</span>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => String(Number(prev) + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
