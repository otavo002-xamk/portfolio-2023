import TestRenderer from "react-test-renderer";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

const testContent = ["Top Header!", "Center!", "Footer!"];

jest.mock("../TopHeader", () => () => <p>Top Header!</p>);
jest.mock("../Center", () => () => <p>Center!</p>);
jest.mock("../Footer", () => () => <p>Footer!</p>);

const testRenderer = TestRenderer.create(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

const childComponents = [
  testRenderer.toJSON()[0].children[0],
  testRenderer.toJSON()[0].children[1],
  testRenderer.toJSON()[1].children[0],
];

it.each(childComponents)("should render p $children with no props", (child) => {
  expect(child.type).toBe("p");
  expect(child.props.length).toBe(undefined);
});

it.each([0, 1, 2])(
  "should render the righ text content for paragraph %i",
  (index) => {
    expect(childComponents[index].type).toBe("p");
    expect(childComponents[index].children[0]).toEqual(testContent[index]);
  }
);
