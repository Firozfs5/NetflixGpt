import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../../../config/constants";
import { useCallback } from "react";
import { addMovieData } from "../store/singleMovieSlice";

const useFetchMovieData = () => {
  const dispatch = useDispatch();
  const MovieFetcher = useCallback(
    async (movieId) => {
      try {
        dispatch(addMovieData(null));
        let [movieRes, castRes, reviews, recommendations, videos] =
          await Promise.all([
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
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
              API_OPTIONS
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/videos`,
              API_OPTIONS
            ),
          ]);
        const [
          movieInfo,
          castData,
          reviewsData,
          recommendationsData,
          videosData,
        ] = await Promise.all([
          movieRes.json(),
          castRes.json(),
          reviews.json(),
          recommendations.json(),
          videos.json(),
        ]);
        dispatch(
          addMovieData({
            movieInfo: movieInfo,
            movieCast: castData.cast,
            movieCrew: castData.crew,
            reviews: reviewsData.results,
            recommendation: recommendationsData.results,
            video: videosData.results,
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
