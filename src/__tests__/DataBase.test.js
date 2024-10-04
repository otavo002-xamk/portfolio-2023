jest.mock("../language-context");
import {
  testTitleAndFirstFetchCall,
  withConnectionStartUp,
  testOnlyDBSelectComponentIsVisible,
  selectTableAndTestTableIsVisible,
  selectEmptyTableAndTestMessage,
  withNoConnectionStartUp,
  testOnlyErrorTextVisible,
} from "../testfunctions/DataBaseTestFunctions";

describe("With connection", () => {
  beforeEach(() => withConnectionStartUp());

  it("should call the api and render elements correctly", () => {
    testTitleAndFirstFetchCall();
    testOnlyDBSelectComponentIsVisible();
    selectTableAndTestTableIsVisible();
    selectEmptyTableAndTestMessage();
  });
});

describe("With no connection", () => {
  beforeEach(() => withNoConnectionStartUp());

  it("should render error text only", () => {
    testTitleAndFirstFetchCall();
    testOnlyErrorTextVisible();
  });
});
