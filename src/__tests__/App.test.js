import TestRenderer from "react-test-renderer";
import App from "../App";

it("renders", () => {
  TestRenderer.create(<App />);
});
