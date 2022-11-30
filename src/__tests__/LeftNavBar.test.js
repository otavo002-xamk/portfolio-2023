import TestRenderer from "react-test-renderer";
import LeftNavBar from "../LeftNavBar";

it("renders", () => {
  TestRenderer.create(<LeftNavBar />);
});
