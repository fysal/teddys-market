import React from 'react'
import Slider from '../components/slider/MainSlider';
import Products from '../components/Products';
import GiftStrip from '../components/GiftStrip';
import BestFoodComponent from '../components/BestFood.component';
import BlogComponent from '../components/Blog.component';
import NewsLetter from '../components/NewsLetter.component';


const Home = () => {
  return (
    <> 
    <Slider/>
    <Products />
    <GiftStrip />
    <BestFoodComponent />
    <BlogComponent />
    <NewsLetter />
    </>
   
  )
}

export default Home