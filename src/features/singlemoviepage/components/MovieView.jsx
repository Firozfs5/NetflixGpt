import { useParams } from "react-router-dom";
import useFetchMovieData from "../hooks/useFetchMovieData";
import { useSelector } from "react-redux";
import NetflixLoader from "../../../shared/components/NetflixLoader";
import { useEffect, useRef } from "react";
import useMovieTrailer from "../../movies/hooks/useMovieTrailer";
import SmpUp from "./SmpUp";
import SmpDown from "./SmpDown";

const MovieView = () => {
  let { movieId } = useParams();
  let movieDataFetcher = useFetchMovieData(); //this is returning a function
  let trailerId = useMovieTrailer(movieId);
  useEffect(() => {
    movieDataFetcher(movieId);
  }, [movieId, movieDataFetcher]);
  let movieData = useSelector((store) => store.movie.movieData);

  //ref to make to go to a specific part
  let scrollSection = useRef(null);

  let scrollSectionFunc = () => {
    if (scrollSection?.current) {
      scrollSection.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!movieData) return <NetflixLoader />;

  return (
    <div className="bg-[#18181b] w-screen h-min-screen flex flex-col items-center gap-4 ">
      {/* header */}
      <SmpUp
        movieData={movieData}
        trailerId={trailerId}
        scrollSectionFunc={scrollSectionFunc}
      />

      <SmpDown
        movieData={movieData}
        trailerId={trailerId}
        scrollSection={scrollSection}
      />
      {/* <NetflixFooter /> */}
    </div>
  );
};

export default MovieView;
// bg-linear-to-b from-transparent via-gray-500/50 to-[#18181b]
