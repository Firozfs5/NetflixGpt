import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../store/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../../../config/constants";

const useUpcomingMovies = () => {
  let dispatch = useDispatch();
  let { upcomingMovies } = useSelector((store) => store.movies);
  const getUpcominMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upcomingMovies && getUpcominMovies();
  }, []);
};
export default useUpcomingMovies;
