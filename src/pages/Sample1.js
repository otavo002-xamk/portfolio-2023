import React from "react";
import { LanguageContext } from "../language-context";

function Sample1() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <p className="dark:text-white">{language.pages.sample1.content}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Sample1;
