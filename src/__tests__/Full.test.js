import { RouterProvider } from "react-router-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import testRouter from "../testRouter";
import { languages } from "../language-context";

const { frontPage, mathGame, sample2, sample3, sample4 } = languages.en.pages;
const navBarLinks = [mathGame, sample2, sample3, sample4];
const testCases = [];

for (let i = 0; i < 8; i++) {
  i < 7
    ? testCases.push({ first: i, second: i + 1 })
    : testCases.push({ first: i, second: 0 });
}

describe("Top Header", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(1)} />));

  it("should render the home-icon image-element", () => {
    expect(screen.getByAltText("home")).toBeInTheDocument();
  });

  it("should redirect to front-page when image is clicked", async () => {
    expect(screen.getByText(mathGame.content)).toBeInTheDocument();
    expect(screen.queryByText(frontPage.content)).not.toBeInTheDocument();
    fireEvent.click(screen.getByAltText("home"));
    expect(screen.getByText(frontPage.content)).toBeInTheDocument();
    expect(screen.queryByText(mathGame.content)).not.toBeInTheDocument();
  });
});

describe("The Language Toggler", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should change the language from english to finnish & back to english", async () => {
    expect(screen.queryByText(frontPage.content)).toBeInTheDocument();
    expect(screen.queryByText("Etusivu!")).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId("language-toggler-input"), {
      target: { value: "fi" },
    });

    await waitFor(() =>
      expect(screen.getByTestId("finnish-flag")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("finnish-flag"));

    await waitFor(() => {
      expect(screen.getByText("Etusivu!")).toBeInTheDocument();
      expect(screen.queryByText(frontPage.content)).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("language-toggler-input"), {
      target: { value: "en" },
    });

    await waitFor(() =>
      expect(screen.getByTestId("english-flag")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("english-flag"));

    await waitFor(() => {
      expect(screen.getByText(frontPage.content)).toBeInTheDocument();
      expect(screen.queryByText("Etusivu!")).not.toBeInTheDocument();
    });
  });
});

describe("LeftNavBar", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the burger-menu-button", () =>
    expect(screen.getByTestId("menu-container")).toBeInTheDocument());

  it.each(navBarLinks)(
    "should render the navbar link $link and render content $content when the link is clicked",
    (navBarLink) => {
      expect(screen.getByText(navBarLink.link)).toBeInTheDocument();
      expect(screen.getByText(frontPage.content)).toBeInTheDocument();
      expect(screen.queryByText(navBarLink.content)).not.toBeInTheDocument();
      fireEvent.click(screen.getByText(navBarLink.link));
      expect(screen.getByText(navBarLink.content)).toBeInTheDocument();
      expect(screen.queryByText(frontPage.content)).not.toBeInTheDocument();
    }
  );
});

describe("Front Page", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the content", () => {
    expect(screen.getByText(frontPage.content)).toBeInTheDocument();
    expect(screen.getByTestId("slider-prev-button")).toBeInTheDocument();
    expect(screen.getByTestId("slider-next-button")).toBeInTheDocument();
    expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
  });

  it("should move to the next slide when clicking the arrow", () => {
    testCases.forEach((testCase) => {
      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("slider-next-button"));

      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();
    });
  });

  it("should move to the previous slide when clicking the arrow", () => {
    [...testCases].reverse().forEach((testCase) => {
      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("slider-prev-button"));

      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();
    });
  });

  jest.useFakeTimers();

  it("should move to the next slide automatically in every 5 seconds", () => {
    testCases.forEach((testCase) => {
      expect(
        screen.getByAltText(`slideshow-${testCase.first}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.second}`)
      ).not.toBeInTheDocument();

      act(() => jest.runOnlyPendingTimers());

      expect(
        screen.getByAltText(`slideshow-${testCase.second}`)
      ).toBeInTheDocument();

      expect(
        screen.queryByAltText(`slideshow-${testCase.first}`)
      ).not.toBeInTheDocument();
    });
  });
});

describe("Footer", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the footer", () => {
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
