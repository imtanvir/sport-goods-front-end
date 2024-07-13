import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

const Category = () => {
  const [selectCategory, setSelectCategory] = useState("");
  console.log(selectCategory);
  return (
    <div className="py-20 bg-slate-50">
      <div className="container">
        <h1 className=" text-4xl leading-16">Category</h1>
        <p className=" text-xl">Best category for you</p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols gap-3 py-5">
          <Link
            onClick={() => setSelectCategory("football")}
            to={"/all-products#football"}
          >
            <Card className="shadow-md duration-500 hover:scale-105 hover:shadow-xl">
              <CardHeader className=" bg-[#EBEEF3] mb-5">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#262626] to-[#B8C2CE] uppercase">
                  football
                </h1>
              </CardHeader>
              <CardContent>
                <img
                  className=" rounded-md md:h-[290px] h-full w-full"
                  src="/src/assets/category/football.png"
                />
              </CardContent>
            </Card>
          </Link>
          <Link
            onClick={() => setSelectCategory("basketball")}
            to={"/all-products"}
          >
            <Card className="shadow-md duration-500 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <img
                  className=" rounded-md md:h-[240px] h-full w-full"
                  src="/src/assets/category/basketball.png"
                />
              </CardHeader>
              <CardContent className=" bg-[#EBEEF3] mb-5">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#262626] to-[#B8C2CE] uppercase">
                  basket ball
                </h1>
              </CardContent>
            </Card>
          </Link>
          <Link onClick={() => setSelectCategory("cycle")} to={"/all-products"}>
            <Card className="shadow-md duration-500 hover:scale-105 hover:shadow-xl">
              <CardHeader className=" bg-[#EBEEF3] mb-5">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#262626] to-[#B8C2CE] uppercase">
                  sport cycle
                </h1>
              </CardHeader>
              <CardContent>
                <img
                  className=" rounded-md md:h-[240px] h-full w-full"
                  src="/src/assets/category/cycle.jpg"
                />
              </CardContent>
            </Card>
          </Link>
          <Link
            onClick={() => setSelectCategory("table tennis")}
            to={"/all-products"}
          >
            <Card className="shadow-md duration-500 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <img
                  className=" rounded-md md:h-[240px] h-full w-full"
                  src="/src/assets/category/table_tennis.png"
                />
              </CardHeader>
              <CardContent className=" bg-[#EBEEF3] mb-5">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#262626] to-[#B8C2CE] uppercase">
                  table tennis
                </h1>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
