import {
  render,
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import { LanguageContext, languages } from "../language-context";
import NasaAPI from "../pages/NasaAPI";
import { cameraNames } from "../pages/additions/cameraNames";

jest.mock("../language-context");
const language = languages.en;
const nasaAPI = language.pages.nasaAPI;
export const mockFn = jest.fn();

export const images = [
  {
    name: "one",
  },
  {
    name: "two",
  },
  {
    name: "three",
  },
  {
    name: "four",
  },
];

export const mockFetch = (images, spyFetchParams = false) =>
  (global.fetch = (params) => {
    spyFetchParams && mockFn(params);

    return Promise.resolve({
      json: () => Promise.resolve({ photos: images }),
    });
  });

export const renderComponent = () =>
  render(
    <LanguageContext.Provider value={{ language }}>
      <NasaAPI />
    </LanguageContext.Provider>
  );

export const testElementRendering = () => {
  let textContents = [
    "title",
    "solInputLabel",
    "cameraSelectLabel",
    "getImagesButtonText",
  ];

  textContents.forEach((textContent) =>
    expect(screen.getByText(nasaAPI[textContent])).toBeInTheDocument()
  );

  ["solInputLabel", "cameraSelectLabel"].forEach((label) =>
    expect(screen.getByLabelText(nasaAPI[label])).toBeInTheDocument()
  );

  cameraNames.forEach((cameraName) => {
    expect(
      within(screen.getByLabelText(nasaAPI.cameraSelectLabel)).getAllByText(
        cameraName.Name
      )
    ).toHaveLength(1);
  });
};

export const testMiniSliderDoesntRender = () => {
  expect(screen.queryByAltText(/curiosity-/)).not.toBeInTheDocument();
  expect(screen.queryByAltText("play-slider-button")).not.toBeInTheDocument();
  expect(screen.queryByAltText("pause-slider-button")).not.toBeInTheDocument();
};

export const testNoPicturesFoundNotification = async () => {
  expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();
  expect(screen.queryByTestId("nasa-api-loader")).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
    target: { value: "3495" },
  });

  fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
  expect(screen.getByTestId("nasa-api-loader")).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByTestId("nasa-api-loader"));
  expect(screen.getByText(nasaAPI.noPicturesFound)).toBeInTheDocument();
  expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();
};

export const testTooLargeNumberInsertedNotification = () => {
  expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
    target: { value: "3496" },
  });

  fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
  expect(screen.getByText(nasaAPI.tooBigNumber)).toBeInTheDocument();
  expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();
};

export const insertSolSelectCameraAndClickButton = async (camera) => {
  fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
    target: { value: "3495" },
  });

  fireEvent.change(screen.getByLabelText(nasaAPI.cameraSelectLabel), {
    target: { value: camera.abbreviation },
  });

  expect(mockFn).not.toHaveBeenCalled();

  await act(() =>
    fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText))
  );
};

export const testImagesRendering = async () => {
  fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
    target: { value: "24" },
  });

  fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
  expect(screen.getByTestId("nasa-api-loader")).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByTestId("nasa-api-loader"));

  [0, 1, 2, 3, 0].forEach((index) => {
    expect(screen.getByAltText(`curiosity-${index}`)).toBeInTheDocument();
    act(() => jest.runOnlyPendingTimers());
    expect(screen.queryByAltText(`curiosity-${index}`)).not.toBeInTheDocument();
  });

  expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();
  expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();
};

export const testPlayPauseToggleState = () => {
  expect(screen.getByAltText("pause-slider-button")).toBeInTheDocument();

  expect(screen.getByAltText("pause-slider-button").src.slice(17)).toBe(
    "Pause.png"
  );

  expect(screen.queryByAltText("play-slider-button")).not.toBeInTheDocument();
  expect(jest.getTimerCount()).toBe(1);
  fireEvent.click(screen.getByAltText("pause-slider-button"));
  expect(screen.getByAltText("play-slider-button")).toBeInTheDocument();

  expect(screen.getByAltText("play-slider-button").src.slice(17)).toBe(
    "Play-Icon.png"
  );

  expect(screen.queryByAltText("pause-slider-button")).not.toBeInTheDocument();
  expect(jest.getTimerCount()).toBe(0);
  fireEvent.click(screen.getByAltText("play-slider-button"));
  expect(screen.getByAltText("pause-slider-button")).toBeInTheDocument();
  expect(screen.queryByAltText("play-slider-button")).not.toBeInTheDocument();
  expect(jest.getTimerCount()).toBe(1);
};
