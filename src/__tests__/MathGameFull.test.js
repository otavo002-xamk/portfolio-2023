import {
  testComponentRendering,
  testPlusEqualsQuestionMarkSymbolMarks,
  testThreeRandomNumbersAndSum,
  testEndResultsAreShown,
  testSuccessMessageAndResults,
  testPageReload,
  renderAndStart,
  testStartButtonWorks,
} from "../testfunctions/MathGameTestFunctions";

jest.mock("../language-context");

describe("Starting", () => {
  beforeEach(() => renderAndStart(false));

  it("should render the Start!-button and start game after clicking it", () =>
    testStartButtonWorks());
});

describe("Rendering", () => {
  beforeEach(() => renderAndStart());

  it("should render elements correctly", () => testComponentRendering());

  it.each([0, 1, 2, 3, 4])(
    "should render the right symbols in equation index %d",
    (index) => testPlusEqualsQuestionMarkSymbolMarks(index)
  );

  it.each([0, 1, 2, 3, 4])(
    "should render the three random numbers for index %d and the sum of each in the options table",
    (index) => testThreeRandomNumbersAndSum(index)
  );
});

describe("Choosing and clicking next", () => {
  beforeEach(() => renderAndStart());

  it("should give the results, after choosing and clicking next enough times", () =>
    testEndResultsAreShown());

  it("should give the succes-message + results after choosing and clicking next enough times", () =>
    testSuccessMessageAndResults());
});

describe("Start over button", () => {
  beforeEach(() => renderAndStart());

  it("should reload the page when the start-over-button is clicked", () =>
    testPageReload());
});
