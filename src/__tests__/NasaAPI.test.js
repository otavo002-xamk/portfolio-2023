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

  it("should give a notification when too large number is inserted", () => {
    testTooLargeNumberInsertedNotification();
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

      expect(mockFn).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining("sol=3495")
      );

      expect(mockFn).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining(`camera=${camera.abbreviation}`)
      );
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
