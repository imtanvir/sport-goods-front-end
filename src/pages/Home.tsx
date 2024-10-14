import Category from "../ui/home/Category";
import FeaturedProduct from "../ui/home/FeaturedProduct";
import Form from "../ui/home/Form";
import Slider from "../ui/home/Slider";

import "./Home.css";

const Home = () => {
  return (
    <>
      <Slider />
      <FeaturedProduct />
      <Category />
      <Form />
    </>
  );
};

export default Home;
