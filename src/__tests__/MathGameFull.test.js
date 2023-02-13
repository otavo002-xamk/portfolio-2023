import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";
import { screen, render, within, fireEvent } from "@testing-library/react";
import {
  calculateSum,
  chooseRightOptionFromEach,
  makeInitialAssertions,
  testEquationVisibilities,
  testComponentRendering,
  testPlusEqualsQuestionMarkSymbolMarks,
  testThreeRandomNumbers,
  chooseWrongOptionFromEach,
} from "../testfunctions/MathGameTestFunctions";

jest.mock("../language-context");
const language = languages.en;

const { title, startOver, successMessage, yourResults } =
  language.pages.mathGame;

beforeEach(() => {
  render(
    <LanguageContext.Provider value={{ language }}>
      <MathGame />
    </LanguageContext.Provider>
  );
});

describe("Rendering", () => {
  it("should render elements correctly", () => {
    testComponentRendering();
  });

  it.each([0, 1, 2, 3, 4])(
    "should render the right symbols in equation index %d",
    (index) => {
      testPlusEqualsQuestionMarkSymbolMarks(index);
    }
  );

  it.each([0, 1, 2, 3, 4])(
    "should render the three random numbers for index %d and the sum of each in the options table",
    (index) => {
      testThreeRandomNumbers(index);

      calculateSum(index, (sum) => {
        expect(
          within(
            screen.getByTestId(`equation-options-table-tb-${index}`)
          ).getAllByText(String(sum)).length
        ).toBeGreaterThanOrEqual(1);
      });
    }
  );
});

describe("Choosing and clicking next", () => {
  it("should give the results, after choosing and clicking next enough times", () => {
    makeInitialAssertions();

    [0, 1, 2, 3, 4].forEach((equationIndex) => {
      expect(screen.getByText("0 / 5")).toBeInTheDocument();
      testEquationVisibilities(equationIndex);
      expect(screen.getByText(/NEXT/)).toBeDisabled();

      calculateSum(equationIndex, (sum) =>
        chooseWrongOptionFromEach(equationIndex, sum)
      );

      expect(screen.getByText(/NEXT/)).not.toBeDisabled();
      fireEvent.click(screen.getByText(/NEXT/));
    });

    expect(screen.getByText(`${yourResults}: 0 / 5`)).toBeInTheDocument();
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
  });

  it("should give the succes-message + results after choosing and clicking next enough times", () => {
    makeInitialAssertions();

    [0, 1, 2, 3, 4].forEach((equationIndex) => {
      expect(screen.getByText(`${equationIndex} / 5`)).toBeInTheDocument();
      testEquationVisibilities(equationIndex);
      expect(screen.getByText(/NEXT/)).toBeDisabled();

      calculateSum(equationIndex, (sum) =>
        chooseRightOptionFromEach(equationIndex, sum)
      );

      expect(screen.getByText(/NEXT/)).not.toBeDisabled();
      fireEvent.click(screen.getByText(/NEXT/));
    });

    expect(screen.queryByText(successMessage)).toBeInTheDocument();
    expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
  });
});

describe("Start over button", () => {
  it("should reload the page when the start-over-button is clicked", () => {
    makeInitialAssertions();

    [0, 1, 2, 3, 4].forEach((equationIndex) => {
      calculateSum(equationIndex, (sum) =>
        chooseRightOptionFromEach(equationIndex, sum)
      );

      fireEvent.click(screen.getByText(/NEXT/));
    });

    expect(screen.getByText(successMessage)).toBeInTheDocument();
    expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
    fireEvent.click(screen.getByText(startOver));
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(`${yourResults}: 5 / 5`)).not.toBeInTheDocument();
    expect(screen.getByText("0 / 5")).toBeInTheDocument();
  });
});
