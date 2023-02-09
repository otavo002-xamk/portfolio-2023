import Equation from "../pages/childcomponents/Equation";
import { fireEvent, render, screen } from "@testing-library/react";

const randomNumbers = [32, 17, 94];
const sum = randomNumbers[0] + randomNumbers[1] + randomNumbers[2];
const falseOption = 114;
const tableOfOptions = [88, falseOption, sum, 200];
const setNextButtonDisabled = jest.fn();
const addPoint = jest.fn();

beforeEach(() => {
  render(
    <Equation
      randomNumbers={randomNumbers}
      tableOfOptions={tableOfOptions}
      setNextButtonDisabled={setNextButtonDisabled}
      addPoint={addPoint}
    />
  );
});

describe("Rendering", () => {
  it.each(randomNumbers)(
    "should render random number %i correctly",
    (number) => {
      expect(screen.getByText(number.toString())).toBeInTheDocument();
    }
  );

  it("should render +, = & ? correctly", () => {
    expect(screen.getAllByText("+")).toHaveLength(2);
    expect(screen.getByText("=")).toBeInTheDocument();
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("should include the correct sum in the optons list", () => {
    expect(screen.getByText(sum.toString())).toBeInTheDocument();
  });
});

describe("Choosing options", () => {
  it("should show the correct icon when the correct number is clicked", () => {
    expect(screen.queryByAltText("correct")).not.toBeInTheDocument();
    expect(screen.queryByAltText("false")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(sum.toString()));
    expect(screen.getByAltText("correct")).toBeInTheDocument();
    expect(screen.queryByAltText("false")).not.toBeInTheDocument();
  });

  it("should show both the correct & false icons when a false number is clicked", () => {
    expect(screen.queryByAltText("correct")).not.toBeInTheDocument();
    expect(screen.queryByAltText("false")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(falseOption.toString()));
    expect(screen.getByAltText("correct")).toBeInTheDocument();
    expect(screen.getByAltText("false")).toBeInTheDocument();
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
