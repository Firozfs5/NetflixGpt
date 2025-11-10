import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import TudumIntro from "./TudumIntro";
import { addUser, removeUser } from "../../features/auth/store/usersSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import NetflixLoader from "./NetflixLoader";
import {
  // fetchAllMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../../features/movies/store/movieThunx";

const AppLayout = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        // dispatch(fetchAllMovies());
        dispatch(fetchPopularMovies());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchTopRatedMovies());
        dispatch(fetchUpcomingMovies());

        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        if (location.pathname !== "/") {
          navigate("/");
        }
        dispatch({ type: "RESET_STORE" });
      }
      setIsloading(false);
    });

    return () => unsubscribe();
  }, [dispatch, navigate, location]);

  let [showTudum, setShowTudum] = useState(true);

  if (isLoading) {
    return <NetflixLoader />;
  }

  return showTudum ? (
    <TudumIntro onFinish={() => setShowTudum(false)} />
  ) : (
    <div className="bg-black">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
