import React, { useEffect } from "react";
import slide1 from "../../assets/slider/teddy-slider1.png";
import slide2 from "../../assets/slider/teddy-slider2.jpg";
import Carousel from "nuka-carousel";

const MainSlider = () => {
  const slides = [slide1, slide2];

  useEffect(() => {
    let nextBtn = document.querySelector('[aria-label="next"]');
    let prevBtn = document.querySelector('[aria-label="previous"]');
    nextBtn.innerHTML = '<span class="material-icons-outlined">east</span>';
    prevBtn.innerHTML = '<span class="material-icons-outlined">west</span>';
  }, []);

  return (
    <Carousel wrapAround={true} autoplay withoutControls={false}>
      {slides.map((slide, index) => (
        <div className="slider" style={{ maxHeight: "584px" }} key={index}>
          <img src={slide} width="100%" />
        </div>
      ))}
    </Carousel>
  );
};

export default MainSlider;
