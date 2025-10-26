import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

import { addUser, removeUser } from "../utils/usersSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
// import { useState } from "react";
const AppLayout = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(location.pathname);
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
  }, []);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;

// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Header from "./Header";

// import { addUser, removeUser } from "../utils/usersSlice";
// import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// // import { useState } from "react";
// const AppLayout = () => {
//   let dispatch = useDispatch();
//   let navigate = useNavigate();
//   let location = useLocation();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       console.log(location.pathname);
//       if (user) {
//         const { uid, displayName, email, photoURL } = user;
//         dispatch(
//           addUser({
//             uid: uid,
//             displayName: displayName,
//             email: email,
//             photoURL: photoURL,
//           })
//         );
//         if (location.pathname === "/") {
//           navigate("/browse");
//         }
//       } else {
//         dispatch(removeUser());
//         if (location.pathname !== "/") {
//           navigate("/");
//         }
//         dispatch({ type: "RESET_STORE" });
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <Outlet />
//     </div>
//   );
// };

// export default AppLayout;
