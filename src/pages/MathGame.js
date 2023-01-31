import React, { useEffect, useState } from "react";
import { LanguageContext } from "../language-context";
import Equation from "./childcomponents/Equation";

function MathGame() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [tableOfOptions, setTableOfOptions] = useState([]);

  useEffect(() => {
    const pushStuffToArrays = (cb) => {
      let randomThree = [];
      let threeRandomResults = [];

      for (let i = 0; i < 3; i++) {
        randomThree.push(Number((Math.random() * 100).toFixed(0)));
        threeRandomResults.push(Number((Math.random() * 300).toFixed(0)));
      }

      cb(randomThree, threeRandomResults);
    };

    const createrandomsAndResults = (cb) => {
      const randoms = [];
      const randomResults = [];

      for (let i = 0; i < 5; i++) {
        pushStuffToArrays((randomThree, threeRandomResults) => {
          randoms.push(randomThree);
          randomResults.push(threeRandomResults);
        });
      }

      cb(randoms, randomResults);
    };

    createrandomsAndResults((randoms, randomResults) => {
      const sums = [];
      const options = [];

      randoms.forEach((randomThree, index) => {
        sums.push(randomThree[0] + randomThree[1] + randomThree[2]);
        randomResults[index].push(sums[index]);
        options.push(randomResults[index].sort());
      });
      setRandomNumbers(randoms);
      setTableOfOptions(options);
    });
  }, []);

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <h1 className="text-2xl dark:text-white">
            {language.pages.mathGame.content}
          </h1>
          <br />
          {tableOfOptions.length === 0 || randomNumbers.length === 0 ? (
            <p>loading...</p>
          ) : (
            <Equation
              randomNumbers={randomNumbers[0]}
              tableOfOptions={tableOfOptions[0]}
            />
          )}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
