import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Play from "../../pictures/Play-Icon.png";
import Pause from "../../pictures/Pause.png";

function CuriosityMiniSlider({ nasaPictures }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused) {
      let timeOut = setTimeout(() => {
        currentImage === nasaPictures.length - 1
          ? setCurrentImage(0)
          : setCurrentImage(currentImage + 1);
      }, 1000);
      return () => clearTimeout(timeOut);
    }
  });

  const pause = () => (paused ? setPaused(false) : setPaused(true));

  return (
    <div className="relative">
      <img
        className="w-full"
        src={nasaPictures[currentImage].img_src}
        alt={`curiosity-${currentImage}`}
      />
      <button className="right-2/4 bottom-0 absolute" onClick={pause}>
        {paused ? (
          <img
            className="w-6 tablet:w-8 lg:w-12"
            src={Play}
            alt="play-slider-button"
          />
        ) : (
          <img
            className="w-6 tablet:w-8 lg:w-12"
            src={Pause}
            alt="pause-slider-button"
          />
        )}
      </button>
    </div>
  );
}

CuriosityMiniSlider.propTypes = {
  nasaPictures: PropTypes.array.isRequired,
};

export default CuriosityMiniSlider;
