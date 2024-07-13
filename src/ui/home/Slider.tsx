import { Card, CardContent } from "../../components/ui/card";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

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
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="border-none">
                <CardContent className="flex items-center justify-center h-[80vh] bg-black p-0">
                  <img
                    src={slider?.image}
                    className="h-full bg-black w-full object-cover transition-transform duration-500 hover:scale-105"
                    alt=""
                  />
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
