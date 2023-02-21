import React, { useState } from "react";
import { LanguageContext } from "../language-context";

function NasaAPI() {
  const [nasaPictures, setNasaPictures] = useState([]);

  const getImages = () => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=56&api_key=oe6EW1xJH9VdPM26LRV6fwrAMEedCQxcI53robyv`
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
  };

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.nasaAPI.title}</h1>
          <button onClick={getImages}>Get images from NASA.</button>
          {nasaPictures.map((picture, i) => (
            <img src={picture.img_src} alt={`nasa-${i}`} />
          ))}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default NasaAPI;
