import DataBase from "../pages/DataBase";
import { languages, LanguageContext } from "../language-context";
import {
  render,
  screen,
  within,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
jest.mock("../language-context");

const alltables = require("../test-data/alltables.json");
const tablecontent = require("../test-data/table-content.json");
const language = languages.en;
const mockFn = jest.fn();

const mockFetch = () =>
  (global.fetch = (url, options) => {
    return Promise.resolve({ json: () => mockFn(url, options) });
  });

export const testTitleAndFirstFetchCall = async () => {
  expect(screen.getByText(language.pages.dataBase.title)).toBeInTheDocument();
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith("/_api", undefined);
};

const renderPage = () =>
  render(
    <LanguageContext.Provider value={{ language }}>
      <DataBase />
    </LanguageContext.Provider>
  );

export const withConnectionStartUp = async () => {
  mockFn
    .mockResolvedValueOnce(alltables)
    .mockResolvedValueOnce(tablecontent)
    .mockResolvedValue([]);
  mockFetch();
  await act(() => renderPage());
};

export const testOnlyDBSelectComponentIsVisible = () => {
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
};

export const selectTableAndTestTableIsVisible = async () => {
  await act(() =>
    fireEvent.change(screen.getByTestId("db-table-select"), {
      target: { value: Object.values(alltables[0])[0] },
    })
  );

  await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(2));

  expect(mockFn).toHaveBeenLastCalledWith("/_api", {
    body: `{"table":"${Object.values(alltables[0])[0]}"}`,
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
};

export const selectEmptyTableAndTestMessage = async () => {
  await act(() =>
    fireEvent.change(screen.getByTestId("db-table-select"), {
      target: { value: Object.values(alltables[1])[0] },
    })
  );

  expect(mockFn).toHaveBeenCalledTimes(3);

  expect(mockFn).toHaveBeenLastCalledWith("/_api", {
    body: `{"table":"${Object.values(alltables[1])[0]}"}`,
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  expect(screen.queryByTestId("db-contents-table")).not.toBeInTheDocument();
  expect(screen.getByText(language.pages.dataBase.noData)).toBeInTheDocument();
};

export const withNoConnectionStartUp = async () => {
  mockFn.mockRejectedValue("Error: no connection");
  mockFetch();
  await act(() => renderPage());
};

export const testOnlyErrorTextVisible = () => {
  testTitleAndFirstFetchCall();
  expect(screen.queryByTestId("db-table-select")).not.toBeInTheDocument();
  expect(screen.queryByTestId("db-contents-table")).not.toBeInTheDocument();

  expect(
    screen.getByText(language.pages.dataBase.noConnection)
  ).toBeInTheDocument();
};
