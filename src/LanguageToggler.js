import React from "react";
import { LanguageContext } from "./language-context";
import england from "./pictures/gb.png";
import finland from "./pictures/fi.png";
import Select from "react-select";

function LanguageToggler() {
  const options = [
    { value: "en", label: <img src={england} alt="en" /> },
    { value: "fi", label: <img src={finland} alt="fi" /> },
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
              dropdownIndicator: (baseStyles) => ({
                ...baseStyles,
                cursor: "pointer",
              }),
            }}
            unstyled
            className="tablet:w-20 tablet:h-20 w-14 h-14"
            placeholder={<img src={language.flag} alt={language.name} />}
            options={options}
            onChange={updateLanguage}
          />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default LanguageToggler;
