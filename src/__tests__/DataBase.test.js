import DataBase from "../pages/DataBase";
import { languages, LanguageContext } from "../language-context";
import { render, screen, within, act, fireEvent } from "@testing-library/react";
const alltables = require("../test-data/alltables.json");
const tablecontent = require("../test-data/table-content.json");

const language = languages.en;

const mockFn = jest.fn();

const mockFetch = () =>
  (global.fetch = (url, options) => {
    return Promise.resolve({ json: () => mockFn(url, options) });
  });

describe("With connection", () => {
  beforeEach(async () => {
    mockFn.mockResolvedValueOnce(alltables).mockResolvedValue(tablecontent);
    mockFetch();

    await act(() =>
      render(
        <LanguageContext.Provider value={{ language }}>
          <DataBase />
        </LanguageContext.Provider>
      )
    );
  });

  it("should call the api and render elements correctly", async () => {
    expect(screen.getByText(language.pages.dataBase.title)).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("/api", undefined);

    alltables.forEach((table) =>
      expect(
        within(screen.getByTestId("db-table-select")).getByText(
          Object.values(table)[0]
        )
      ).toBeInTheDocument()
    );

    expect(
      screen.queryByTestId(language.pages.dataBase.noConnection)
    ).not.toBeInTheDocument();

    expect(screen.queryByTestId("db-contents-table")).not.toBeInTheDocument();

    await act(() =>
      fireEvent.change(screen.getByTestId("db-table-select"), {
        target: { value: Object.values(alltables[0])[0] },
      })
    );

    expect(mockFn).toHaveBeenCalledTimes(2);

    expect(mockFn).toHaveBeenLastCalledWith("/api", {
      body: `{\"table\":\"${Object.values(alltables[0])[0]}\"}`,
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    tablecontent.forEach((field) =>
      expect(
        within(screen.getByTestId("db-contents-table")).getByText(
          Object.values(field)[0]
        )
      ).toBeInTheDocument()
    );
  });
});

describe("With no connection", () => {
  beforeEach(async () => {
    mockFn.mockRejectedValue("Error: no connection");
    mockFetch();

    await act(() =>
      render(
        <LanguageContext.Provider value={{ language }}>
          <DataBase />
        </LanguageContext.Provider>
      )
    );
  });

  it("should render error text only", () => {
    expect(screen.getByText(language.pages.dataBase.title)).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("/api", undefined);
    expect(screen.queryByTestId("db-table-select")).not.toBeInTheDocument();
    expect(screen.queryByTestId("db-contents-table")).not.toBeInTheDocument();

    expect(
      screen.getByText(language.pages.dataBase.noConnection)
    ).toBeInTheDocument();
  });
});
