import TestRenderer from "react-test-renderer";
import Center from "../Center";
import { BrowserRouter } from "react-router-dom";

it("renders", () => {
  TestRenderer.create(
    <BrowserRouter>
      <Center />
    </BrowserRouter>
  );
});
