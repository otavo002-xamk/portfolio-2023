import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeftNavBar from "../LeftNavBar";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter, Outlet } from "react-router-dom";

const testRouter = createMemoryRouter([
  {
    path: "/",
    element: (
      <>
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

beforeEach(() => render(<RouterProvider router={testRouter} />));

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
