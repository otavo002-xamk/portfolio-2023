import { screen, fireEvent, within, render } from "@testing-library/react";
import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";

jest.mock("../language-context");
const language = languages.en;
const { successMessage, title, ready, start, startOver, yourResults } =
  language.pages.mathGame;

const calculateSum = (equationIndex, cb) => {
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

const testEquationVisibilities = (equationIndex) => {
  [0, 1, 2, 3, 4].forEach((index) => {
    equationIndex === index
      ? expect(screen.getByTestId(`equation-${index}`)).toBeVisible()
      : expect(screen.getByTestId(`equation-${index}`)).not.toBeVisible()
  });
};

const chooseWrongOptionFromTable = (equationIndex, sum) => {
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

const chooseRightOptionFromTable = (equationIndex, sum) => {
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

const makeInitialAssertions = () => {
  [/Your results: [0-5] \/ 5/, successMessage].forEach((text) =>
    expect(screen.queryByText(text)).not.toBeInTheDocument()
  );
};

export const renderAndStart = (clickStart = true) => {
  render(
    <LanguageContext.Provider value={{ language }}>
      <MathGame />
    </LanguageContext.Provider>
  );

  clickStart && fireEvent.click(screen.getByText(start));
};

export const testStartButtonWorks = () => {
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(ready)).toBeInTheDocument();
  expect(screen.getByText(start)).toBeInTheDocument();
  expect(screen.queryByText(startOver)).not.toBeInTheDocument();
  fireEvent.click(screen.getByText(start));
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.queryByText(start)).not.toBeInTheDocument();
  expect(screen.getByText(startOver)).toBeInTheDocument();
};

export const testComponentRendering = () => {
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(/NEXT/)).toBeInTheDocument();
  expect(screen.getByText(startOver)).toBeInTheDocument();
};

export const testPlusEqualsQuestionMarkSymbolMarks = (index) => {
  expect(
    within(screen.getByTestId(`equation-${index}`)).getAllByText("+")
  ).toHaveLength(2);

  ["=", "?"].forEach((symbol) =>
    expect(
      within(screen.getByTestId(`equation-${index}`)).getAllByText(symbol)
    ).toHaveLength(1)
  );
};

export const testThreeRandomNumbersAndSum = (index) => {
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

  calculateSum(index, (sum) => {
    expect(
      within(
        screen.getByTestId(`equation-options-table-tb-${index}`)
      ).getAllByText(String(sum)).length
    ).toBeGreaterThanOrEqual(1);
  });
};

export const testEndResultsAreShown = () => {
  makeInitialAssertions();

  [0, 1, 2, 3, 4].forEach((equationIndex) => {
    expect(screen.getByText("0 / 5")).toBeInTheDocument();
    testEquationVisibilities(equationIndex);
    expect(screen.getByText(/NEXT/)).toBeDisabled();

    calculateSum(equationIndex, (sum) =>
      chooseWrongOptionFromTable(equationIndex, sum)
    );

    expect(screen.getByText(/NEXT/)).not.toBeDisabled();
    fireEvent.click(screen.getByText(/NEXT/));
  });

  expect(screen.getByText(`${yourResults}: 0 / 5`)).toBeInTheDocument();
  expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
};

export const testSuccessMessageAndResults = () => {
  makeInitialAssertions();

  [0, 1, 2, 3, 4].forEach((equationIndex) => {
    expect(screen.getByText(`${equationIndex} / 5`)).toBeInTheDocument();
    testEquationVisibilities(equationIndex);
    expect(screen.getByText(/NEXT/)).toBeDisabled();

    calculateSum(equationIndex, (sum) =>
      chooseRightOptionFromTable(equationIndex, sum)
    );

    expect(screen.getByText(/NEXT/)).not.toBeDisabled();
    fireEvent.click(screen.getByText(/NEXT/));
  });

  expect(screen.getByText(successMessage)).toBeInTheDocument();
  expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
};

export const testPageReload = () => {
  makeInitialAssertions();

  [0, 1, 2, 3, 4].forEach((equationIndex) => {
    calculateSum(equationIndex, (sum) =>
      chooseRightOptionFromTable(equationIndex, sum)
    );

    fireEvent.click(screen.getByText(/NEXT/));
  });

  expect(screen.getByText(successMessage)).toBeInTheDocument();
  expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
  fireEvent.click(screen.getByText(startOver));
  expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
  expect(screen.queryByText(`${yourResults}: 5 / 5`)).not.toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(ready)).toBeInTheDocument();
  expect(screen.getByText(start)).toBeInTheDocument();
};
