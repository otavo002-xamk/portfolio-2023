import { fireEvent, render, screen, act } from "@testing-library/react";
import { LanguageContext, languages } from "../language-context";
import FrontPage from "../pages/FrontPage";

jest.mock("../language-context");
const mockChildComponent = jest.fn();
const language = languages.en;
const testCases = [];

for (let i = 0; i < 8; i++) {
  if (i < 7) {
    testCases.push({ first: i, second: i + 1 });
  } else {
    testCases.push({ first: i, second: 0 });
  }
}

jest.mock("react-any-slider-dots", () => {
  return {
    ReactAnySliderDots: (props) => {
      mockChildComponent(props);

      return (
        <p id="sliderdot5" onClick={props.handleClick}>
          Change slide 5!
        </p>
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
    expect(screen.getByAltText("slideshow")).toBeInTheDocument();
    expect(screen.getByText("Change slide 5!")).toBeInTheDocument();
    expect(screen.getByText("Front Page!")).toBeInTheDocument();
  });
});

describe("Changing slides", () => {
  it("should change slide when clicking the dots", async () => {
    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        activeIndex: 0,
      })
    );

    fireEvent.click(screen.getByText("Change slide 5!"));
    expect(mockChildComponent).toHaveBeenCalledTimes(2);

    expect(mockChildComponent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        activeIndex: 5,
      })
    );
  });

  it("should move to the next slide when clicking the arrow", () => {
    testCases.forEach((testCase, index) => {
      expect(mockChildComponent).toHaveBeenCalledTimes(index + 1);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.first,
        })
      );

      fireEvent.click(screen.getByTestId("slider-next-button"));
      expect(mockChildComponent).toHaveBeenCalledTimes(index + 2);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.second,
        })
      );
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

      fireEvent.click(screen.getByTestId("slider-prev-button"));
      expect(mockChildComponent).toHaveBeenCalledTimes(index + 2);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.first,
        })
      );
    });
  });

  jest.useFakeTimers();

  it("should move to the next slide automatically in every 5 seconds", () => {
    testCases.forEach((testCase, index) => {
      expect(mockChildComponent).toHaveBeenCalledTimes(index + 1);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.first,
        })
      );

      act(() => jest.runOnlyPendingTimers());
      expect(mockChildComponent).toHaveBeenCalledTimes(index + 2);

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeIndex: testCase.second,
        })
      );
    });
  });
});
