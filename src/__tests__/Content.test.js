import Content from "../Content";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ThemeContext, themes } from "../theme-context";

const testRouter = createMemoryRouter([
  {
    path: "/",
    element: <Content />,
    children: [
      {
        index: true,
        element: <p>Child component!</p>,
      },
    ],
  },
]);

const theme = themes.light;
beforeAll(() =>
  render(
    <ThemeContext.Provider value={{ theme }}>
      <RouterProvider router={testRouter} />
    </ThemeContext.Provider>
  )
);

it("renders", () => {
  expect(screen.getByText("Content")).toBeInTheDocument();
  expect(screen.getByText("Child component!")).toBeInTheDocument();
});
