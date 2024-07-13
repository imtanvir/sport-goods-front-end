import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaCartPlus, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
const Card = () => {
  const [rating, setRating] = useState(3.5);
  const [addToCart, setAddToCart] = useState(false);
  return (
    <>
      {/* <!-- Product card - Starts Here --> */}
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Link to={"/"}>
          <img
            src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Product"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
        </Link>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <Link to={"/"}>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Product Name
            </p>
            <p className="text-gray-400 text-sm font-semibold">
              Category:<span className="font-normal">{" " + `Football`}</span>
            </p>
          </Link>
          <div className="flex gap-3">
            {/* @ts-expect-error there is a version miss-match in the source */}
            <Rating
              emptySymbol={<CiStar className="text-[#111111] text-lg" />}
              fullSymbol={<FaStar className="text-[#f59e0b] text-lg" />}
              initialRating={rating}
              start={0}
              stop={5}
              step={1}
              fractions={2}
              onChange={(rating) => setRating(rating)}
              readonly
            />
            <p className="font-semibold">
              {rating !== 5 && rating === Math.floor(rating)
                ? rating.toString() + ".0"
                : rating}
            </p>
            <p className="">{"10 in stock"}</p>
          </div>
          <p>Lorem ipsum dolor sit amet.</p>
          <div className="flex items-center pt-1">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <div className="ml-auto flex gap-1">
              <Link to={"/"}>
                <Button className=" bg-slate-700 hover:bg-[#111111]">
                  View Details
                </Button>
              </Link>
              <Button className=" bg-transparent hover:bg-transparent text-center">
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
