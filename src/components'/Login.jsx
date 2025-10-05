import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/usersSlice";

const Login = () => {
  let dispatch = useDispatch();
  let [isSignIn, setIsSignIn] = useState(true);
  let [errMessage, setErrMessage] = useState(null);

  let email = useRef();
  let password = useRef();
  let name = useRef();
  let navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    let message = checkValidData(
      email.current.value,
      password.current.value,
      isSignIn ? "name" : name.current.value
    );
    setErrMessage(message);

    if (message) {
      console.log("no run ");
      return;
    }

    //sign In/sign up
    if (!isSignIn) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://assets.leetcode.com/users/firozfs5/avatar_1757953725.png",
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              console.log(error);

              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "---" + errorMessage);
          // ..
        });
    } else {
      //Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user Logged  in", user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "---" + errorMessage);
          setErrMessage("User Not Found");
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/bebd95d0-65f9-41a9-9d12-4794db63653e/web/IN-en-20250922-TRIFECTA-perspective_5e75cfb4-3797-4f17-866b-181ff91a51dd_large.jpg"
          alt="background_img"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-md my-36 absolute px-12 py-10 bg-black/90 mx-auto right-0 left-0 text-white  rounded-lg"
      >
        <h1 className=" text-3xl font-bold pb-5">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={name}
            className="bg-[#171716] w-full p-4 my-2  rounded-lg"
            type="text"
            placeholder="Enter Name"
          />
        )}

        <input
          ref={email}
          className="bg-[#171716] w-full p-4 my-2  rounded-lg "
          type="text"
          placeholder="Enter Email Address"
        />

        <input
          ref={password}
          className="bg-[#171716] w-full p-4 my-2  rounded-lg"
          type="password"
          placeholder="Enter Password"
        />

        <button
          onClick={() => {
            handleButtonClick();
          }}
          className="bg-[#e50914] w-full py-3 px-2 my-4 rounded-lg"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {errMessage && <p className="text-red-500 font-medium">{errMessage}</p>}

        <p
          className="text-lg mt-2 cursor-pointer"
          onClick={() => toggleSignInForm()}
        >
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In"}
        </p>
      </form>
    </div>
  );
};
export default Login;
