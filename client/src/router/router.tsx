import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import ProductsList from "@/pages/ProductsList";
import AuthLayout from "@/components/AuthLayout";
import AddProduct from "@/components/Products/AddProduct";
import UpdateProduct from "@/components/Products/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: (
          <AuthLayout authentication>
            <ProductsList />
          </AuthLayout>
        ),
      },
      {
        path : "/products/add",
        element : (
          <AuthLayout authentication>
            <AddProduct />
          </AuthLayout>
        )
      },
      {
        path: "/products/update/:productId",
        element: (
          <AuthLayout authentication>
            <UpdateProduct />
          </AuthLayout>
        ),  
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthLayout authentication={false}>
        <Auth />
      </AuthLayout>
    ),
  },
]);

export default router;
