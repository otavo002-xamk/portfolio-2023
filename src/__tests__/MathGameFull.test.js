import { languages, LanguageContext } from "../language-context";
import MathGame from "../pages/MathGame";
import { screen, render, fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

jest.mock("../language-context");
const language = languages.en;
const { title, successMessage, yourResults, startOver } =
  language.pages.mathGame;

const renderMathGame = () => {
  render(
    <LanguageContext.Provider value={{ language }}>
      <MathGame />
    </LanguageContext.Provider>
  );
};

describe("Rendering", () => {
  beforeEach(() => renderMathGame());

  it("should render", () => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(startOver)).toBeInTheDocument();
    expect(screen.getByText(/NEXT/)).toBeInTheDocument();
    screen.debug();
  });
});

describe("Random numbers & table of options", () => {
  it("should render ps", () => {
    expect(screen.getAllByRole("div", { hidden: true }).length).toBe(5);
  });
});
