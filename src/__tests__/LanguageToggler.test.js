import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageContext, languages } from "../language-context";
import LanguageToggler from "../LanguageToggler";

jest.mock("../language-context");
const mockFn = jest.fn();
const updateLanguage = (event) => mockFn(event.target.alt);

jest.mock("react-select", () => (props) => {
  mockFn(props);

  //eslint-disable-next-line
  return <button onClick={props.onChange}>{props.placeholder}</button>;
});

describe("With english language", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const language = languages.en;
    render(
      <LanguageContext.Provider value={{ language, updateLanguage }}>
        <LanguageToggler />
      </LanguageContext.Provider>
    );
  });

  it("should render", () => {
    expect(screen.queryByAltText("fi")).not.toBeInTheDocument();
    expect(screen.getByAltText("en")).toBeInTheDocument();
  });

  it("should call updateLanguage() when clicked", () => {
    fireEvent.click(screen.getByAltText("en"));
    expect(mockFn).not.toHaveBeenCalledWith("fi");
    expect(mockFn).toHaveBeenCalledWith("en");
  });
});

describe("With finnish language", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const language = languages.fi;

    render(
      <LanguageContext.Provider value={{ language, updateLanguage }}>
        <LanguageToggler />
      </LanguageContext.Provider>
    );
  });

  it("should render", () => {
    expect(screen.getByAltText("fi")).toBeInTheDocument();
    expect(screen.queryByAltText("en")).not.toBeInTheDocument();
  });

  it("should call updateLanguage() when clicked", () => {
    fireEvent.click(screen.getByAltText("fi"));
    expect(mockFn).toHaveBeenCalledWith("fi");
    expect(mockFn).not.toHaveBeenCalledWith("en");
  });
});
