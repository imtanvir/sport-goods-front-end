import Card from "./Card";

const FeaturedProduct = () => {
  return (
    <div className="py-20 container">
      <div className=" text-left p-10">
        <h1 className=" text-4xl mb-4 text-[#111111]">Featured Product</h1>
        <h3 className="text-xl">Your best sports kit </h3>
      </div>

      {/* <!-- Grid Section - Starts Here  --> */}
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-14"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} />
        ))}
      </section>

      {/* <!-- Grid Section - Ends Here --> */}
    </div>
  );
};

export default FeaturedProduct;
