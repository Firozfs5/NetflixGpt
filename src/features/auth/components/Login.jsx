import { useRef, useState } from "react";
import Header from "../../../shared/components/Header";
import { BG_URL } from "../../../config/constants";
import useLoginLogic from "../hooks/useLoginLogic";

const Login = () => {
  let [isSignIn, setIsSignIn] = useState(true);
  let [errMessage, setErrMessage] = useState(null);

  let email = useRef();
  let password = useRef();
  let name = useRef();

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  let loginAction = useLoginLogic(
    email,
    password,
    name,
    setErrMessage,
    isSignIn
  );
  const handleButtonClick = () => {
    loginAction();
  };
  return (
    <div>
      <Header />
      <div className="absolute h-full w-full">
        <img
          src={BG_URL}
          alt="background_img"
          className="w-full h-full object-cover"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-md my-36 absolute px-12 py-10 bg-black/85 mx-auto right-0 left-0 text-white  rounded-lg"
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
          className="bg-[#e50914] w-full py-3 px-2 my-4 rounded-lg font-medium"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {errMessage && <p className="text-red-500 font-medium">{errMessage}</p>}

        <p
          className="text-lg mt-2 cursor-pointer font-medium"
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
