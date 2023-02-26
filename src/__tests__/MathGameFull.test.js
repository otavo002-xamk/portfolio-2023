import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";
import { render } from "@testing-library/react";
import {
  testComponentRendering,
  testPlusEqualsQuestionMarkSymbolMarks,
  testThreeRandomNumbersAndSum,
  testEndResultsAreShown,
  testSuccessMessageAndResults,
  testPageReload,
} from "../testfunctions/MathGameTestFunctions";

jest.mock("../language-context");
const language = languages.en;

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
      testThreeRandomNumbersAndSum(index);
    }
  );
});

describe("Choosing and clicking next", () => {
  it("should give the results, after choosing and clicking next enough times", () => {
    testEndResultsAreShown();
  });

  it("should give the succes-message + results after choosing and clicking next enough times", () => {
    testSuccessMessageAndResults();
  });
});

describe("Start over button", () => {
  it("should reload the page when the start-over-button is clicked", () => {
    testPageReload();
  });
});
