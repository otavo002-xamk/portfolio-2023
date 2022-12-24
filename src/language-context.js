import React from "react";

export const languages = {
  en: {
    frontPage: "Front Page!",
    sample1: "Sample 1!",
    sample2: "Sample 2!",
    sample3: "Sample 3!",
    sample4: "Sample 4!",
  },
  fi: {
    frontPage: "Etusivu!",
    sample1: "Näyte 1!",
    sample2: "Näyte 2!",
    sample3: "Näyte 3!",
    sample4: "Näyte 4!",
  },
};

export const LanguageContext = React.createContext(languages);
