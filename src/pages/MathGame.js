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

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <h1 className="text-2xl dark:text-white">
            {language.pages.mathGame.content}
          </h1>
          <br />
          <div className="flex items-stretch">
            <div className="self-center text-center py-2 bg-rose-200 w-2/12">
              {randomNumbers[0]}
            </div>
            <div className="self-center text-center py-2 w-1/12">+</div>
            <div className="self-center text-center py-2 bg-rose-200 w-2/12">
              {randomNumbers[1]}
            </div>
            <div className="self-center text-center py-2 w-1/12">+</div>
            <div className="self-center text-center py-2 bg-rose-200 w-2/12">
              {randomNumbers[2]}
            </div>
            <div className="self-center text-center py-2 w-1/12">=</div>
            <table className="w-2/12 border-separate">
              <tbody>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    {tableOfOptions[0]}
                  </td>
                </tr>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    {tableOfOptions[1]}
                  </td>
                </tr>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    {tableOfOptions[2]}
                  </td>
                </tr>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    {tableOfOptions[3]}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="self-center float-left text-center py-2 w-1/12">
              ?
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
