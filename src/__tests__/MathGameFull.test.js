import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";
import { screen, render, within, fireEvent } from "@testing-library/react";

jest.mock("../language-context");
const language = languages.en;
const { title, startOver, successMessage, yourResults } =
  language.pages.mathGame;

const calculateSum = (nthTime, cb) => {
  let randomNumbers = [];

  [0, 1, 2].forEach((randomNumber) => {
    randomNumbers.push(
      Number(
        screen.getByTestId(`random-number-${nthTime}-${randomNumber}`)
          .textContent
      )
    );
  });

  cb(randomNumbers[0] + randomNumbers[1] + randomNumbers[2]);
};

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
      [0, 1, 2].forEach((randomNumber) => {
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

      calculateSum(index, (sum) => {
        expect(
          within(screen.getByTestId(`equation-${index}`)).getAllByText(
            String(sum)
          ).length
        ).toBeGreaterThanOrEqual(1);
      });
    }
  );
});

describe("Choosing and clicking next", () => {
  const testEquationVisibilities = (nthTime) => {
    [0, 1, 2, 3, 4].forEach((index) => {
      nthTime === index
        ? expect(screen.getByTestId(`equation-${index}`)).toBeVisible
        : expect(screen.getByTestId(`equation-${index}`)).not.toBeVisible;
    });
  };

  it("should give the results, after choosing and clicking next enough times", () => {
    expect(screen.queryByText(/Your results: /)).not.toBeInTheDocument();
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();

    [0, 1, 2, 3, 4].forEach((nthTime) => {
      expect(screen.getByText("0 / 5")).toBeInTheDocument();
      testEquationVisibilities(nthTime);
      expect(screen.getByText(/NEXT/)).toBeDisabled();

      calculateSum(nthTime, (sum) =>
        screen.getByTestId(`equation-options-table-td-${nthTime}-0`)
          .textContent != sum
          ? fireEvent.click(
              screen.getByTestId(`equation-options-table-td-${nthTime}-0`)
            )
          : fireEvent.click(
              screen.getByTestId(`equation-options-table-td-${nthTime}-1`)
            )
      );

      expect(screen.getByText(/NEXT/)).not.toBeDisabled();
      fireEvent.click(screen.getByText(/NEXT/));
    });

    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
    expect(screen.getByText(`${yourResults}: 0 / 5`)).toBeInTheDocument();
  });

  it("should give the succes-message + results after choosing and clicking next enough times", () => {
    expect(screen.queryByText(/Your results: /)).not.toBeInTheDocument();
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument();

    [0, 1, 2, 3, 4].forEach((nthTime) => {
      expect(screen.getByText(`${nthTime} / 5`)).toBeInTheDocument();
      testEquationVisibilities(nthTime);
      expect(screen.getByText(/NEXT/)).toBeDisabled();

      calculateSum(nthTime, (sum) =>
        [0, 1, 2, 3].forEach((optionIndex) => {
          screen.getByTestId(
            `equation-options-table-td-${nthTime}-${optionIndex}`
          ).textContent == sum &&
            fireEvent.click(
              screen.getByTestId(
                `equation-options-table-td-${nthTime}-${optionIndex}`
              )
            );
        })
      );

      expect(screen.getByText(/NEXT/)).not.toBeDisabled();
      fireEvent.click(screen.getByText(/NEXT/));
    });

    expect(screen.queryByText(successMessage)).toBeInTheDocument();
    expect(screen.getByText(`${yourResults}: 5 / 5`)).toBeInTheDocument();
  });
});
