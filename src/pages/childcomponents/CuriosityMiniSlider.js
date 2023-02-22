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
    <div style={{ height: 1000 }} className="relative bg-black">
      {nasaPictures.length > 0 && (
        <>
          <img
            className="w-full my-20 absolute"
            src={nasaPictures[currentImage].img_src}
            alt={`curiosity-${currentImage}`}
          />
          <button className="right-2/4 bottom-0 absolute" onClick={pause}>
            {paused ? (
              <img className="w-12" src={Play} alt="play-slider" />
            ) : (
              <img className="w-12" src={Pause} alt="pause-slider" />
            )}
          </button>
        </>
      )}
    </div>
  );
}

CuriosityMiniSlider.propTypes = {
  nasaPictures: PropTypes.array.isRequired,
};

export default CuriosityMiniSlider;
