import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeftNavBar from "../LeftNavBar";
import "@testing-library/jest-dom";
import {
  RouterProvider,
  createMemoryRouter,
  Outlet,
  Link,
} from "react-router-dom";
import { ThemeContext, themes } from "../theme-context";

const testRouter = createMemoryRouter([
  {
    path: "/",
    element: (
      <>
        <Link to="/">Front page</Link>
        <LeftNavBar />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <p>Front!</p>,
      },
      {
        path: "sample1",
        element: <p>Sample 1!</p>,
      },
      {
        path: "sample2",
        element: <p>Sample 2!</p>,
      },
      {
        path: "sample3",
        element: <p>Sample 3!</p>,
      },
      {
        path: "sample4",
        element: <p>Sample 4!</p>,
      },
    ],
  },
]);

const testCases = [
  {
    path: "/sample1",
    text: "Sample 1",
    content: "Sample 1!",
  },
  {
    path: "/sample2",
    text: "Sample 2",
    content: "Sample 2!",
  },
  {
    path: "/sample3",
    text: "Sample 3",
    content: "Sample 3!",
  },
  {
    path: "/sample4",
    text: "Sample 4",
    content: "Sample 4!",
  },
];

const mockChildComponent = jest.fn();
const theme = themes.light;

jest.mock("../MenuButton", () => (props) => {
  mockChildComponent(props);
  return (
    <div onClick={props.handleMenuChange}>
      {props.menuOpen ? "Menu open!" : "Menu closed!"}
    </div>
  );
});

beforeEach(() =>
  render(
    <ThemeContext.Provider value={{ theme }}>
      <RouterProvider router={testRouter} />
    </ThemeContext.Provider>
  )
);

describe("Only frontpage renders initially", () => {
  it("should render frontpage before any link is clicked", () =>
    expect(screen.getByText("Front!")).toBeInTheDocument());

  it.each(testCases)(
    "should not render content $content from path $path",
    ({ content }) => expect(screen.queryByText(content)).not.toBeInTheDocument()
  );
});

describe("Clicking link renders match", () => {
  it.each(testCases)(
    "should render content $content in path $path",
    async ({ text, content }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
      expect(screen.queryByText(content)).not.toBeInTheDocument();
      fireEvent.click(screen.getByText(text));

      await waitFor(() => {
        expect(screen.getByText(content)).toBeInTheDocument();
        expect(screen.queryByText("Front!")).not.toBeInTheDocument();
      });
    }
  );
});

describe("Menu open state changes", () => {
  it("should toggle the menu open state", () => {
    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        menuOpen: false,
      })
    );
    expect(screen.getByText("Menu closed!")).toBeInTheDocument();
    expect(screen.queryByText("Menu open!")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Menu closed!"));
    expect(screen.getByText("Menu open!")).toBeInTheDocument();
    expect(screen.queryByText("Menu closed!")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Menu open!"));
    expect(screen.getByText("Menu closed!")).toBeInTheDocument();
    expect(screen.queryByText("Menu open!")).not.toBeInTheDocument();
  });

  it.each([...testCases, { path: "/", text: "Front page", content: "Front!" }])(
    "should close the menu when location chages to $path",
    ({ text }) => {
      expect(mockChildComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          menuOpen: false,
        })
      );
      expect(screen.getByText("Menu closed!")).toBeInTheDocument();
      expect(screen.queryByText("Menu open!")).not.toBeInTheDocument();
      fireEvent.click(screen.getByText("Menu closed!"));
      expect(screen.getByText("Menu open!")).toBeInTheDocument();
      expect(screen.queryByText("Menu closed!")).not.toBeInTheDocument();
      fireEvent.click(screen.getByText(text));
      expect(screen.getByText("Menu closed!")).toBeInTheDocument();
      expect(screen.queryByText("Menu open!")).not.toBeInTheDocument();
    }
  );
});
