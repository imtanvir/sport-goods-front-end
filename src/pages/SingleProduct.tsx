import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  useGetProductsQuery,
  useUpdateSingleProductMutation,
} from "../redux/api/baseApi";
import { allCartData, setCartData } from "../redux/features/cart/cartSlice";
import {
  setProductsIs,
  TProductManagement,
} from "../redux/features/product/productsSlice";

const SingleProduct = () => {
  const { data, refetch } = useGetProductsQuery(undefined);
  const [product, setProduct] = useState<TProductManagement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [updateProduct] = useUpdateSingleProductMutation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const addToCartData = useAppSelector(allCartData);

  useEffect(() => {
    const isProductInCart = addToCartData.some(
      (item) => item.product._id === product?._id
    );
    setAddToCart(isProductInCart);
  }, [addToCartData, product?._id]);

  useEffect(() => {
    if (data?.data) {
      setProduct(
        data?.data.find((product: TProductManagement) => product._id === id) ||
          null
      );
      refetch();
    }
  }, [data, refetch]);
  useEffect(() => {
    if (product) {
      setBikeRating(product?.rating as number);
    }
  }, [product]);
  const handleAddToCart = (product: TProductManagement) => {
    // Check if the product is already in the cart
    const existingProductIndex = addToCartData.findIndex(
      (item) => item.product._id === product._id
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
      // Product already exists, update quantity and total
      updatedCart = addToCartData.map((item, index) =>
        index === existingProductIndex
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.product.price,
            }
          : item
      );
    } else {
      updatedCart = [
        ...addToCartData,
        { product, quantity: 1, total: product.price },
      ];
    }

    dispatch(
      setCartData({
        data: updatedCart,
      })
    );

    setAddToCart(true);
  };
  const [bikeRating, setBikeRating] = useState(product?.rating as number);

  const handleSubmit = async (newRating: number) => {
    const toastId = toast.loading("Product rating updating...");
    setIsProcessing(true);
    const submissionData = new FormData();
    const productDataUpdateIntoDb = {
      rating: newRating,
    };

    submissionData.append("data", JSON.stringify(productDataUpdateIntoDb));
    submissionData.append("_id", product?._id as string);

    const queryData = {
      id: product?._id,
      data: submissionData,
    };
    const response = await updateProduct(queryData);
    if (response?.data?.success === true) {
      const updatedProduct = data?.data?.map((product: TProductManagement) =>
        product._id === response?.data?.data?._id
          ? { ...product, ...response.data.data }
          : product
      );

      dispatch(setProductsIs({ data: updatedProduct }));
      refetch();
      toast.success("Product rated successfully", {
        id: toastId,
        duration: 2000,
        className: "bg-green-500 text-white border-green-400",
      });
      setIsProcessing(false);
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <section className="container mx-auto bg-gray-50 rounded-lg my-10">
      <div className="flex flex-col font-sans">
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <img
            src={product?.image?.[0]?.url}
            alt={product?.name as string}
            className="max-w-4/5 max-h-4/5 object-contain"
          />
        </div>
        <div className="flex-1 p-10 flex flex-col">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{product?.name}</h1>
            <p className="text-lg text-gray-500">by {product?.brand}</p>
          </div>
          <div className="flex items-center gap-2 mb-6">
            {/* @ts-expect-error there is a version miss-match in the source */}
            <Rating
              emptySymbol={
                <CiStar className="text-slate-900  text-lg md:text-2xl" />
              }
              fullSymbol={
                <FaStar className="text-[#f59e0b] text-lg md:text-2xl" />
              }
              initialRating={bikeRating}
              start={0}
              stop={5}
              step={1}
              fractions={2}
              onChange={(newRating: number) => {
                setBikeRating(newRating);
                handleSubmit(newRating);
              }}
              readonly={isProcessing}
              className="pt-2"
            />{" "}
            <span className="text-gray-600 text-lg">
              ({product?.rating ?? 0})
            </span>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Category: {product?.category}
          </p>
          <p className="text-lg leading-relaxed mb-6">{product?.description}</p>
          <div className="mt-auto">
            <p className="text-3xl font-bold text-slate-600 mb-2">
              ${product?.price as number}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {(product?.stock_quantity as number) > 0
                ? `In stock: ${product?.stock_quantity} `
                : "Out of stock"}
            </p>
            <button
              className="w-full flex items-center justify-center py-3 text-lg text-white bg-slate-950 rounded mb-3 hover:bg-slate-900"
              onClick={() => {
                setAddToCart(!addToCart);
                handleAddToCart(product as TProductManagement);
              }}
            >
              <FaShoppingCart
                className={`${addToCart ? "text-[#FB5733]" : ""} mr-2`}
              />{" "}
              {addToCart ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
