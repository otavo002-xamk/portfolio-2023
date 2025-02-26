import { render, screen, fireEvent } from "@testing-library/react";
import TopHeader from "../TopHeader";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter, Outlet } from "react-router-dom";

const testRouter = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <>
          <TopHeader />
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: <p>Front!</p>,
        },
        {
          path: "MathGame",
          element: <p>Sample 1!</p>,
        },
      ],
    },
  ],
  {
    initialEntries: ["/MathGame"],
    initialIndex: 0,
  }
);

const mockChildComponent = jest.fn();

jest.mock("../ThemeToggler", () => (props) => {
  mockChildComponent(props);
  return <p>Theme Toggler!</p>;
});

jest.mock("../LanguageToggler", () => () => {
  mockChildComponent();
  return <p>Language Toggler!</p>;
});

beforeEach(() => {
  jest.clearAllMocks();
  render(<RouterProvider router={testRouter} />);
});

describe("Link works", () => {
  it("should redirect to front page when the home-icon is clicked", async () => {
    expect(screen.getByText("Sample 1!")).toBeInTheDocument();
    expect(screen.queryByText("Front!")).not.toBeInTheDocument();
    fireEvent.click(screen.getByAltText("home"));
    expect(screen.getByText("Front!")).toBeInTheDocument();
    expect(screen.queryByText("Sample 1!")).not.toBeInTheDocument();
  });

  it("should render the ThemeToggler & LanguageToggler components", () => {
    expect(mockChildComponent).toHaveBeenCalledTimes(2);
    expect(screen.getByText("Theme Toggler!")).toBeInTheDocument();
    expect(screen.getByText("Language Toggler!")).toBeInTheDocument();
  });
});
