import CuriosityMiniSlider from "../pages/childcomponents/CuriosityMiniSlider";
import { render, screen, act } from "@testing-library/react";
import { testPlayPauseToggleState } from "../testfunctions/NasaAPITestFunctions";

const nasaPictures = ["test_one", "test_two"];

beforeEach(() => render(<CuriosityMiniSlider nasaPictures={nasaPictures} />));

describe("Rendering", () => {
  jest.useFakeTimers();

  it("should render ok", () => {
    expect(screen.getByAltText("curiosity-0")).toBeInTheDocument();
    expect(screen.getByAltText("curiosity-0").src.slice(17)).toBe("test_one");
    expect(screen.getByAltText("pause-slider-button")).toBeInTheDocument();

    expect(screen.getByAltText("pause-slider-button").src.slice(17)).toBe(
      "Pause.png"
    );

    act(() => jest.runOnlyPendingTimers());
    expect(screen.getByAltText("curiosity-1")).toBeInTheDocument();
    expect(screen.getByAltText("curiosity-1").src.slice(17)).toBe("test_two");
  });

  it("should toggle the play/pause -state when clicking the button", () =>
    testPlayPauseToggleState());
});
