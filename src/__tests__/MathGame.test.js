import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";
import { screen, render, fireEvent } from "@testing-library/react";

jest.mock("../language-context");
const mockChildComponent = jest.fn();
const language = languages.en;
const { title, successMessage, yourResults, startOver } =
  language.pages.mathGame;
const testTexts = ["Set next button disabled!", "Add point!"];
const setNextButtonDisabledText = testTexts[0];
const AddPointText = testTexts[1];

jest.mock("../pages/childcomponents/Equation", () => (props) => {
  mockChildComponent(props);

  return (
    <>
      <button onClick={() => props.setNextButtonDisabled(false)}>
        {testTexts[0]}
      </button>
      <button onClick={props.addPoint}>{testTexts[1]}</button>
    </>
  );
});

beforeEach(() => {
  render(
    <LanguageContext.Provider value={{ language }}>
      <MathGame />
    </LanguageContext.Provider>
  );
});

describe("Rendering & hiding", () => {
  it("should call the child component with right props", () => {
    expect(mockChildComponent).toHaveBeenCalledTimes(5);

    mockChildComponent.mock.calls.forEach((mockCall) => {
      expect(mockCall[0].randomNumbers.length).toBe(3);
      expect(mockCall[0].tableOfOptions.length).toBe(4);
    });
  });

  it.each(testTexts)("should render element with text %s", (text) =>
    expect(screen.getAllByText(text).length).toBe(5)
  );

  it("should render button and title", () => {
    expect(screen.getByText(title)).toBeInTheDocument();

    expect(screen.getByText(/NEXT/)).toBeInTheDocument();
  });

  it("should hide the right components when needed", () => {
    [0, 1, 2, 3, 4].forEach((index) => {
      let lastFiveCalls = mockChildComponent.mock.calls.splice(
        mockChildComponent.mock.calls.length - 5,
        5
      );

      lastFiveCalls.forEach((mockCall, i) => {
        i === index
          ? expect(mockCall[0].shouldBeHidden).toBe(false)
          : expect(mockCall[0].shouldBeHidden).toBe(true);
      });

      fireEvent.click(screen.getAllByText(setNextButtonDisabledText)[0]);
      fireEvent.click(screen.getByText(/NEXT/));
    });
  });
});

describe("Random numbers & sums", () => {
  it("should include only numbers between 0 an 100", () => {
    mockChildComponent.mock.calls.forEach((mockCall) => {
      mockCall[0].randomNumbers.forEach((randomNumber) => {
        expect(randomNumber).toBeGreaterThanOrEqual(0);
        expect(randomNumber).toBeLessThanOrEqual(100);
      });
    });
  });

  it("should include the right sum in the options list", () => {
    mockChildComponent.mock.calls.forEach((mockCall) => {
      let sum =
        mockCall[0].randomNumbers[0] +
        mockCall[0].randomNumbers[1] +
        mockCall[0].randomNumbers[2];

      expect(mockCall[0].tableOfOptions).toContain(sum);
    });
  });
});

describe("Enabling and disabling NEXT-button", () => {
  it("should enable the NEXT-button by clicking the table and then disable it by clicking the button itself", () => {
    expect(screen.getByText(/NEXT/)).toBeDisabled();
    fireEvent.click(screen.getAllByText(setNextButtonDisabledText)[0]);
    expect(screen.getByText(/NEXT/)).not.toBeDisabled();
    fireEvent.click(screen.getByText(/NEXT/));
    expect(screen.getByText(/NEXT/)).toBeDisabled();
  });
});

describe("Adding points", () => {
  it("shoud add points when the mock-button is clicked, should render a success-message when there's 5 points", () => {
    expect(screen.queryByText(/Your results: /)).not.toBeInTheDocument();
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();

    [0, 1, 2, 3, 4].forEach((index) => {
      [0, 1, 2, 3, 4].forEach((pointAmount) => {
        index === pointAmount
          ? expect(screen.getByText(`${pointAmount} / 5`)).toBeInTheDocument()
          : expect(
              screen.queryByText(`${pointAmount} / 5`)
            ).not.toBeInTheDocument();
      });

      fireEvent.click(screen.getAllByText(AddPointText)[0]);
      fireEvent.click(screen.getAllByText(setNextButtonDisabledText)[0]);
      fireEvent.click(screen.getByText(/NEXT/));
    });

    expect(screen.getByText(successMessage)).toBeInTheDocument();
    expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
  });

  it("should not render the succes-message unless there's 5 points", () => {
    [1, 2, 3, 4].forEach((_nthTime) => {
      fireEvent.click(screen.getAllByText(AddPointText)[0]);
      fireEvent.click(screen.getAllByText(setNextButtonDisabledText)[0]);
      fireEvent.click(screen.getByText(/NEXT/));
    });

    fireEvent.click(screen.getAllByText(setNextButtonDisabledText)[0]);
    fireEvent.click(screen.getByText(/NEXT/));
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
    expect(screen.getByText(`${yourResults}: 4 / 5`)).toBeInTheDocument();
  });
});

describe("Start over button", () => {
  it("should reload the page when the button is clicked", () => {
    expect(screen.getByText(startOver)).toBeInTheDocument();

    [0, 1, 2, 3, 4].forEach((_nthTime) => {
      fireEvent.click(screen.getAllByText(AddPointText)[0]);
      fireEvent.click(screen.getAllByText(setNextButtonDisabledText)[0]);
      fireEvent.click(screen.getByText(/NEXT/));
    });

    expect(screen.getByText(successMessage)).toBeInTheDocument();
    expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Start over!"));
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
    expect(screen.getByText("0 / 5")).toBeInTheDocument();
    expect(screen.queryByText(/Your results:/)).not.toBeInTheDocument();
  });
});