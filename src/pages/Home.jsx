import React from 'react'
import Slider from '../components/slider/MainSlider';
import Products from '../components/Products';
import GiftStrip from '../components/GiftStrip';
import BestFoodComponent from '../components/BestFood.component';
import BlogComponent from '../components/Blog.component';
import NewsLetter from '../components/NewsLetter.component';
import { ToastContainer } from 'react-toastify'
  import "react-toastify/dist/ReactToastify.css";

const Home = () => {
return (
  <>
    <Slider />
    <Products />
    <GiftStrip />
    <BestFoodComponent />
    <BlogComponent />
    <NewsLetter />
  </>
);
}

export default Home