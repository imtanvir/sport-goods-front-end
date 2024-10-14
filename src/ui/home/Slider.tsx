import { Card, CardContent } from "../../components/ui/card";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import baseball from "/src/assets/slider/baseball.jpg";
import basketball from "/src/assets/slider/basketball.jpg";
import bat from "/src/assets/slider/bat.jpg";
import cycle from "/src/assets/slider/cycle.jpg";
import shoe from "/src/assets/slider/shoe.jpg";

const Slider = () => {
  const sliderData = [
    {
      id: 1,
      image: shoe,
    },
    {
      id: 2,
      image: basketball,
    },
    {
      id: 3,
      image: baseball,
    },
    {
      id: 4,
      image: cycle,
    },
    {
      id: 5,
      image: bat,
    },
  ];

  return (
    <div className="relative w-full">
      <Carousel
        className=" overflow-hidden"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider, index) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="border-none">
                <CardContent className="flex relative items-center justify-center h-[80vh] bg-black p-0">
                  <div className="h-full w-full">
                    <h2 className="absolute z-10 md:text-6xl text-xl text-center font-bold text-slate-950 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 skew-x-[-10deg] py-4 md:px-8 px-2">
                      {index === 0
                        ? "🚚 Unlock Top Customer on Orders Over $500!"
                        : index === 1
                        ? "🎉 Enjoy 10% OFF Your Entire Purchase Today!"
                        : index === 2
                        ? "✨ Discover the Latest Trends in Our New Arrivals!"
                        : index === 3
                        ? "🚚 Experience Free Shipping on Orders Over $500!"
                        : index === 4
                        ? "🎉 Grab 10% OFF on All Orders – Limited Time Only!"
                        : "🚚 Don't Miss Out on Free Shipping on Orders Over $500!"}
                    </h2>

                    <img
                      src={slider?.image}
                      className="h-full bg-black w-full object-cover transition-transform duration-500 hover:scale-105"
                      alt=""
                    />
                    <Link
                      className="absolute z-10 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      to="/all-products"
                    >
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default Slider;
