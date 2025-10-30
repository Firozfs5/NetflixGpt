import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../store/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../../../config/constants";

const useTopRatedMovies = () => {
  let dispatch = useDispatch();
  let { topRatedMovies } = useSelector((store) => store.movies);
  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};
export default useTopRatedMovies;
