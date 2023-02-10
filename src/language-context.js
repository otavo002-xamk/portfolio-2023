import React from "react";
import En from "./pictures/gb.png";
import Fi from "./pictures/fi.png";

export const languages = {
  en: {
    name: "en",
    flag: En,
    pages: {
      frontPage: {
        title: "Front Page!",
      },
      mathGame: {
        link: "Math Game",
        title: "Math Game!",
        successMessage: "YOU DID IT!!!",
        yourResults: "Your results",
        startOver: "Start over.",
      },
      sample2: {
        link: "Sample 2",
        title: "Sample 2!",
      },
      sample3: {
        link: "Sample 3",
        title: "Sample 3!",
      },
      sample4: {
        link: "Sample 4",
        title: "Sample 4!",
      },
    },
  },
  fi: {
    name: "fi",
    flag: Fi,
    pages: {
      frontPage: {
        title: "Etusivu!",
      },
      mathGame: {
        link: "Matikkapeli",
        title: "Matikkapeli!",
        successMessage: "KAIKKI OIKEIN!!!",
        yourResults: "Tuloksesi",
        startOver: "Aloita alusta.",
      },
      sample2: {
        link: "Näyte 2",
        title: "Näyte 2!",
      },
      sample3: {
        link: "Näyte 3",
        title: "Näyte 3!",
      },
      sample4: {
        link: "Näyte 4",
        title: "Näyte 4!",
      },
    },
  },
};

export const LanguageContext = React.createContext(languages);
