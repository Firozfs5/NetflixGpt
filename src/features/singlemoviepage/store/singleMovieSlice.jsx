import { createSlice } from "@reduxjs/toolkit";

const singleMovieSlice = createSlice({
  name: "singleMovieSlice",
  initialState: {
    movieData: null,
  },
  reducers: {
    addMovieData: (state, action) => {
      state.movieData = action.payload;
    },
  },
});
export default singleMovieSlice.reducer;
export const { addMovieData } = singleMovieSlice.actions;
