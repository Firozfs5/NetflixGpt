import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appReducer = combineReducers({
  user: userReducer,
  movies: movieReducer,
  gpt: gptReducer,
  config: configReducer,
});

// const appStore = configureStore({
//   reducer: {
//     user: userReducer,
//     movies: movieReducer,
//     gpt: gptReducer,
//     config: configReducer,
//   },
// });

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
