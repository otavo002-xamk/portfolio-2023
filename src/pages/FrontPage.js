import React, { useEffect, useState } from "react";
import { LanguageContext } from "../language-context";
import { ReactAnySliderDots as Dots } from "react-any-slider-dots";
import "react-any-slider-dots/dist/dots.css";

const a = require("../slides/a.jpg");
const b = require("../slides/b.jpg");
const c = require("../slides/c.jpg");
const d = require("../slides/d.jpg");
const e = require("../slides/e.jpg");
const f = require("../slides/f.jpg");
const g = require("../slides/g.jpg");
const h = require("../slides/h.jpg");

function FrontPage() {
  const slides = [a, b, c, d, e, f, g, h];
  const [currentSlide, setCurrentSlide] = useState(slides[0]);
  const currentIndex = slides.indexOf(currentSlide);

  useEffect(() => {
    let timeOut = setTimeout(() => changeSlide(null), 5000);
    return () => clearTimeout(timeOut);
  });

  const changeSlide = (index, direction = 1) =>
    index ? setCurrentSlide(slides[index]) : openNextSlide(direction);

  const openNextSlide = (direction) => {
    let nextSlide = slides[slides.indexOf(currentSlide) + direction];

    if (nextSlide === slides[-1])
      direction === 1 ? setCurrentSlide(slides[0]) : setCurrentSlide(slides[7]);
    else setCurrentSlide(nextSlide);
  };

  const handleClick = (event) => changeSlide(event.target.id.slice(9, 10));

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <>
          <div className="relative">
            <button
              data-testid="slider-prev-button"
              className="h-10 w-6 tablet:h-16 tablet:w-10 left-0 top-2/4 text-red-600 text-xl tablet:text-4xl hover:bg-black duration-300 rounded-sm absolute"
              onClick={() => changeSlide(null, -1)}
            >
              &#10094;
            </button>
            <button
              data-testid="slider-next-button"
              className="h-10 w-6 tablet:h-16 tablet:w-10 right-0 top-2/4 text-red-600  text-xl tablet:text-4xl hover:bg-black duration-300 rounded-sm absolute"
              onClick={() => changeSlide(null)}
            >
              &#10095;
            </button>
            <img src={currentSlide} alt={`slideshow-${currentIndex}`} />
          </div>
          <div className="relative hidden tablet:block">
            <Dots
              dotGap={12}
              dotSize={12}
              dotsCount={slides.length}
              activeIndex={currentIndex}
              visibleDotsCount={slides.length}
              handleClick={handleClick}
            />
          </div>
          <p className="dark:text-white">{language.pages.frontPage.content}</p>
        </>
      )}
    </LanguageContext.Consumer>
  );
}

export default FrontPage;
