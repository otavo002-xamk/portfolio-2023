import { createMemoryRouter } from "react-router-dom";
import App from "./App";
import FrontPage from "./pages/FrontPage";
import MathGame from "./pages/MathGame";
import NasaAPI from "./pages/NasaAPI";
import DataBase from "./pages/DataBase";
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
            path: "/dataBase",
            element: <DataBase />,
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
