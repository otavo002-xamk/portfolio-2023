import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";
import { screen, render, within, fireEvent } from "@testing-library/react";

jest.mock("../language-context");
const language = languages.en;
const { title, startOver } = language.pages.mathGame;

beforeEach(() => {
  render(
    <LanguageContext.Provider value={{ language }}>
      <MathGame />
    </LanguageContext.Provider>
  );
});

describe("Rendering", () => {
  it("should render elements correctly", () => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(startOver)).toBeInTheDocument();
    expect(screen.getByText(/NEXT/)).toBeInTheDocument();
  });

  it.each([0, 1, 2, 3, 4])(
    "should render the right elements in equation index %d",
    (index) => {
      expect(
        within(screen.getByTestId(`equation-${index}`)).getAllByText("+")
      ).toHaveLength(2);

      expect(
        within(screen.getByTestId(`equation-${index}`)).getAllByText("=")
      ).toHaveLength(1);

      expect(
        within(screen.getByTestId(`equation-${index}`)).getAllByText("?")
      ).toHaveLength(1);
    }
  );

  it.each([0, 1, 2, 3, 4])(
    "should render the three random numbers for index %d and the sum of each in the options table",
    (index) => {
      let randomNumbers = [];

      [1, 2, 3].forEach((randomNumber) => {
        randomNumbers.push(
          Number(
            screen.getByTestId(`random-number-${index}-${randomNumber}`)
              .textContent
          )
        );

        expect(
          screen.getByTestId(`random-number-${index}-${randomNumber}`)
        ).toBeInTheDocument();

        expect(
          Number(
            screen.getByTestId(`random-number-${index}-${randomNumber}`)
              .textContent
          )
        ).toBeLessThanOrEqual(100);

        expect(
          Number(
            screen.getByTestId(`random-number-${index}-${randomNumber}`)
              .textContent
          )
        ).toBeGreaterThanOrEqual(0);
      });

      let sum = randomNumbers[0] + randomNumbers[1] + randomNumbers[2];

      expect(
        within(screen.getByTestId(`equation-${index}`)).getAllByText(
          String(sum)
        ).length
      ).toBeGreaterThanOrEqual(1);
    }
  );
});

describe("Choosing and clicking next", () => {
  it("should give the results, after choosing and clicking next enough times", () => {
    [1, 2, 3, 4, 5].forEach((nthTime) => {
      let randomNumbers = [];

      [1, 2, 3].forEach((randomNumber) => {
        randomNumbers.push(
          Number(
            screen.getByTestId(`random-number-${nthTime - 1}-${randomNumber}`)
              .textContent
          )
        );
      });

      let sum = randomNumbers[0] + randomNumbers[1] + randomNumbers[2];

      [1, 2, 3, 4, 5].forEach((index) => {
        nthTime === index
          ? expect(screen.getByTestId(`equation-${index - 1}`)).toBeVisible
          : expect(screen.getByTestId(`equation-${index - 1}`)).not.toBeVisible;
      });

      expect(screen.getByText(/NEXT/)).toBeDisabled();
      screen.getByTestId(`equation-options-table-td-${nthTime}-1`)
        .textContent != sum
        ? fireEvent.click(
            screen.getByTestId(`equation-options-table-td-${nthTime}-1`)
          )
        : fireEvent.click(
            screen.getByTestId(`equation-options-table-td-${nthTime}-2`)
          );
      expect(screen.getByText(/NEXT/)).not.toBeDisabled();
      fireEvent.click(screen.getByText(/NEXT/));
    });
  });
});
