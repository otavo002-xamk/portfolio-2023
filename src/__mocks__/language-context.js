import React from "react";
import En from "../pictures/gb.png";
import Fi from "../pictures/fi.png";

export const languages = {
  en: {
    name: "en",
    flag: En,
    pages: {
      frontPage: {
        content: "Front Page!",
      },
      sample1: {
        link: "Sample 1",
        content: "Sample 1!",
      },
      sample2: {
        link: "Sample 2",
        content: "Sample 2!",
      },
      sample3: {
        link: "Sample 3",
        content: "Sample 3!",
      },
      sample4: {
        link: "Sample 4",
        content: "Sample 4!",
      },
    },
  },
  fi: {
    name: "fi",
    flag: Fi,
    pages: {
      frontPage: {
        content: "Etusivu!",
      },
      sample1: {
        link: "Näyte 1",
        content: "Näyte 1!",
      },
      sample2: {
        link: "Näyte 2",
        content: "Näyte 2!",
      },
      sample3: {
        link: "Näyte 3",
        content: "Näyte 3!",
      },
      sample4: {
        link: "Näyte 4",
        content: "Näyte 4!",
      },
    },
  },
};

export const LanguageContext = React.createContext(languages);
