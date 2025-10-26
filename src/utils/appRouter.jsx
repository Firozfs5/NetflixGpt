import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Browse from "../components/Browse";
import MovieView from "../components/MovieView";
import AppLayout from "../components/AppLayout";
import GptSearch from "../components/GptSearch";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/movie/:movieId",
        element: <MovieView />,
      },
      {
        path: "/search",
        element: <GptSearch />,
      },
    ],
  },
]);

export default appRouter;
