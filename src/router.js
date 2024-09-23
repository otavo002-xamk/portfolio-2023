import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import FrontPage from "./pages/FrontPage";
import MathGame from "./pages/MathGame";
import NasaAPI from "./pages/NasaAPI";
import DataBase from "./pages/DataBase";
import Links from "./pages/Links";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
        path: "/links",
        element: <Links />,
      },
    ],
  },
]);

export default router;
