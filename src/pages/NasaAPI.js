import React, { useState } from "react";
import { LanguageContext } from "../language-context";
import CuriosityMiniSlider from "./childcomponents/CuriosityMiniSlider";
import { cameraNames } from "./additions/cameraNames";

function NasaAPI() {
  const [nasaPictures, setNasaPictures] = useState([]);
  const [sol, setSol] = useState("");
  const [camera, setCamera] = useState("FHAZ");
  const [tooBigNumber, setTooBigNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noPictures, setNoPictures] = useState(false);

  const getImages = (sol, camera) => {
    let images = [];
    setNoPictures(false);

    if (sol < 3496) {
      setLoading(true);

      fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=oe6EW1xJH9VdPM26LRV6fwrAMEedCQxcI53robyv`
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
        });
      tooBigNumber && setTooBigNumber(false);
    } else {
      setTooBigNumber(true);
    }
  };

  const handleChange = (e) => setSol(e.target.value);
  const changeCamera = (e) => setCamera(e.target.value);

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.nasaAPI.title}</h1>
          <br />
          <label htmlFor="sol-input">
            {language.pages.nasaAPI.solInputLabel}
          </label>

          <input
            className="dark:bg-slate-800"
            value={sol}
            onChange={handleChange}
            id="sol-input"
            type="text"
            placeholder="122"
          />

          <br />
          <br />

          <label htmlFor="camera-select">
            {language.pages.nasaAPI.cameraSelectLabel}
          </label>

          <select
            className="max-w-full dark:bg-slate-800"
            id="camera-select"
            onChange={changeCamera}
          >
            {cameraNames.map((cameraName) => (
              <option key={cameraName.Name} value={cameraName.abbreviation}>
                {cameraName.Name}
              </option>
            ))}
          </select>

          <br />
          <br />

          <button
            className="p-2  border-2 border-black rounded-lg bg-rose-200 shadow shadow-black dark:border-stone-500 dark:bg-stone-800 dark:shadow-white"
            onClick={() => getImages(sol, camera)}
          >
            {language.pages.nasaAPI.getImagesButtonText}
          </button>

          <br />
          <br />

          {tooBigNumber && <p>{language.pages.nasaAPI.tooBigNumber}</p>}

          {loading && (
            <div
              data-testid="nasa-api-loader"
              className="m-auto animate-spin h-8 w-8 border-4 rounded-full border-t-rose-900 border-r-rose-700 border-b-rose-500 border-l-rose-300"
            />
          )}

          {noPictures && <p>{language.pages.nasaAPI.noPicturesFound}</p>}

          {nasaPictures.length !== 0 && !loading && (
            <CuriosityMiniSlider nasaPictures={nasaPictures} />
          )}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default NasaAPI;
