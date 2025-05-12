import { RouterProvider } from "react-router-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import testRouter from "../testRouter";
import { languages } from "../language-context";
import {
  testComponentRendering,
  testPlusEqualsQuestionMarkSymbolMarks,
  testEndResultsAreShown,
  testSuccessMessageAndResults,
  testPageReload,
  testThreeRandomNumbersAndSum,
  testStartButtonWorks,
} from "../testfunctions/MathGameTestFunctions";
import {
  mockFn,
  images,
  mockFetch,
  testPlayPauseToggleState,
  testElementRendering,
  testMiniSliderDoesntRender,
  testNoPicturesFoundNotification,
  testTooLargeNumberInsertedNotification,
  insertSolSelectCameraAndClickButton,
  testImagesRendering,
  testNoConnectionNotification,
} from "../testfunctions/NasaAPITestFunctions";
import {
  testTitleAndFirstFetchCall,
  selectEmptyTableAndTestMessage,
  selectTableAndTestTableIsVisible,
  testOnlyDBSelectComponentIsVisible,
  withConnectionStartUp,
  withNoConnectionStartUp,
  testOnlyErrorTextVisible,
} from "../testfunctions/DataBaseTestFunctions";
import { cameraNames } from "../pages/additions/cameraNames";

jest.mock("../language-context");
const { mathGame, nasaAPI, dataBase, links } = languages.en.pages;
const navBarLinks = [mathGame, nasaAPI, dataBase, links];
const testCases = [];

for (let i = 0; i < 8; i++) {
  i < 7
    ? testCases.push({ first: i, second: i + 1 })
    : testCases.push({ first: i, second: 0 });
}

describe("Top Header", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(1)} />));

  it("should render the home-icon image-element", () =>
    expect(screen.getByAltText("home")).toBeInTheDocument());

  it("should redirect to front-page when image is clicked", async () => {
    expect(screen.getByText(mathGame.title)).toBeInTheDocument();
    expect(screen.queryByAltText("slideshow-0")).not.toBeInTheDocument();
    fireEvent.click(screen.getByAltText("home"));
    expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
    expect(screen.queryByText(mathGame.title)).not.toBeInTheDocument();
  });
});

describe("The Language Toggler", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should change the language from english to finnish & back to english", async () => {
    expect(screen.getByText(mathGame.link)).toBeInTheDocument();
    expect(screen.queryByText("Matikkapeli")).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId("language-toggler-input"), {
      target: { value: "fi" },
    });

    await waitFor(() =>
      expect(screen.getByTestId("finnish-flag")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("finnish-flag"));
    expect(screen.getByText("Matikkapeli")).toBeInTheDocument();
    expect(screen.queryByText(mathGame.link)).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId("language-toggler-input"), {
      target: { value: "en" },
    });

    await waitFor(() =>
      expect(screen.getByTestId("english-flag")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("english-flag"));
    expect(screen.getByText(mathGame.link)).toBeInTheDocument();
    expect(screen.queryByText("Matikkapeli")).not.toBeInTheDocument();
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
      expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
      expect(screen.queryByText(navBarLink.title)).not.toBeInTheDocument();
      fireEvent.click(screen.getByText(navBarLink.link));
      expect(screen.getByText(navBarLink.title)).toBeInTheDocument();
      expect(screen.queryByAltText("slideshow-0")).not.toBeInTheDocument();
    }
  );
});

