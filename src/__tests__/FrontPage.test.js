import { fireEvent, render, screen, act } from "@testing-library/react";
import { LanguageContext, languages } from "../language-context";
import FrontPage from "../pages/FrontPage";

jest.mock("../language-context");
const mockChildComponent = jest.fn();
const language = languages.en;
const testCases = [];

for (let i = 0; i < 8; i++) {
  i < 7
    ? testCases.push({ first: i, second: i + 1 })
    : testCases.push({ first: i, second: 0 });
}

jest.mock("react-any-slider-dots", () => {
  return {
    ReactAnySliderDots: (props) => {
      mockChildComponent(props);

      return (
        // eslint-disable-next-line
        <button id="sliderdot5" onClick={props.handleClick}>
          Change slide 5!
        </button>
      );
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();

  render(
    <LanguageContext.Provider value={{ language }}>
      <FrontPage />
    </LanguageContext.Provider>
  );
});

describe("Rendering", () => {
  it("should render all the components correctly", () => {
    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        activeIndex: 0,
        dotGap: 12,
        dotSize: 12,
        dotsCount: 8,
        visibleDotsCount: 8,
      })
    );

    expect(mockChildComponent).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("slider-prev-button")).toBeInTheDocument();
    expect(screen.getByTestId("slider-next-button")).toBeInTheDocument();
    expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
    expect(screen.getByText("Change slide 5!")).toBeInTheDocument();
    expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
  });
});

describe("Changing slides", () => {
  it("should change slide when clicking the dots", async () => {
    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        activeIndex: 0,
      })
    );

    expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
    expect(screen.queryByAltText("slideshow-5")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Change slide 5!"));
    expect(mockChildComponent).toHaveBeenCalledTimes(2);

    expect(mockChildComponent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        activeIndex: 5,
      })
    );

    expect(screen.getByAltText("slideshow-5")).toBeInTheDocument();
    expect(screen.queryByAltText("slideshow-0")).not.toBeInTheDocument();
  });

  it("should move to the next slide when clicking the arrow", () => {
    testCases.forEach((testCase) => {
      expect(mockChildComponent).toHaveBeenCalledTimes(testCase.first + 1);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.first,
        })
      );

      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("slider-next-button"));
      expect(mockChildComponent).toHaveBeenCalledTimes(testCase.first + 2);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.second,
        })
      );

      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();
    });
  });

  it("should move to the previous slide when clicking the arrow", () => {
    [...testCases].reverse().forEach((testCase, index) => {
      expect(mockChildComponent).toHaveBeenCalledTimes(index + 1);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.second,
        })
      );

      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("slider-prev-button"));
      expect(mockChildComponent).toHaveBeenCalledTimes(index + 2);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.first,
        })
      );

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
      expect(mockChildComponent).toHaveBeenCalledTimes(testCase.first + 1);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.first,
        })
      );

      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();

      act(() => jest.runOnlyPendingTimers());
      expect(mockChildComponent).toHaveBeenCalledTimes(testCase.first + 2);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.second,
        })
      );

      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();
    });
  });
});
