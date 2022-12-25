import React from "react";
import { LanguageContext } from "./language-context";
import england from "./pictures/gb.png";
import finland from "./pictures/fi.png";
import Select from "react-select";

function LanguageToggler() {
  const options = [
    { value: "en", label: <img src={england} /> },
    { value: "fi", label: <img src={finland} /> },
  ];

  return (
    <LanguageContext.Consumer>
      {({ language, updateLanguage }) => (
        <div className="float-right">
          <Select
            styles={{
              option: (baseStyles) => ({
                ...baseStyles,
                width: 50,
                height: 50,
                cursor: "pointer",
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                display: "none",
              }),
            }}
            unstyled
            className="w-20 h-20"
            placeholder={<img src={language.flag} />}
            options={options}
            onChange={updateLanguage}
          />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default LanguageToggler;
