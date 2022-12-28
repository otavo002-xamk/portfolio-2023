import React from "react";
import { LanguageContext } from "../language-context";

function Sample4() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <p className="dark:text-white">{language.pages.sample4.content}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Sample4;
