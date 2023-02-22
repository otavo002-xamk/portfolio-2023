import React, { useState } from "react";
import { LanguageContext } from "../language-context";
import CuriosityMiniSlider from "./childcomponents/CuriosityMiniSlider";

function NasaAPI() {
  const [nasaPictures, setNasaPictures] = useState([]);
  const [sol, setSol] = useState("");
  const [tooBigNumber, setTooBigNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noPictures, setNoPictures] = useState(false);

  const getImages = (sol) => {
    let images = [];
    setNoPictures(false);

    if (sol < 3496) {
      setLoading(true);
      fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=oe6EW1xJH9VdPM26LRV6fwrAMEedCQxcI53robyv`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.photos.forEach((element, index) => {
            index < 400 && images.push(element);
          });

          setNasaPictures(images);
        })
        .then(() => {
          setLoading(false);
          images.length === 0 && setNoPictures(true);
          console.log(images.length);
        });
      tooBigNumber && setTooBigNumber(false);
    } else {
      setTooBigNumber(true);
    }
  };

  const handleChange = (e) => {
    setSol(e.target.value);
  };

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.nasaAPI.title}</h1>
          <br />
          <label htmlFor="nasa-input">Insert sol please: </label>

          <input
            value={sol}
            onChange={handleChange}
            id="nasa-input"
            type="text"
            placeholder="122"
          />

          <button onClick={() => getImages(sol)}>Get images from NASA.</button>
          <br />
          {tooBigNumber && <p>Too big number!</p>}
          {loading && <p>...loading</p>}
          {noPictures && (
            <p>
              No pictures found with a given sol. Try again with a different
              sol.
            </p>
          )}

          <br />

          {nasaPictures.length !== 0 && (
            <CuriosityMiniSlider nasaPictures={nasaPictures} />
          )}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default NasaAPI;
