import { render, screen, fireEvent } from "@testing-library/react";
import LeftNavBar from "../LeftNavBar";
import "@testing-library/jest-dom";
import {
  RouterProvider,
  createMemoryRouter,
  Outlet,
  Link,
} from "react-router-dom";
import { LanguageContext, languages } from "../language-context";

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
        path: "MathGame",
        element: <p>Math Game!</p>,
      },
      {
        path: "NasaAPI",
        element: <p>Sample 2!</p>,
      },
      {
        path: "dataBase",
        element: <p>Database!</p>,
      },
      {
        path: "links",
        element: <p>Element of Links</p>,
      },
    ],
  },
]);

const testCases = [
  {
    path: "/MathGame",
    text: "Math Game",
    content: "Math Game!",
  },
  {
    path: "/NasaAPI",
    text: "Sample 2",
    content: "Sample 2!",
  },
  {
    path: "/dataBase",
    text: "Database",
    content: "Database!",
  },
  {
    path: "/links",
    text: "Links",
    content: "Element of Links",
  },
];

jest.mock("../language-context");
const mockChildComponent = jest.fn();
const language = languages.en;

jest.mock("../MenuButton", () => (props) => {
  mockChildComponent(props);
  return (
    <div data-testid="menu-change-handler" onClick={props.handleMenuChange} />
  );
});

beforeEach(() => {
  render(
    <LanguageContext.Provider value={{ language }}>
      <RouterProvider router={testRouter} />
    </LanguageContext.Provider>
  );
});

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
      expect(screen.getByText(content)).toBeInTheDocument();
      expect(screen.queryByText("Front!")).not.toBeInTheDocument();
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

    expect(mockChildComponent).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId("menu-change-handler"));

    expect(mockChildComponent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        menuOpen: true,
      })
    );

    expect(mockChildComponent).toHaveBeenCalledTimes(2);
    fireEvent.click(screen.getByTestId("menu-change-handler"));

    expect(mockChildComponent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        menuOpen: false,
      })
    );

    expect(mockChildComponent).toHaveBeenCalledTimes(3);
  });

  it.each([...testCases, { path: "/", text: "Front page", content: "Front!" }])(
    "should close the menu when location chages to $path",
    ({ text }) => {
      expect(mockChildComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          menuOpen: false,
        })
      );

      expect(mockChildComponent).toHaveBeenCalledTimes(1);
      fireEvent.click(screen.getByTestId("menu-change-handler"));

      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          menuOpen: true,
        })
      );

      expect(mockChildComponent).toHaveBeenCalledTimes(2);
      fireEvent.click(screen.getByText(text));
      expect(mockChildComponent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          menuOpen: false,
        })
      );
    }
  );
});
