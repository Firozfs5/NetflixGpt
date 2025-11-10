import { useSelector } from "react-redux";
import SecondaryContainer from "./SecondaryContainer";
import MainContainer from "./MainContainer";
import NetflixFooter from "../../../shared/components/NetflixFooter";
// import usePopularMovies from "../hooks/usePopularMovies";
// import useTopRatedMovies from "../hooks/useTopRatedMovies";
// import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
// import useUpcomingMovies from "../hooks/useUpcomingMovies";
// import useTrailerVideo from "../hooks/useTrailerVideo";
const Browse = () => {
  let { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } =
    useSelector((store) => store?.movies);

  // useNowPlayingMovies();
  // usePopularMovies();
  // useTopRatedMovies();
  // useUpcomingMovies();
  // useTrailerVideo();

  if (!nowPlayingMovies || !popularMovies || !topRatedMovies || !upcomingMovies)
    return;

  return (
    <div className="w-screen  ">
      <MainContainer />
      <SecondaryContainer />
      <NetflixFooter />
    </div>
  );
};
export default Browse;
