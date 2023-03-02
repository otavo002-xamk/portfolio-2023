import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Correct from "../../pictures/correct.png";
import False from "../../pictures/false.png";
import Progress from "react-progressbar";

let interval;

function Equation({
  index,
  language,
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
  const [timePast, setTimePast] = useState(0);
  const [timeBarColor, setTimeBarColor] = useState("rgb(0,255,255)");
  const [endMessage, setEndMessage] = useState(null);
  const [endResult, setEndResult] = useState(null);

  const unlockNext = useCallback(() => {
    setShowCorrect(true);
    setTableLocked(true);
    setNextButtonDisabled(false);
    clearInterval(interval);
  }, [setShowCorrect, setTableLocked, setNextButtonDisabled]);

  const chooseAnswer = (event) => {
    if (!isTableLocked) {
      if (Number(event.target.id.slice(7)) !== sum) {
        setShowWrong(event.target.id);
        setEndResult("incorrect");
      } else {
        setEndResult("correct");
        addPoint();
      }
      unlockNext();
    }
  };

  useEffect(() => {
    let i = 0;
    if (!shouldBeHidden && !isTableLocked) {
      interval = setInterval(() => {
        if (i < 100) {
          setTimePast(i);
          setTimeBarColor(`rgb(${i * 2}, ${255 - i * 2}, ${255 - i * 2})`);
          i++;
        } else {
          unlockNext();
          setEndResult("time ended");
        }
      }, 100);
    }
  }, [shouldBeHidden, isTableLocked, setNextButtonDisabled, unlockNext]);

  useEffect(() => {
    switch (endResult) {
      case "incorrect":
        setEndMessage(language.pages.mathGame.equation.incorrect);
        break;
      case "correct":
        setEndMessage(language.pages.mathGame.equation.correct);
        break;
      case "time ended":
        setEndMessage(language.pages.mathGame.equation.timeEnded);
        break;
      default:
        break;
    }
  }, [language, endResult]);

  return (
    <div data-testid={`equation-${index}`} hidden={shouldBeHidden}>
      <div className="grid grid-rows-2 tablet:flex tablet:items-stretch">
        <div
          data-testid={`random-number-${index}-0`}
          className="row-start-1 row-span-1 self-center text-center py-2 bg-rose-200 tablet:w-2/12"
        >
          {randomNumbers[0]}
        </div>
        <div className="row-start-1 row-span-1 self-center text-center py-2 tablet:w-1/12">
          +
        </div>
        <div
          data-testid={`random-number-${index}-1`}
          className="row-start-1 row-span-1 self-center text-center py-2 bg-rose-200 tablet:w-2/12"
        >
          {randomNumbers[1]}
        </div>
        <div className="row-start-1 row-span-1 self-center text-center py-2 tablet:w-1/12">
          +
        </div>
        <div
          data-testid={`random-number-${index}-2`}
          className="row-start-1 row-span-1 self-center text-center py-2 bg-rose-200 tablet:w-2/12"
        >
          {randomNumbers[2]}
        </div>
        <div className="row-start-1 row-span-1 self-center text-center py-2 tablet:w-1/12">
          =
        </div>
        <table className="col-start-2 col-span-2 tablet:w-2/12 border-separate">
          <tbody data-testid={`equation-options-table-tb-${index}`}>
            {tableOfOptions.map((option, i) => (
              <tr key={i.toString()}>
                <td
                  id={`td-${index}-${i}-${option}`}
                  data-testid={`equation-options-table-td-${index}-${i}`}
                  onClick={chooseAnswer}
                  className={`flex justify-center gap-1 ${
                    !isTableLocked && "cursor-pointer"
                  } shadow-mathBox w-full text-center py-2 bg-red-400`}
                >
                  {option}
                  {Number(option) === sum && showCorrect && (
                    <img className="h-6" alt="correct" src={Correct} />
                  )}
                  {showWrong === `td-${index}-${i}-${option}` && (
                    <img className="h-6" alt="incorrect" src={False} />
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
      {endMessage ? (
        <p className="text-center text-red-600">{endMessage}</p>
      ) : (
        <p className="text-center">
          {language.pages.mathGame.equation.timeLeft}:{" "}
          {Math.ceil((100 - timePast) / 10)}
        </p>
      )}
      <br />
      <br />
      <Progress
        color={timePast === 100 ? "red" : timeBarColor}
        completed={timePast}
      />
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
