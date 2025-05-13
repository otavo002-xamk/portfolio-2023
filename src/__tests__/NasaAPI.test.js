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
  testElementRendering,
  testNoPicturesFoundNotification,
  testTooLargeNumberInsertedNotification,
  insertSolSelectCameraAndClickButton,
  testNoConnectionNotification,
} from "../testfunctions/NasaAPITestFunctions";

jest.mock(
  "../pages/childcomponents/CuriosityMiniSlider",
  () => (props) => mockFn(props)
);

jest.mock("../language-context");
const nasaAPI = languages.en.pages.nasaAPI;

describe("Rendering", () => {
  beforeEach(() => renderComponent());

  it("should render elements", () => {
    testElementRendering();
    expect(mockFn).not.toHaveBeenCalled();
  });
});

describe("Warning texts", () => {
  beforeEach(() => {
    renderComponent();
    mockFetch([]);
  });

  it("should give a notification when no pictures were found", async () => {
    await testNoPicturesFoundNotification();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should give a notification when too large number is inserted", async () => {
    await testTooLargeNumberInsertedNotification();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should give a notification when no connection is found", async () => {
    await testNoConnectionNotification();
    expect(mockFn).not.toHaveBeenCalled();
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
      expect(mockFn).toHaveBeenCalledTimes(2);

      expect(mockFn).toHaveBeenNthCalledWith(1, "/nasa_api", {
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
    renderComponent();
    mockFetch(images);
  });

  it("should call CuriosityMiniSlider component", async () => {
    fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
      target: { value: "24" },
    });

    fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
    expect(screen.getByTestId("nasa-api-loader")).toBeInTheDocument();
    expect(mockFn).not.toHaveBeenCalled();
    await waitForElementToBeRemoved(screen.getByTestId("nasa-api-loader"));
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ nasaPictures: images });
    expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();
    expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();
  });
});
