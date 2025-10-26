import { useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";

const Browse = () => {
  let { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } =
    useSelector((store) => store?.movies);

  if (!nowPlayingMovies || !popularMovies || !topRatedMovies || !upcomingMovies)
    return;

  return (
    <div className="w-screen  ">
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};
export default Browse;