describe("Front Page", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the content", () => {
    expect(screen.getByAltText("slideshow-0")).toBeInTheDocument();
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

describe("MathGame", () => {
  const renderAndStart = (clickStart = true) => {
    render(<RouterProvider router={testRouter(1)} />);
    clickStart && fireEvent.click(screen.getByText(mathGame.start));
  };

  describe("Starting", () => {
    beforeEach(() => renderAndStart(false));

    it("should render the Start!-button and start game after clicking it", () =>
      testStartButtonWorks());
  });

  describe("Rendering", () => {
    beforeEach(() => renderAndStart());
    afterEach(() => jest.clearAllTimers());
    it("should render elements correctly", () => testComponentRendering());

    it.each([0, 1, 2, 3, 4])(
      "should render the right symbols in equation index %d",
      (index) => testPlusEqualsQuestionMarkSymbolMarks(index)
    );

    it.each([0, 1, 2, 3, 4])(
      "should render the three random numbers for index %d and the sum of each in the options table",
      (index) => testThreeRandomNumbersAndSum(index)
    );
  });

  describe("Choosing and clicking next", () => {
    beforeEach(() => renderAndStart());

    it("should give the results, after choosing and clicking next enough times", () =>
      testEndResultsAreShown());

    it("should give the succes-message + results after choosing and clicking next enough times", () =>
      testSuccessMessageAndResults());
  });

  describe("Start over button", () => {
    beforeEach(() => renderAndStart());

    it("should reload the page when the start-over-button is clicked", () =>
      testPageReload());
  });
});

describe("NASA API", () => {
  describe("Rendering", () => {
    beforeEach(() => render(<RouterProvider router={testRouter(2)} />));

    it("should render elements", () => {
      testElementRendering();
      testMiniSliderDoesntRender();
    });
  });

  describe("Warning texts", () => {
    beforeEach(() => {
      render(<RouterProvider router={testRouter(2)} />);
      mockFetch([]);
    });

    it("should give a notification when no pictures were found", async () => {
      await testNoPicturesFoundNotification();
      testMiniSliderDoesntRender();
    });

    it("should give a notification when too large number is inserted", () => {
      testTooLargeNumberInsertedNotification();
      testMiniSliderDoesntRender();
    });

    it("should give a notification when no connection is found", async () => {
      await testNoConnectionNotification();
      testMiniSliderDoesntRender();
    });
  });

  describe("API call", () => {
    beforeEach(() => {
      render(<RouterProvider router={testRouter(2)} />);
      mockFetch(images, true);
    });

    it.each(cameraNames)(
      "should send the right parameters with the API call with camera $abbreviation",
      async (camera) => {
        await insertSolSelectCameraAndClickButton(camera);
        expect(mockFn).toHaveBeenCalledTimes(1);

        expect(mockFn).toHaveBeenCalledWith("/nasa_api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sol: "4099",
            camera: camera.abbreviation,
          }),
        });
      }
    );
  });

  describe("Rendering slider", () => {
    beforeEach(() => {
      render(<RouterProvider router={testRouter(2)} />);
      mockFetch(images);
      jest.useFakeTimers();
    });

    afterEach(() => jest.useRealTimers());

    it("should render each of the images one by one", async () =>
      await testImagesRendering());

    it("should toggle the play/pause -state when clicking the button", async () => {
      fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
        target: { value: "24" },
      });

      fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
      expect(screen.getByTestId("nasa-api-loader")).toBeInTheDocument();
      await waitForElementToBeRemoved(screen.getByTestId("nasa-api-loader"));
      testPlayPauseToggleState();
    });
  });
});

describe("Database", () => {
  describe("With connection", () => {
    beforeEach(() => withConnectionStartUp());

    it("should call the api and render elements correctly", () => {
      testTitleAndFirstFetchCall();
      testOnlyDBSelectComponentIsVisible();
      selectTableAndTestTableIsVisible();
      selectEmptyTableAndTestMessage();
    });
  });

  describe("With no connection", () => {
    beforeEach(() => withNoConnectionStartUp());

    it("should render error text only", () => {
      testTitleAndFirstFetchCall();
      testOnlyErrorTextVisible();
    });
  });
});

describe("Footer", () => {
  beforeEach(() => render(<RouterProvider router={testRouter(0)} />));

  it("should render the footer", () =>
    expect(screen.getByText("Portfolio 2023")).toBeInTheDocument());
});
