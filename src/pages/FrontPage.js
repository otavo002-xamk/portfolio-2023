import React, { useEffect, useState } from "react";
import { LanguageContext } from "../language-context";
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

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <button onClick={() => changeSlide(null, -1)}>Prev!</button>
          <button onClick={() => changeSlide(null)}>Next!</button>
          <img src={currentSlide} alt="slideshow" />
          <p className="dark:text-white">{language.pages.frontPage.content}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default FrontPage;
