import MenuButton from "../MenuButton";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const changeMenuOpen = jest.fn();

beforeAll(() =>
  render(<MenuButton handleMenuChange={changeMenuOpen} menuOpen={false} />)
);

describe("Component rendering and function calling", () => {
  it("should render the component and call the function", async () => {
    fireEvent.click(screen.getByTestId("menu-container"));
    await waitFor(() => expect(changeMenuOpen).toHaveBeenCalledTimes(1));
  });
});
