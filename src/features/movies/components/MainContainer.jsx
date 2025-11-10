import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useState } from "react";

const MainContainer = () => {
  let movies = useSelector((store) => store.movies?.nowPlayingMovies);
  let [trailerAudio, setTrailerAudio] = useState(false);
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  let { title, overview, id } = mainMovie;
  return (
    <div className="w-full flex justify-center items-center">
      <VideoTitle
        title={title}
        overview={overview}
        trailerAudio={trailerAudio}
        setTrailerAudio={setTrailerAudio}
        movieId={id}
      />
      <VideoBackground movieId={id} trailerAudio={trailerAudio} />
    </div>
  );
};

export default MainContainer;
