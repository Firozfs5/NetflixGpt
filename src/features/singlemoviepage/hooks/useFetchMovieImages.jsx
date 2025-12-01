import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../../../config/constants";
import { addMovieData } from "../store/singleMovieSlice";

function useFetchMovieImages() {
  const dispatch = useDispatch();
  const movieId = useSelector((store) => store.movie.movieData.movieInfo.id);
  const movieDatas = useSelector((store) => store.movie.movieData);

  async function useMovieImages() {
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images`,
        API_OPTIONS
      );
      let json = await res.json();
      console.log({ ...movieDatas, movieImages: json.backdrops });
      dispatch(addMovieData({ ...movieDatas, movieImages: json.backdrops }));
    } catch (e) {
      console.log("sorry there was error:" + e);
    }
  }
  return useMovieImages;
}

export default useFetchMovieImages;
