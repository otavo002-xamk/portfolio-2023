import Equation from "../pages/childcomponents/Equation";
import { languages } from "../language-context";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";

const language = languages.en;
const { timeEnded, timeLeft, correct, incorrect } =
  language.pages.mathGame.equation;
const randomNumbers = [32, 17, 94];
const sum = randomNumbers[0] + randomNumbers[1] + randomNumbers[2];
const falseOption = 114;
const tableOfOptions = [88, falseOption, sum, 200];
const setNextButtonDisabled = jest.fn();
const addPoint = jest.fn();

const renderComponent = (hide = false) =>
  render(
    <Equation
      index={1}
      shouldBeHidden={hide}
      language={language}
      randomNumbers={randomNumbers}
      tableOfOptions={tableOfOptions}
      setNextButtonDisabled={setNextButtonDisabled}
      addPoint={addPoint}
    />
  );

afterEach(() => jest.clearAllTimers());

describe("Rendering", () => {
  beforeEach(() => renderComponent());

  it.each(randomNumbers)("should render random number %i correctly", (number) =>
    expect(screen.getByText(number.toString())).toBeInTheDocument()
  );

  it("should render +, = & ? correctly", () => {
    expect(screen.getAllByText("+")).toHaveLength(2);
    expect(screen.getByText("=")).toBeInTheDocument();
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("should include the correct sum in the optons list", () =>
    expect(screen.getByText(sum.toString())).toBeInTheDocument());
});

describe("Hiding component", () => {
  beforeEach(() => renderComponent(true));

  it("should hide the component", () =>
    expect(screen.getByTestId("equation-1")).not.toBeVisible());
});

describe("Choosing options", () => {
  beforeEach(() => renderComponent());

  it("should show the correct icon and message when the correct number is clicked", () => {
    expect(screen.queryByAltText("correct")).not.toBeInTheDocument();
    expect(screen.queryByAltText("incorrect")).not.toBeInTheDocument();
    expect(screen.queryByText(correct)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(sum.toString()));
    expect(screen.getByAltText("correct")).toBeInTheDocument();
    expect(screen.queryByAltText("incorrect")).not.toBeInTheDocument();
    expect(screen.getByText(correct)).toBeInTheDocument();
    expect(screen.queryByText(incorrect)).not.toBeInTheDocument();
    expect(screen.queryByText(timeEnded)).not.toBeInTheDocument();
  });

  it("should show both the correct & false icons and a message when a false number is clicked", () => {
    expect(screen.queryByAltText("correct")).not.toBeInTheDocument();
    expect(screen.queryByAltText("incorrect")).not.toBeInTheDocument();
    expect(screen.queryByText(incorrect)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(falseOption.toString()));
    expect(screen.getByAltText("correct")).toBeInTheDocument();
    expect(screen.getByAltText("incorrect")).toBeInTheDocument();
    expect(screen.getByText(incorrect)).toBeInTheDocument();

    [correct, timeEnded].forEach((text) =>
      expect(screen.queryByText(text)).not.toBeInTheDocument()
    );
  });

  jest.useFakeTimers();

  it("should render a message and set the NEXT-button enabled when waiting for the time to end", async () => {
    expect(screen.getByText(new RegExp(timeLeft))).toBeInTheDocument();
    expect(setNextButtonDisabled).not.toHaveBeenCalled();

    [timeEnded, correct, incorrect].forEach((text) =>
      expect(screen.queryByText(text)).not.toBeInTheDocument()
    );

    await act(() => jest.advanceTimersByTime(10000));

    await waitFor(() =>
      expect(screen.getByText(timeEnded)).toBeInTheDocument()
    );

    [correct, incorrect, new RegExp(timeLeft)].forEach((text) =>
      expect(screen.queryByText(text)).not.toBeInTheDocument()
    );

    expect(setNextButtonDisabled).toHaveBeenCalledTimes(1);
    expect(addPoint).not.toHaveBeenCalled();
    expect(setNextButtonDisabled).toHaveBeenCalledWith(false);
  });

  it("should call to addPoint() & setNextButtonDisabled() -functions when the correct number is clicked", () => {
    expect(setNextButtonDisabled).not.toHaveBeenCalled();
    expect(addPoint).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(sum.toString()));
    expect(setNextButtonDisabled).toHaveBeenCalledTimes(1);
    expect(addPoint).toHaveBeenCalledTimes(1);
    expect(setNextButtonDisabled).toHaveBeenCalledWith(false);
  });

  it("should call only the setNextButtonDisabled() -functions when the false number is clicked", () => {
    expect(setNextButtonDisabled).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(falseOption.toString()));
    expect(setNextButtonDisabled).toHaveBeenCalledTimes(1);
    expect(addPoint).not.toHaveBeenCalled();
    expect(setNextButtonDisabled).toHaveBeenCalledWith(false);
  });
});
