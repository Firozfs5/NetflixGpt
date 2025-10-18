import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/usersSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  let dispatch = useDispatch();
  let [scroll, setScroll] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // adding eader bg black feature
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100 ? true : false);
    });
    return () => unsubscribe();
  }, []);

  let user = useSelector((store) => store?.user);
  let { gptSearchView } = useSelector((store) => store.gpt);
  function handleGptSearchClick() {
    dispatch(toggleGptSearchView());
  }

  function handleLanguageChange(e) {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div
      className={` fixed flex  ${
        scroll || gptSearchView ? "bg-black/70 " : "bg-transparent"
      } w-screen px-8 transition-colors duration-300  ease-in-out bg-gradient-to-b from-black z-30 `}
    >
      <img className="w-44" src={LOGO} alt="Netflix_Logo" />

      {user && (
        <div className="flex items-center justify-between w-full">
          <div className="">
            <button
              onClick={handleGptSearchClick}
              className="inline-block text-white mx-5 text-[19px] font-[400] transform transition duration-200 hover:scale-110 "
            >
              Home
            </button>
            <button className="inline-block text-white mx-5 text-[19px] font-[400] transform transition duration-200 hover:scale-110 ">
              TV Series
            </button>
            <button className="inline-block text-white mx-5 text-[19px] font-[400] transform transition duration-200 hover:scale-110 ">
              Movies
            </button>
            <button className="inline-block text-white mx-5 text-[19px] font-[400] transform transition duration-200 hover:scale-110 ">
              My List
            </button>
          </div>

          <div className="flex justify-center items-center mx-7">
            {gptSearchView && (
              <select
                name=""
                className="border rounded px-2 py-1 bg-gray-800 text-white mr-3 outline-none"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    key={lang.identifier}
                    value={lang.identifier}
                    className="text-center"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            {/* op */}
            <div
              className="mx-5 items-center justify-center "
              onClick={handleGptSearchClick}
            >
              <IoSearch className="text-white transfrom scale-140 hover:scale-165 transition-all duration-200" />
            </div>

            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
