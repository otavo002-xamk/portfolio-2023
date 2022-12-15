import { RouterProvider } from "react-router-dom";
import { render, screen, act, fireEvent } from "@testing-library/react";
import testRouter from "../testRouter";

const navBarLinks = [
  ["Sample 1", "Sample 1!"],
  ["Sample 2", "Sample 2!"],
  ["Sample 3", "Sample 3!"],
  ["Sample 4", "Sample 4!"],
];

describe("Top Header", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(1)} />));

  it("should render the home-icon image-element", () => {
    expect(screen.getByRole("img", { Name: "home" })).toBeInTheDocument();
  });

  it("should redirect to front-page when image is clicked", async () => {
    expect(screen.getByText("Sample 1!")).toBeInTheDocument();
    expect(screen.queryByText("Front!")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("img", { Name: "home" }));
    expect(screen.getByText("Front Page!")).toBeInTheDocument();
    expect(screen.queryByText("Sample 1!")).not.toBeInTheDocument();
  });
});

describe("LeftNavBar", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the burger-menu-button", () =>
    expect(screen.getByTestId("menu-container")).toBeInTheDocument());

  it.each(navBarLinks)(
    "should render the navbar link %s and render page %s when the link is clicked",
    (navBarLink, pathContent) => {
      expect(screen.getByText(navBarLink)).toBeInTheDocument();
      expect(screen.getByText("Front Page!")).toBeInTheDocument();
      expect(screen.queryByText(pathContent)).not.toBeInTheDocument();
      fireEvent.click(screen.getByText(navBarLink));
      expect(screen.getByText(pathContent)).toBeInTheDocument();
      expect(screen.queryByText("Front Page!")).not.toBeInTheDocument();
    }
  );
});

describe("Content", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the content", () => {
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Front Page!")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the footer", () => {
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});