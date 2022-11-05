import React from 'react';
import { memo, useEffect, useState } from "react";
import banner1 from "./hero/hero-1.jpg";
import banner2 from "./hero/hero-2.jpg";

import "./slides.scss";

function Slides() {
  const slides = [banner1, banner2];
  const [slideIndex, setSlideIndex] = useState(0);

  const timeOut = 5000

  const nextSlide = () => {
    // dataLength = 4
    //activeSlide : 0,1,2,3
    const index = slideIndex + 1 === slides.length ? 0 : slideIndex + 1
    setSlideIndex(index)
  };
  useEffect(() => {
    const slideAuto = setInterval(() => {
      nextSlide()
    }, timeOut);

    return () => {
      clearInterval(slideAuto)
    }
  })

  return (
    <div className="slides">
      <img src={slides[slideIndex]} alt="slides" />

      <div className="slides_control">
        {
          slides.map((slide, index) => (
            <div
              key={index}
              className={`circle ${slideIndex === index ? 'circle_active' : ''}`}
              onClick={() => setSlideIndex(index)}
            />
          ))
        }
      </div>
    </div>
  );
}

export default memo(Slides);