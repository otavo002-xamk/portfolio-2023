import React from "react";
import { LanguageContext } from "../language-context";

function Sample3() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <p className="dark:text-white">{language.pages.sample3.title}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Sample3;
