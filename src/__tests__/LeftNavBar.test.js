import TestRenderer from "react-test-renderer";
import LeftNavBar from "../LeftNavBar";
import { BrowserRouter } from "react-router-dom";

it("renders", () => {
  TestRenderer.create(
    <BrowserRouter>
      <LeftNavBar />
    </BrowserRouter>
  );
});
