import { useEffect, useContext } from "react";
import Slider from "../components/slider/MainSlider";
import Products from "../components/Products";
import GiftStrip from "../components/GiftStrip";
import BestFoodComponent from "../components/BestFood.component";
import BlogComponent from "../components/Blog.component";
import NewsLetter from "../components/NewsLetter.component";
import FloatingCart from "../components/FloatingCart.component";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Slider />
       <FloatingCart/>
      <Products />
      <GiftStrip />
      <BestFoodComponent />
      <BlogComponent />
      <NewsLetter />
    </>
  );
};

export default Home;

