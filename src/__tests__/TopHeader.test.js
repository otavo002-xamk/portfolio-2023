import TestRenderer from "react-test-renderer";
import TopHeader from "../TopHeader";

it("renders", () => {
  TestRenderer.create(<TopHeader />);
});
