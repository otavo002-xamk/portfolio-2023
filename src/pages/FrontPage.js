import React, { useState } from "react";
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

  setTimeout(
    () =>
      currentSlide === slides[7]
        ? setCurrentSlide(slides[0])
        : setCurrentSlide(slides[slides.indexOf(currentSlide) + 1]),
    5000
  );

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <img src={currentSlide} />
          <p className="dark:text-white">{language.pages.frontPage.content}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default FrontPage;
