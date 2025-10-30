import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/components/Login";
import Browse from "../features/movies/components/Browse";
import MovieView from "../features/movies/components/MovieView";
import AppLayout from "../../src/shared/components/AppLayout";
import GptSearch from "../features/search/components/GptSearch";

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
