import ThemeToggler from "../ThemeToggler";
import { fireEvent, render, screen } from "@testing-library/react";

const updateTheme = jest.fn();

beforeAll(() => render(<ThemeToggler handleClick={updateTheme} />));

describe("Component rendering and function calling", () => {
  it("should call a function when clicked", () => {
    fireEvent.click(screen.getByAltText("sun"));
    expect(updateTheme).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByAltText("moon"));
    expect(updateTheme).toHaveBeenCalledTimes(2);
  });
});
