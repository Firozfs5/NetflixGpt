import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../store/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../../../config/constants";
import { addGptMovieResult } from "../../search/store/gptSlice";

const usePopularMovies = () => {
  let dispatch = useDispatch();
  let { popularMovies } = useSelector((store) => store.movies);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(
      addGptMovieResult({
        movieNames: ["Popular Movies"],
        movieResults: [json.results],
      })
    );
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};
export default usePopularMovies;
