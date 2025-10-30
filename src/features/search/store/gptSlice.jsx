import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptSearchView: false,
    movieNames: null,
    movieResults: null,
    netflixLoader: false,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.gptSearchView = action.payload;
    },
    addGptMovieResult: (state, action) => {
      let { movieNames, movieResults } = action.payload;
      state.movieResults = movieResults;
      state.movieNames = movieNames;
    },
    toggleNetflixLoader(state, action) {
      state.netflixLoader = action.payload;
    },
  },
});

export default gptSlice.reducer;

export const { toggleGptSearchView, addGptMovieResult, toggleNetflixLoader } =
  gptSlice.actions;
