import Content from "../Content";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

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

beforeAll(() => render(<RouterProvider router={testRouter} />));

it("renders", () => {
  expect(screen.getByText("Content")).toBeInTheDocument();
  expect(screen.getByText("Child component!")).toBeInTheDocument();
});
