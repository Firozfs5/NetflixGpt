import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  let dispatch = useDispatch();
  let { movieTrailer } = useSelector((store) => store.movies);
  let getMovieVideo = async () => {
    let data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    let json = await data.json();
    let filterData = json.results.filter((movie) => movie.type == "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer?.key));
  };

  useEffect(() => {
    !movieTrailer && getMovieVideo();
  }, []);
  return useSelector((store) => store.movies.trailerVideo);
};

export default useMovieTrailer;
