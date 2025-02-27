import React, { useCallback, useEffect, useState } from "react";
import { LanguageContext } from "../language-context";
import Equation from "./childcomponents/Equation";

function MathGame() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [tableOfOptions, setTableOfOptions] = useState([]);
  const [currentEquation, setCurrentEquation] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [points, setPoints] = useState(0);
  const [state, setState] = useState(0);
  const [gameHasStarted, setGameHasStarted] = useState(false);

  const addPoint = () => setPoints((points) => points + 1);

  const resetStates = useCallback(() => {
    setRandomNumbers([]);
    setTableOfOptions([]);
    setCurrentEquation(0);
    setNextButtonDisabled(true);
    setPoints(0);
    setGameHasStarted(false);
    setState((state) => {
      return { ...state };
    });
  }, []);

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
      options.push(randomResult.toSorted((a, b) => a - b));
    });

    setRandomNumbers(randoms);
    setTableOfOptions(options);
  }, [state]);

  const moveToNextEquation = () => {
    setNextButtonDisabled(true);
    setCurrentEquation(currentEquation + 1);
  };

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.mathGame.title}</h1>
          <br />
          {gameHasStarted ? (
            <>
              {currentEquation === 5 && points === 5 && (
                <h2>{language.pages.mathGame.successMessage}</h2>
              )}
              {currentEquation === 5 && (
                <h2>
                  {language.pages.mathGame.yourResults}: {points} / 5
                </h2>
              )}
              <button
                className="underline text-red-600 text-shadow-red"
                onClick={resetStates}
              >
                {language.pages.mathGame.startOver}
              </button>
              {tableOfOptions.length === 0 || randomNumbers.length === 0 ? (
                <p>loading...</p>
              ) : (
                randomNumbers.map((randomThree, index) => (
                  <Equation // eslint-disable-next-line
                    key={index.toString()}
                    language={language}
                    index={index}
                    shouldBeHidden={
                      currentEquation !== index && currentEquation < 5
                    }
                    randomNumbers={randomThree}
                    tableOfOptions={tableOfOptions[index]}
                    setNextButtonDisabled={setNextButtonDisabled}
                    addPoint={addPoint}
                  />
                ))
              )}
              {currentEquation < 5 && (
                <div className="flex gap-10 justify-center">
                  <p>{points} / 5</p>
                  {nextButtonDisabled ? (
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
              )}
            </>
          ) : (
            <>
              <p>{language.pages.mathGame.ready}</p>
              <br />
              <button
                onClick={setGameHasStarted}
                className="underline text-red-600 text-shadow-red"
              >
                {language.pages.mathGame.start}
              </button>
            </>
          )}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
