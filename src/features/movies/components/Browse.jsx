import { useSelector } from "react-redux";
import SecondaryContainer from "./SecondaryContainer";
import MainContainer from "./MainContainer";
import NetflixFooter from "../../../shared/components/NetflixFooter";
const Browse = () => {
  let { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } =
    useSelector((store) => store?.movies);

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
