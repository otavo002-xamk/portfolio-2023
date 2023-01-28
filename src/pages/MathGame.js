import React from "react";
import { LanguageContext } from "../language-context";
import Equation from "./childcomponents/Equation";

function MathGame() {
  const randomNumbers = [
    Number((Math.random() * 100).toFixed(0)),
    Number((Math.random() * 100).toFixed(0)),
    Number((Math.random() * 100).toFixed(0)),
  ];

  const sum = randomNumbers[0] + randomNumbers[1] + randomNumbers[2];

  const randomResults = [
    (Math.random() * 300).toFixed(0),
    (Math.random() * 300).toFixed(0),
    (Math.random() * 300).toFixed(0),
    sum,
  ];

  const tableOfOptions = randomResults.sort();

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <h1 className="text-2xl dark:text-white">
            {language.pages.mathGame.content}
          </h1>
          <br />
          <Equation
            randomNumbers={randomNumbers}
            tableOfOptions={tableOfOptions}
          />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
