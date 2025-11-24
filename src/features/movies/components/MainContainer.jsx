import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MainContainer = () => {
  let movies = useSelector((store) => store.movies?.nowPlayingMovies);
  let [trailerAudio, setTrailerAudio] = useState(false);
  // need to handle error case or other
  // if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  let { title, overview, id, backdrop_path } = mainMovie;
  let trailerId = useMovieTrailer(id);
  return (
    <div className="w-full flex justify-center items-center">
      <VideoTitle
        title={title}
        overview={overview}
        trailerAudio={trailerAudio}
        setTrailerAudio={setTrailerAudio}
        movieId={id}
        trailerId={trailerId}
      />
      <VideoBackground
        movieId={id}
        trailerAudio={trailerAudio}
        trailerId={trailerId}
        backdrop_path={backdrop_path}
      />
    </div>
  );
};

export default MainContainer;
