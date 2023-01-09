import React from "react";
import { LanguageContext } from "./language-context";
import england from "./pictures/gb.png";
import finland from "./pictures/fi.png";
import Select, { components, InputProps } from "react-select";

interface Option {
  value: string;
  label: any;
}

const options: Option[] = [
  {
    value: "en",
    label: <img data-testid="english-flag" src={england} alt="en" />,
  },
  {
    value: "fi",
    label: <img data-testid="finnish-flag" src={finland} alt="fi" />,
  },
];

const Input = (props: InputProps<Option, true>) => (
  <components.Input {...props} data-testid="language-toggler-input" />
);

function LanguageToggler() {
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
            components={{ Input }}
            onChange={updateLanguage}
          />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default LanguageToggler;
