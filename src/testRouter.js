import { createMemoryRouter } from "react-router-dom";
import App from "./App";
import FrontPage from "./pages/FrontPage";
import MathGame from "./pages/MathGame";
import NasaAPI from "./pages/NasaAPI";
import Sample3 from "./pages/Sample3";
import Sample4 from "./pages/Sample4";

const testRouter = (initialIndex) =>
  createMemoryRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <FrontPage />,
          },
          {
            path: "/MathGame",
            element: <MathGame />,
          },
          {
            path: "/NasaAPI",
            element: <NasaAPI />,
          },
          {
            path: "/sample3",
            element: <Sample3 />,
          },
          {
            path: "/sample4",
            element: <Sample4 />,
          },
        ],
      },
    ],
    {
      initialEntries: ["/", "/MathGame", "/NasaAPI"],
      initialIndex: initialIndex,
    }
  );

export default testRouter;
