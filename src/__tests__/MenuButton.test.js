import MenuButton from "../MenuButton";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

const changeMenuOpen = jest.fn();
const invalidProp = "invalid prop";

describe("Component rendering and function calling", () => {
  beforeAll(() =>
    render(<MenuButton handleMenuChange={changeMenuOpen} menuOpen={false} />)
  );

  it("should render the component and call the function", () => {
    fireEvent.click(screen.getByTestId("menu-container"));
    () => expect(changeMenuOpen).toHaveBeenCalledTimes(1);
  });
});

describe("Invalid props", () => {
  console.error = jest.fn();

  it("should throw error when the component is rendered without handleMenuChange prop", () => {
    render(<MenuButton menuOpen={false} />);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it("should throw error when the component is rendered with handleMenuChange prop that is not a function", () => {
    render(<MenuButton handleMenuChange={invalidProp} menuOpen={false} />);
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});
