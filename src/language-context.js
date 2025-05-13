import React from "react";
import En from "./pictures/gb.png";
import Fi from "./pictures/fi.png";

export const languages = {
  en: {
    name: "en",
    flag: En,
    pages: {
      mathGame: {
        link: "Math Game",
        title: "Math Game!",
        ready: "Ready?",
        start: "Start!",
        equation: {
          timeLeft: "Time left",
          timeEnded: "Time ended!",
          correct: "Correct!",
          incorrect: "Wrong!",
        },
        successMessage: "YOU DID IT!!!",
        yourResults: "Your results",
        startOver: "Start over.",
      },
      nasaAPI: {
        link: "NASA API",
        title: "NASA API!",
        solInputLabel: "Insert sol please (a value between 0 - 4099): ",
        cameraSelectLabel: "Select camera please: ",
        getImagesButtonText: "Get images from NASA.",
        tooBigNumber: "Too big number!",
        noPicturesFound:
          "No pictures found. Try again with a different sol or different camera.",
      },
      dataBase: {
        link: "Database",
        title: "Database!",
        selectTable: "Select table!",
        noData: "no data",
      },
      links: {
        link: "Links",
        title: "Links:",
      },
      backEnd: {
        noConnection: "No connection!",
      },
    },
  },
  fi: {
    name: "fi",
    flag: Fi,
    pages: {
      mathGame: {
        link: "Matikkapeli",
        title: "Matikkapeli!",
        ready: "Oletko valmis?",
        start: "Aloita!",
        equation: {
          timeLeft: "Aikaa jäljellä",
          timeEnded: "Aika loppui!",
          correct: "Oikein!",
          incorrect: "Väärin!",
        },
        successMessage: "KAIKKI OIKEIN!!!",
        yourResults: "Tuloksesi",
        startOver: "Aloita alusta.",
      },
      nasaAPI: {
        link: "NASA API",
        title: "NASA API!",
        solInputLabel: "Syötä sol kiitos (luku väliltä 0 - 4099): ",
        cameraSelectLabel: "Valitse kamera kiitos: ",
        getImagesButtonText: "Hae kuvat NASAlta.",
        tooBigNumber: "Liian suuri luku!",
        noPicturesFound:
          "Valitettavasti kuvia ei löytynyt. Kokeile toista solia tai toista kameraa.",
      },
      dataBase: {
        link: "Tietokanta",
        title: "Tietokanta!",
        selectTable: "Valitse taulukko!",
        noData: "ei dataa",
      },
      links: {
        link: "Linkit",
        title: "Linkit:",
      },
      backEnd: {
        noConnection: "Yhteyttä ei ole!",
      },
    },
  },
};

export const LanguageContext = React.createContext(languages);
