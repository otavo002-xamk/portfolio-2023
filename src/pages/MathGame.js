import React, { useEffect, useState } from "react";
import { LanguageContext } from "../language-context";
import Equation from "./childcomponents/Equation";

function MathGame() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [tableOfOptions, setTableOfOptions] = useState([]);
  const [currentEquation, setCurrentEquation] = useState(0);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);

  useEffect(() => {
    const randoms = [];
    const randomResults = [];
    const options = [];

    for (let i = 0; i < 5; i++) {
      let randomThree = [];
      let threeRandomResults = [];

      for (let i = 0; i < 3; i++) {
        randomThree.push(Number((Math.random() * 100).toFixed(0)));
        threeRandomResults.push(Number((Math.random() * 300).toFixed(0)));
      }

      randoms.push(randomThree);
      randomResults.push(threeRandomResults);
      randomResults[randomResults.length - 1].push(
        randomThree[0] + randomThree[1] + randomThree[2]
      );
    }

    randomResults.forEach((randomResult) => {
      options.push(randomResult.sort());
    });

    setRandomNumbers(randoms);
    setTableOfOptions(options);
  }, []);

  const moveToNextEquation = () => {
    setNextButtonDisabled(true);
    setCurrentEquation(currentEquation + 1);
  };

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <>
          <h1 className="text-2xl dark:text-white">
            {language.pages.mathGame.content}
          </h1>
          <br />
          {tableOfOptions.length === 0 || randomNumbers.length === 0 ? (
            <p>loading...</p>
          ) : (
            randomNumbers.map((_equation, index) => (
              <Equation
                shouldBeHidden={
                  currentEquation !== index && currentEquation < 5
                }
                randomNumbers={randomNumbers[index]}
                tableOfOptions={tableOfOptions[index]}
                setNextButtonDisabled={setNextButtonDisabled}
              />
            ))
          )}
          <br />
          <div className="flex justify-center">
            {isNextButtonDisabled ? (
              <button className="margin-auto text-stone-400" disabled>
                NEXT &#10095;
              </button>
            ) : (
              <button
                className="margin-auto text-red-900 dark:text-white text-shadow dark:text-shadow-white"
                onClick={moveToNextEquation}
              >
                NEXT &#10095;
              </button>
            )}
          </div>
        </>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
