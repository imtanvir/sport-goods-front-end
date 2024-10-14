import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { TProduct } from "../../utils/interface";
import Card from "./Card";

const FeaturedProduct = () => {
  const { data } = useGetProductsQuery(undefined);

  return (
    <div className="py-20 container">
      <div className="text-left p-10">
        <h1 className="text-4xl mb-4 text-[#111111]">Featured Product</h1>
        <h3 className="text-xl">Your best sports kit</h3>
      </div>
      {/* Grid Section */}
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-10"
      >
        {data?.data?.length > 0 &&
          data?.data

            .slice(0, 8)
            .map((product: TProduct) => (
              <Card isReadOnly={true} key={product._id} product={product} />
            ))}
      </section>
      {data?.data?.length === 0 && (
        <div className="flex justify-center py-12">
          <h1 className="md:text-4xl text-xl text-center whitespace-nowrap">
            No Products found with these filters!
          </h1>
        </div>
      )}

      {/* See More Button */}
      <div
        className={` ${
          data?.data?.length === 0 ? "hidden" : ""
        } flex justify-center pt-5`}
      >
        <Link to="/all-products/all">
          <Button>See more</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProduct;
