import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
          path: "sample1",
          element: <p>Sample 1!</p>,
        },
      ],
    },
  ],
  {
    initialEntries: ["/sample1"],
    initialIndex: 0,
  }
);

beforeAll(() => render(<RouterProvider router={testRouter} />));

describe("Link works", () => {
  it("should redirect to front page when the home-icon is clicked", async () => {
    expect(screen.getByText("Sample 1!")).toBeInTheDocument();
    expect(screen.queryByText("Front!")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("img", { Name: "home" }));
    await waitFor(() => {
      expect(screen.getByText("Front!")).toBeInTheDocument();
      expect(screen.queryByText("Sample 1!")).not.toBeInTheDocument();
    });
  });
});
