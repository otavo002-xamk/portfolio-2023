import { screen, fireEvent, within } from "@testing-library/react";
import { languages } from "../language-context";

jest.mock("../language-context");
const language = languages.en;
const { successMessage, title, startOver } = language.pages.mathGame;

export const testComponentRendering = () => {
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(/NEXT/)).toBeInTheDocument();
  expect(screen.getByText(startOver)).toBeInTheDocument();
};

export const testPlusEqualsQuestionMarkSymbolMarks = (index) => {
  expect(
    within(screen.getByTestId(`equation-${index}`)).getAllByText("+")
  ).toHaveLength(2);

  expect(
    within(screen.getByTestId(`equation-${index}`)).getAllByText("=")
  ).toHaveLength(1);

  expect(
    within(screen.getByTestId(`equation-${index}`)).getAllByText("?")
  ).toHaveLength(1);
};

export const testThreeRandomNumbers = (index) => {
  [0, 1, 2].forEach((randomNumber) => {
    expect(
      screen.getByTestId(`random-number-${index}-${randomNumber}`)
    ).toBeInTheDocument();

    expect(
      Number(
        screen.getByTestId(`random-number-${index}-${randomNumber}`).textContent
      )
    ).toBeLessThanOrEqual(100);

    expect(
      Number(
        screen.getByTestId(`random-number-${index}-${randomNumber}`).textContent
      )
    ).toBeGreaterThanOrEqual(0);
  });
};

export const calculateSum = (equationIndex, cb) => {
  let randomNumbers = [];

  [0, 1, 2].forEach((randomNumber) => {
    randomNumbers.push(
      Number(
        screen.getByTestId(`random-number-${equationIndex}-${randomNumber}`)
          .textContent
      )
    );
  });

  cb(randomNumbers[0] + randomNumbers[1] + randomNumbers[2]);
};

export const chooseWrongOptionFromEach = (equationIndex, sum) => {
  let options = [];

  [0, 1, 2, 3].forEach((optionIndex) =>
    options.push(
      screen.getByTestId(
        `equation-options-table-td-${equationIndex}-${optionIndex}`
      )
    )
  );

  let wrongOptions = options.filter((option) => option.textContent != sum);
  fireEvent.click(wrongOptions[0]);
};

export const chooseRightOptionFromEach = (equationIndex, sum) => {
  [0, 1, 2, 3].forEach((optionIndex) => {
    screen.getByTestId(
      `equation-options-table-td-${equationIndex}-${optionIndex}`
    ).textContent == sum &&
      fireEvent.click(
        screen.getByTestId(
          `equation-options-table-td-${equationIndex}-${optionIndex}`
        )
      );
  });
};

export const makeInitialAssertions = () => {
  expect(
    screen.queryByText(/Your results: [0-5] \/ 5/)
  ).not.toBeInTheDocument();

  expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
};

export const testEquationVisibilities = (equationIndex) => {
  [0, 1, 2, 3, 4].forEach((index) => {
    equationIndex === index
      ? expect(screen.getByTestId(`equation-${index}`)).toBeVisible
      : expect(screen.getByTestId(`equation-${index}`)).not.toBeVisible;
  });
};
