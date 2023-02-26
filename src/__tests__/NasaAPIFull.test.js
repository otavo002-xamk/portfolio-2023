import { cameraNames } from "../pages/additions/cameraNames";
import {
  fireEvent,
  screen,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { languages } from "../language-context";
import {
  mockFn,
  images,
  mockFetch,
  renderComponent,
  testPlayPauseToggleState,
  testElementRendering,
  testNoPicturesFoundNotification,
  testTooLargeNumberInsertedNotification,
  testAPICallParameters,
} from "../testfunctions/NasaAPITestFunctions";

jest.mock("../language-context");
const nasaAPI = languages.en.pages.nasaAPI;

const testMiniSliderDoesntRender = () => {
  expect(screen.queryByAltText(/curiosity-/)).not.toBeInTheDocument();
  expect(screen.queryByAltText("play-slider")).not.toBeInTheDocument();
  expect(screen.queryByAltText("pause-slider")).not.toBeInTheDocument();
};

describe("Rendering", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("should render elements", () => {
    testElementRendering();
    testMiniSliderDoesntRender();
  });
});

describe("Warning texts", () => {
  beforeEach(() => {
    renderComponent();
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
});

describe("API call", () => {
  beforeEach(() => {
    renderComponent();
    mockFetch(images, true);
  });

  it.each(cameraNames)(
    "should send the right parameters with the API call with camera $abbreviation",
    async (camera) => {
      await testAPICallParameters(camera);
      expect(mockFn).toHaveBeenCalledTimes(1);

      expect(mockFn).toHaveBeenCalledWith(
        expect.stringContaining("sol=3495" && `camera=${camera.abbreviation}`)
      );
    }
  );
});

describe("Rendering slider", () => {
  beforeEach(() => {
    renderComponent();
    mockFetch(images);
  });

  jest.useFakeTimers();

  it("should render each of the images one by one", async () => {
    fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
      target: { value: "24" },
    });

    fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
    expect(screen.getByTestId("nasa-api-loader")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId("nasa-api-loader"));

    [0, 1, 2, 3, 0].forEach((index) => {
      expect(screen.getByAltText(`curiosity-${index}`)).toBeInTheDocument();
      act(() => jest.runOnlyPendingTimers());
      expect(
        screen.queryByAltText(`curiosity-${index}`)
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();
    expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();
  });

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
