import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { TProduct } from "../../utils/interface";

const Category = () => {
  const navigate = useNavigate();
  const { data: products } = useGetProductsQuery(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryImages, setCategoryImages] = useState<{
    [key: string]: string;
  }>({});
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    if (products) {
      const uniqueCategories = new Set<string>();
      const categoryImageMap: { [key: string]: string } = {};

      products.data.forEach((product: TProduct) => {
        if (!uniqueCategories.has(product.category)) {
          uniqueCategories.add(product.category);
          categoryImageMap[product.category] = product.image?.[0]?.url || "";
        }
      });

      setCategories(Array.from(uniqueCategories));
      setCategoryImages(categoryImageMap);
    }
  }, [products]);

  useEffect(() => {
    if (selectCategory) {
      navigate(`/all-products/${selectCategory}`);
    }
  }, [selectCategory, navigate]);

  return (
    <div className="py-20 bg-slate-50">
      <div className="container">
        <h1 className="text-4xl leading-16">Category</h1>
        <p className="text-xl mb-8">Best category for you</p>

        {categories.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {categories.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link
                    to={`/all-products/${category}`}
                    onClick={() => setSelectCategory(category)}
                  >
                    <Card className="shadow-md duration-500 hover:scale-105 hover:shadow-xl h-full">
                      <CardHeader className="bg-[#EBEEF3] mb-5">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#262626] to-[#B8C2CE] uppercase">
                          {category}
                        </h2>
                      </CardHeader>
                      <CardContent className="flex justify-center items-center h-[200px]">
                        <img
                          className="rounded-md h-full object-cover"
                          src={categoryImages[category] || ""}
                          alt={category}
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className="text-center text-2xl mt-10">
            No products exist in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
