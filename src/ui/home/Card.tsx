import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaCartPlus, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import Placeholder from "../../assets/product-placeholder.png";
import { Button } from "../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { allCartData, setCartData } from "../../redux/features/cart/cartSlice";
import { TProduct } from "../../utils/interface";
const Card = ({
  product,
  isReadOnly,
}: {
  product: TProduct;
  isReadOnly: boolean;
}) => {
  const { name, description, price, stock_quantity, category, brand, rating } =
    product;
  const [productRating, setProductRating] = useState(rating);
  const [addToCart, setAddToCart] = useState(false);
  const dispatch = useAppDispatch();
  const addToCartData = useAppSelector(allCartData);

  useEffect(() => {
    const isProductInCart = addToCartData.some(
      (item) => item.product._id === product._id
    );
    setAddToCart(isProductInCart);
  }, [addToCartData, product._id]);

  const handleAddToCart = (product: TProduct) => {
    const existingProductIndex = addToCartData.findIndex(
      (item) => item.product._id === product._id
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
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

  return (
    <>
      {/* <!-- Product card - Starts Here --> */}
      <div className=" bg-white shadow-md rounded-md">
        <div>
          <img
            src={
              product?.image && product?.image[0]?.url
                ? product?.image[0]?.url
                : Placeholder
            }
            alt={name}
            className="h-80 w-72 object-cover rounded-t-xl"
          />
        </div>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
          <div>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {name}
            </p>
            <p className="text-gray-400 text-sm font-semibold">
              <span className="font-normal">
                <Link to={`/all-products/${category}`}>{category}</Link>
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            {/* @ts-expect-error there is a version miss-match in the source */}
            <Rating
              emptySymbol={<CiStar className="text-[#111111] text-lg" />}
              fullSymbol={<FaStar className="text-[#f59e0b] text-lg" />}
              initialRating={productRating}
              start={0}
              stop={5}
              step={1}
              fractions={2}
              onChange={(productRating) => setProductRating(productRating)}
              readonly={isReadOnly}
            />
            <p className="font-semibold">
              {productRating !== 5 &&
              productRating === Math.floor(productRating)
                ? productRating.toString() + ".0"
                : productRating}
            </p>
            <p className="">{`${stock_quantity} in stock`}</p>
          </div>
          <p>{description.slice(0, 30 - 3) + "..."}</p>
          <div className="flex items-center pt-1">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${price}
            </p>
            <div className="ml-auto flex gap-1">
              <Link to={`/single-product/${product._id}`}>
                <Button className=" bg-slate-700 hover:bg-[#111111]">
                  View Details
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setAddToCart(!addToCart);
                  handleAddToCart(product);
                }}
                className=" bg-transparent hover:bg-transparent text-center"
              >
                <FaCartPlus
                  className={`text-2xl ${
                    addToCart ? "text-[#FB5733]" : "text-slate-500"
                  } hover:text-[#FB5733]`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Product card - Ends Here  --> */}
    </>
  );
};

export default Card;
