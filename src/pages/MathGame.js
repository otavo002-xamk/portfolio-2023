import React from "react";
import { LanguageContext } from "../language-context";

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

  const chooseAnswer = (event) => {
    event.target.id.slice(4) == sum
      ? console.log("correct!")
      : console.log("false!");
  };

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <h1 className="text-2xl dark:text-white">
            {language.pages.mathGame.content}
          </h1>
          <br />
          <div className="grid grid-rows-2 tablet:flex tablet:items-stretch">
            <div className="row-start-1 row-span-1 self-center text-center py-2 bg-rose-200 tablet:w-2/12">
              {randomNumbers[0]}
            </div>
            <div className="row-start-1 row-span-1 self-center text-center py-2 tablet:w-1/12">
              +
            </div>
            <div className="row-start-1 row-span-1 self-center text-center py-2 bg-rose-200 tablet:w-2/12">
              {randomNumbers[1]}
            </div>
            <div className="row-start-1 row-span-1 self-center text-center py-2 tablet:w-1/12">
              +
            </div>
            <div className="row-start-1 row-span-1 self-center text-center py-2 bg-rose-200 tablet:w-2/12">
              {randomNumbers[2]}
            </div>
            <div className="row-start-1 row-span-1 self-center text-center py-2 tablet:w-1/12">
              =
            </div>
            <table className="col-start-2 col-span-2 tablet:w-2/12 border-separate">
              <tbody>
                <tr>
                  <td
                    id={`td1-${tableOfOptions[0]}`}
                    onClick={chooseAnswer}
                    className="cursor-pointer shadow-mathBox w-full text-center py-2 bg-red-400"
                  >
                    {tableOfOptions[0]}
                  </td>
                </tr>
                <tr>
                  <td
                    id={`td2-${tableOfOptions[1]}`}
                    onClick={chooseAnswer}
                    className="cursor-pointer shadow-mathBox w-full text-center py-2 bg-red-400"
                  >
                    {tableOfOptions[1]}
                  </td>
                </tr>
                <tr>
                  <td
                    id={`td3-${tableOfOptions[2]}`}
                    onClick={chooseAnswer}
                    className="cursor-pointer shadow-mathBox w-full text-center py-2 bg-red-400"
                  >
                    {tableOfOptions[2]}
                  </td>
                </tr>
                <tr>
                  <td
                    id={`td4-${tableOfOptions[3]}`}
                    onClick={chooseAnswer}
                    className="cursor-pointer shadow-mathBox w-full text-center py-2 bg-red-400"
                  >
                    {tableOfOptions[3]}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="self-center float-left text-center py-2 tablet:w-1/12">
              ?
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
