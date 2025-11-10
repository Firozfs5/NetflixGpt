import { API_OPTIONS } from "../../../config/constants";
import { addGptMovieResult } from "../../search/store/gptSlice";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "./movieSlice";

export const fetchPopularMovies = () => async (dispatch, getState) => {
  const { popularMovies } = getState().movies;
  if (popularMovies) return; // Already cached

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?page=1",
    API_OPTIONS
  );
  const json = await res.json();
  dispatch(
    addGptMovieResult({
      movieNames: ["Popular Movies"],
      movieResults: [json.results],
    })
  );
  dispatch(addPopularMovies(json.results));
};

export const fetchTopRatedMovies = () => async (dispatch, getState) => {
  const { topRatedMovies } = getState().movies;
  if (topRatedMovies) return; // Already cached

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?page=1",
    API_OPTIONS
  );
  const json = await res.json();
  dispatch(addTopRatedMovies(json.results));
};

export const fetchNowPlayingMovies = () => async (dispatch, getState) => {
  const { nowPlayingMovies } = getState().movies;
  if (nowPlayingMovies) return; // Already cached

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?page=1",
    API_OPTIONS
  );
  const json = await res.json();
  dispatch(addNowPlayingMovies(json.results));
};

export const fetchUpcomingMovies = () => async (dispatch, getState) => {
  const { upcomingMovies } = getState().movies;
  if (upcomingMovies) return; // Already cached

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?page=1",
    API_OPTIONS
  );
  const json = await res.json();
  dispatch(addUpcomingMovies(json.results));
};

export const fetchAllMovies = () => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(fetchPopularMovies()),
      dispatch(fetchTopRatedMovies()),
      dispatch(fetchNowPlayingMovies()),
      dispatch(fetchUpcomingMovies()),
    ]);
  } catch (e) {
    console.log("There wase error while fetching movie ", e);
  }
};
