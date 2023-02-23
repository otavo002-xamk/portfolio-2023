import CuriosityMiniSlider from "../pages/childcomponents/CuriosityMiniSlider";
import { render, screen, act, fireEvent } from "@testing-library/react";

const nasaPictures = [
  {
    img_src: "test_one",
  },
  {
    img_src: "test_two",
  },
];

beforeEach(() => render(<CuriosityMiniSlider nasaPictures={nasaPictures} />));

describe("Rendering", () => {
  jest.useFakeTimers();

  it("should render ok", () => {
    expect(screen.getByAltText("curiosity-0")).toBeInTheDocument();
    expect(screen.getByAltText("curiosity-0").src.slice(17)).toBe("test_one");
    expect(screen.getByAltText("pause-slider")).toBeInTheDocument();
    expect(screen.getByAltText("pause-slider").src.slice(17)).toBe("Pause.png");
    act(() => jest.runOnlyPendingTimers());
    expect(screen.getByAltText("curiosity-1")).toBeInTheDocument();
    expect(screen.getByAltText("curiosity-1").src.slice(17)).toBe("test_two");
  });

  it("should toggle the play/pause -state when clicking the button", () => {
    expect(screen.getByAltText("pause-slider")).toBeInTheDocument();
    expect(screen.getByAltText("pause-slider").src.slice(17)).toBe("Pause.png");
    expect(screen.queryByAltText("play-slider")).not.toBeInTheDocument();
    expect(jest.getTimerCount()).toBe(1);
    fireEvent.click(screen.getByAltText("pause-slider"));
    expect(screen.getByAltText("play-slider")).toBeInTheDocument();

    expect(screen.getByAltText("play-slider").src.slice(17)).toBe(
      "Play-Icon.png"
    );

    expect(screen.queryByAltText("pause-slider")).not.toBeInTheDocument();
    expect(jest.getTimerCount()).toBe(0);
    fireEvent.click(screen.getByAltText("play-slider"));
    expect(screen.getByAltText("pause-slider")).toBeInTheDocument();
    expect(screen.getByAltText("pause-slider").src.slice(17)).toBe("Pause.png");
    expect(screen.queryByAltText("play-slider")).not.toBeInTheDocument();
    expect(jest.getTimerCount()).toBe(1);
  });
});
