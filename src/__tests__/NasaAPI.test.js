import NasaAPI from "../pages/NasaAPI";
import { cameraNames } from "../pages/additions/cameraNames";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { languages, LanguageContext } from "../language-context";

const mockFn = jest.fn();

jest.mock("../pages/childcomponents/CuriosityMiniSlider", () => (props) => {
  mockFn(props);
});

jest.mock("../language-context");
const language = languages.en;
const nasaAPI = language.pages.nasaAPI;

const images = [
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

const renderComponent = () =>
  render(
    <LanguageContext.Provider value={{ language }}>
      <NasaAPI />
    </LanguageContext.Provider>
  );

describe("Rendering", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("should render elements", () => {
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
  });
});

describe("Warning texts", () => {
  beforeEach(() => {
    renderComponent();

    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: [] }),
      });
  });

  it("should give a notification when no pictures were found", async () => {
    expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();

    expect(screen.queryByTestId("nasa-api-loader")).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
      target: { value: "3495" },
    });

    fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));

    expect(screen.getByTestId("nasa-api-loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("nasa-api-loader")).not.toBeInTheDocument()
    );

    expect(screen.getByText(nasaAPI.noPicturesFound)).toBeInTheDocument();
    expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should give a notification when too large number is inserted", () => {
    expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
      target: { value: "3496" },
    });

    fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
    expect(screen.getByText(nasaAPI.tooBigNumber)).toBeInTheDocument();
    expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();
    expect(mockFn).not.toHaveBeenCalled();
  });
});

describe("Rendering slider", () => {
  beforeEach(() => {
    renderComponent();

    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: images }),
      });
  });

  it("should call CuriosityMiniSlider component", async () => {
    fireEvent.change(screen.getByLabelText(nasaAPI.solInputLabel), {
      target: { value: "24" },
    });

    fireEvent.click(screen.getByText(nasaAPI.getImagesButtonText));
    expect(screen.getByTestId("nasa-api-loader")).toBeInTheDocument();
    expect(mockFn).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(screen.queryByTestId("nasa-api-loader")).not.toBeInTheDocument()
    );

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ nasaPictures: images });
    expect(screen.queryByText(nasaAPI.noPicturesFound)).not.toBeInTheDocument();
    expect(screen.queryByText(nasaAPI.tooBigNumber)).not.toBeInTheDocument();
  });
});
