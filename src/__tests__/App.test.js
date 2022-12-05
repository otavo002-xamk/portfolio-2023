import TestRenderer from "react-test-renderer";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

it("renders", () => {
  TestRenderer.create(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
