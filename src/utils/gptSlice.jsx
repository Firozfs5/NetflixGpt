import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptSearchView: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.gptSearchView = !state.gptSearchView;
    },
    addGptMovieResult: (state, action) => {
      let { movieNames, movieResults } = action.payload;
      state.movieResults = movieResults;
      state.movieNames = movieNames;
    },
  },
});

export default gptSlice.reducer;

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;
