import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "../pages/AboutUs";
import AllProducts from "../pages/AllProducts";
import CheckoutPage from "../pages/CheckoutPage";
import Home from "../pages/Home";
import OrderSuccess from "../pages/OrderSuccess";
import ProductManagement from "../pages/ProductManagement";
import SingleProduct from "../pages/SingleProduct";
import BillingProceed from "./../pages/BillingProceed";
import _404 from "./../pages/_404";

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
        path: "/checkout/",
        element: <CheckoutPage />,
      },
      {
        path: "/all-products/:category",
        element: <AllProducts />,
      },
      {
        path: "/single-product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/manage-products",
        element: <ProductManagement />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/billing",
        element: <BillingProceed />,
      },
      {
        path: "/place-success",
        element: <OrderSuccess />,
      },
      {
        path: "*",
        element: <_404 />,
      },
    ],
  },
]);

export default router;
