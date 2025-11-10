import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../../../config/constants";
// import { useEffect } from "react";
import { addMovieData } from "../../movies/store/movieSlice";
import { useCallback } from "react";

const useFetchMovieData = () => {
  const dispatch = useDispatch();

  const MovieFetcher = useCallback(
    async (movieId) => {
      try {
        dispatch(addMovieData(null));
        let [movieRes, castRes, reviews] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
            API_OPTIONS
          ),
        ]);
        const [movieInfo, castData, reviewsData] = await Promise.all([
          movieRes.json(),
          castRes.json(),
          reviews.json(),
        ]);
        // console.log(castData);

        dispatch(
          addMovieData({
            movieInfo: movieInfo,
            movieCast: castData.cast,
            movieCrew: castData.crew,
            reviews: reviewsData.results,
          })
        );
      } catch (e) {
        console.error("Failed to fetch movie data:", e);
      }
    },
    [dispatch]
  );

  return MovieFetcher;
};

export default useFetchMovieData;
