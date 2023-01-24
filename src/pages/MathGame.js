import React from "react";
import { LanguageContext } from "../language-context";

function MathGame() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <p className="dark:text-white">{language.pages.mathGame.content}</p>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
