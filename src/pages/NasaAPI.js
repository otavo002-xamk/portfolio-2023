import React, { useState } from "react";
import { LanguageContext } from "../language-context";

function NasaAPI() {
  const [nasaPictures, setNasaPictures] = useState([]);
  const [sol, setSol] = useState("");
  const [tooBigNumber, setTooBigNumber] = useState(false);

  const getImages = (sol) => {
    if (sol < 3496) {
      fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=oe6EW1xJH9VdPM26LRV6fwrAMEedCQxcI53robyv`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let i = 0;
          let images = [];

          data.photos.forEach((element) => {
            while (i < 5) {
              images.push(element);
              i++;
            }

            setNasaPictures(images);
          });
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
          <label htmlFor="nasa-input">Insert sol please:</label>

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

          {nasaPictures.map((picture, i) => (
            <img src={picture.img_src} alt={`nasa-${i}`} />
          ))}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default NasaAPI;
