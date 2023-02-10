import React, { useState } from "react";
import PropTypes from "prop-types";
import Correct from "../../pictures/correct.png";
import False from "../../pictures/false.png";

function Equation({
  index,
  shouldBeHidden,
  randomNumbers,
  tableOfOptions,
  setNextButtonDisabled,
  addPoint,
}) {
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(null);
  const [isTableLocked, setTableLocked] = useState(false);
  const sum = randomNumbers[0] + randomNumbers[1] + randomNumbers[2];

  const chooseAnswer = (event) => {
    if (!isTableLocked) {
      event.target.id.slice(6) != sum
        ? setShowWrong(event.target.id)
        : addPoint();
      setShowCorrect(true);
      setTableLocked(true);
      setNextButtonDisabled(false);
    }
  };

  return (
    <div hidden={shouldBeHidden}>
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
            {tableOfOptions.map((option, i) => (
              <tr key={i.toString()}>
                <td
                  id={`td${index + 1}-${i + 1}-${option}`}
                  onClick={chooseAnswer}
                  className="flex justify-center gap-1 cursor-pointer shadow-mathBox w-full text-center py-2 bg-red-400"
                >
                  {option}
                  {option == sum && showCorrect && (
                    <img className="h-6" alt="correct" src={Correct} />
                  )}
                  {showWrong === `td${index + 1}-${i + 1}-${option}` && (
                    <img className="h-6" alt="false" src={False} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="self-center float-left text-center py-2 tablet:w-1/12">
          ?
        </div>
      </div>
      <br />
    </div>
  );
}

Equation.propTypes = {
  index: PropTypes.number.isRequired,
  shouldBeHidden: PropTypes.bool,
  randomNumbers: PropTypes.array.isRequired,
  tableOfOptions: PropTypes.array.isRequired,
  setNextButtonDisabled: PropTypes.func.isRequired,
  addPoint: PropTypes.func.isRequired,
};

export default Equation;
