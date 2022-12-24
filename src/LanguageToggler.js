import React from "react";
import { LanguageContext } from "./language-context";
import england from "./pictures/gb.png";
import finland from "./pictures/fi.png";

function LanguageToggler() {
  return (
    <LanguageContext.Consumer>
      {({ language, updateLanguage }) => {
        <div className="float-right" onClick={updateLanguage(language)}>
          <img
            src={`${language === "en" ? england : finland}`}
            alt="language"
          />
          <p>Language TOggler!</p>
        </div>;
      }}
    </LanguageContext.Consumer>
  );
}

export default LanguageToggler;
