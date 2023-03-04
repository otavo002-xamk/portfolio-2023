import TestRenderer from "react-test-renderer";
import Footer from "../Footer";

const testRenderer = TestRenderer.create(<Footer />);
const childComponents = testRenderer.toJSON().children;

it("should render the right amount of child components", () =>
  expect(childComponents.length).toBe(1));

it("should render the righ text content for paragraph", () => {
  expect(childComponents[0].type).toBe("p");
  expect(childComponents[0].children[0]).toEqual("Portfolio 2023");
});
