import React from "react";
import { LanguageContext } from "../language-context";

function MathGame() {
  const randomNumbers = [
    (Math.random() * 100).toFixed(0),
    (Math.random() * 100).toFixed(0),
    (Math.random() * 100).toFixed(0),
  ];

  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div>
          <h1 className="text-2xl dark:text-white">
            {language.pages.mathGame.content}
          </h1>
          <br />
          <div>
            <div className="shadow-mathBox float-left text-center py-2 bg-rose-400 w-2/12">
              {randomNumbers[0]}
            </div>
            <div className="float-left text-center py-2 w-1/12">+</div>
            <div className="shadow-mathBox float-left text-center py-2 bg-rose-400 w-2/12">
              {randomNumbers[1]}
            </div>
            <div className="float-left text-center py-2 w-1/12">+</div>
            <div className="shadow-mathBox float-left text-center py-2 bg-rose-400 w-2/12">
              {randomNumbers[2]}
            </div>
            <div className="float-left text-center py-2 w-1/12">=</div>
            <table className="float-left w-2/12 border-separate">
              <tbody>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    300
                  </td>
                </tr>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    300
                  </td>
                </tr>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    300
                  </td>
                </tr>
                <tr>
                  <td className="shadow-mathBox w-full text-center py-2 bg-red-400">
                    300
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="float-left text-center py-2 w-1/12">?</div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default MathGame;
