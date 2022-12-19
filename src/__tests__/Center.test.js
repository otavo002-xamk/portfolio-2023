import TestRenderer from "react-test-renderer";
import Center from "../Center";
import { MemoryRouter } from "react-router-dom";

const testContent = ["Left Nav-Bar!", "Content!"];

jest.mock("../LeftNavBar", () => () => <p>Left Nav-Bar!</p>);
jest.mock("../Content", () => () => <p>Content!</p>);

const testRenderer = TestRenderer.create(
  <MemoryRouter>
    <Center />
  </MemoryRouter>
);

const childComponents = testRenderer.toJSON().children;

it("should render the right amount of child components", () =>
  expect(childComponents.length).toBe(2));

it.each(childComponents)("should render p $children with no props", (child) => {
  expect(child.type).toBe("p");
  expect(child.props.length).toBe(undefined);
});

it.each([0, 1])(
  "should render the righ text content for paragraph %i",
  (index) => {
    expect(childComponents[index].type).toBe("p");
    expect(childComponents[index].children[0]).toEqual(testContent[index]);
  }
);
