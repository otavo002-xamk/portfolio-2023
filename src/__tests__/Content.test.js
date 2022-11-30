import TestRenderer from "react-test-renderer";
import Content from "../Content";

it("renders", () => {
  TestRenderer.create(<Content />);
});
