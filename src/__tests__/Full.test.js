import { RouterProvider } from "react-router-dom";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import testRouter from "../testRouter";
import { languages } from "../language-context";
import {
  testComponentRendering,
  testPlusEqualsQuestionMarkSymbolMarks,
  calculateSum,
  testThreeRandomNumbers,
  makeInitialAssertions,
  testEquationVisibilities,
  chooseRightOptionFromTable,
  chooseWrongOptionFromTable,
} from "../testfunctions/MathGameTestFunctions";

jest.mock("../language-context");
const { frontPage, mathGame, nasaAPI, sample3, sample4 } = languages.en.pages;
const { successMessage, yourResults, startOver } = mathGame;
const navBarLinks = [mathGame, nasaAPI, sample3, sample4];
const testCases = [];

for (let i = 0; i < 8; i++) {
  i < 7
    ? testCases.push({ first: i, second: i + 1 })
    : testCases.push({ first: i, second: 0 });
}

describe("Top Header", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(1)} />));

  it("should render the home-icon image-element", () => {
    expect(screen.getByAltText("home")).toBeInTheDocument();
  });

  it("should redirect to front-page when image is clicked", async () => {
    expect(screen.getByText(mathGame.title)).toBeInTheDocument();
    expect(screen.queryByText(frontPage.title)).not.toBeInTheDocument();
    fireEvent.click(screen.getByAltText("home"));
    expect(screen.getByText(frontPage.title)).toBeInTheDocument();
    expect(screen.queryByText(mathGame.title)).not.toBeInTheDocument();
  });
});

describe("The Language Toggler", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should change the language from english to finnish & back to english", async () => {
    expect(screen.queryByText(frontPage.title)).toBeInTheDocument();
    expect(screen.queryByText("Etusivu!")).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId("language-toggler-input"), {
      target: { value: "fi" },
    });

    await waitFor(() =>
      expect(screen.getByTestId("finnish-flag")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("finnish-flag"));
    expect(screen.getByText("Etusivu!")).toBeInTheDocument();
    expect(screen.queryByText(frontPage.title)).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId("language-toggler-input"), {
      target: { value: "en" },
    });

    await waitFor(() =>
      expect(screen.getByTestId("english-flag")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("english-flag"));
    expect(screen.getByText(frontPage.title)).toBeInTheDocument();
    expect(screen.queryByText("Etusivu!")).not.toBeInTheDocument();
  });
});

describe("LeftNavBar", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the burger-menu-button", () =>
    expect(screen.getByTestId("menu-container")).toBeInTheDocument());

  it.each(navBarLinks)(
    "should render the navbar link $link and render content $content when the link is clicked",
    (navBarLink) => {
      expect(screen.getByText(navBarLink.link)).toBeInTheDocument();
      expect(screen.getByText(frontPage.title)).toBeInTheDocument();
      expect(screen.queryByText(navBarLink.title)).not.toBeInTheDocument();
      fireEvent.click(screen.getByText(navBarLink.link));
      expect(screen.getByText(navBarLink.title)).toBeInTheDocument();
      expect(screen.queryByText(frontPage.title)).not.toBeInTheDocument();
    }
  );
});

describe("Front Page", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the content", () => {
    expect(screen.getByText(frontPage.title)).toBeInTheDocument();
    expect(screen.getByTestId("slider-prev-button")).toBeInTheDocument();
    expect(screen.getByTestId("slider-next-button")).toBeInTheDocument();
    expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
  });

  it("should move to the next slide when clicking the arrow", () => {
    testCases.forEach((testCase) => {
      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("slider-next-button"));

      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();
    });
  });

  it("should move to the previous slide when clicking the arrow", () => {
    [...testCases].reverse().forEach((testCase) => {
      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("slider-prev-button"));

      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();
    });
  });

  jest.useFakeTimers();

  it("should move to the next slide automatically in every 5 seconds", () => {
    testCases.forEach((testCase) => {
      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();

      act(() => jest.runOnlyPendingTimers());

      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();
    });
  });
});

describe("MathGame", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(1)} />));

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
  });

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

  describe("Choosing and clicking next", () => {
    it("should give the results, after choosing and clicking next enough times", () => {
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
    });

    it("should give the succes-message + results after choosing and clicking next enough times", () => {
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

      expect(screen.queryByText(successMessage)).toBeInTheDocument();
      expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
    });
  });

  describe("Start over button", () => {
    it("should reload the page when the start-over-button is clicked", () => {
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

      expect(
        screen.queryByText(`${yourResults}: 5 / 5`)
      ).not.toBeInTheDocument();

      expect(screen.getByText("0 / 5")).toBeInTheDocument();
    });
  });
});

describe("Footer", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the footer", () => {
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
