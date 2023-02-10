import React from "react";
import { LanguageContext } from "../language-context";

function Sample2() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <p className="dark:text-white">{language.pages.sample2.title}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Sample2;
