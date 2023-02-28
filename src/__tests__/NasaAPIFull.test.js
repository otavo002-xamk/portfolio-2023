import { cameraNames } from "../pages/additions/cameraNames";
import {
  fireEvent,
  screen,
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
  testMiniSliderDoesntRender,
  testNoPicturesFoundNotification,
  testTooLargeNumberInsertedNotification,
  insertSolSelectCameraAndClickButton,
  testImagesRendering,
} from "../testfunctions/NasaAPITestFunctions";

jest.mock("../language-context");
const nasaAPI = languages.en.pages.nasaAPI;

describe("Rendering", () => {
  beforeEach(() => renderComponent());

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
      await insertSolSelectCameraAndClickButton(camera);
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
