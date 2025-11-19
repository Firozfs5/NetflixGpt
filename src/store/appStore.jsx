import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/auth/store/usersSlice";
import movieReducer from "../features/movies/store/movieSlice";
import gptReducer from "../features/search/store/gptSlice";
import configReducer from "./configSlice";
import singleMovieSlice from "../features/singlemoviepage/store/singleMovieSlice";
const appReducer = combineReducers({
  user: userReducer,
  movies: movieReducer,
  gpt: gptReducer,
  config: configReducer,
  movie: singleMovieSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // clear everything
  }
  return appReducer(state, action);
};

const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
