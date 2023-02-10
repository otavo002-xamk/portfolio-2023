import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";
import { screen, render, fireEvent } from "@testing-library/react";

jest.mock("../language-context");
const language = languages.en;
const { title, startOver } = language.pages.mathGame;

beforeEach(() => {
  render(
    <LanguageContext.Provider value={{ language }}>
      <MathGame />
    </LanguageContext.Provider>
  );
});

describe("Rendering", () => {
  it("should render elements correctly", () => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(startOver)).toBeInTheDocument();
    expect(screen.getByText(/NEXT/)).toBeInTheDocument();
    expect(screen.getAllByText("+")).toHaveLength(10);
    expect(screen.getAllByText("=")).toHaveLength(5);
    expect(screen.getAllByText("?")).toHaveLength(5);
  });
});
