import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "../utils/usersSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
// import { auth } from "../utils/firebase";
import { IoSearch } from "react-icons/io5";
import TudumIntro from "./TudumIntro";

const Header = () => {
  let dispatch = useDispatch();
  let [scroll, setScroll] = useState(false);
  let navigate = useNavigate();
  console.log(location);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100 ? true : false);
    });
  }, []);

  let user = useSelector((store) => store?.user);
  let { gptSearchView } = useSelector((store) => store.gpt);
  function handleGptSearchClick(val) {
    dispatch(toggleGptSearchView(val));
  }

  function handleLanguageChange(e) {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  }

  let [showTudum, setShowTudum] = useState(true);

  return showTudum ? (
    <TudumIntro onFinish={() => setShowTudum(false)} />
  ) : (
    <div
      className={` fixed flex  ${
        scroll || gptSearchView
          ? "bg-[#18181b] backdrop-blur-md  "
          : "bg-transparent"
      } w-screen px-8 transition-colors duration-300  ease-in-out bg-gradient-to-b from-[bg-[#18181b]] z-30 `}
    >
      <img className="w-44" src={LOGO} alt="Netflix_Logo" />

      {user && (
        <div className="flex items-center justify-between w-full">
          <div className="">
            <button
              onClick={() => {
                handleGptSearchClick(false);
                navigate("/browse");
              }}
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
            <div className="mx-5 items-center justify-center ">
              <IoSearch
                onClick={() => {
                  handleGptSearchClick(true);
                  navigate("/search");
                }}
                className="text-white transfrom scale-140 hover:scale-165 transition-all duration-200"
              />
            </div>

            {gptSearchView && (
              <select
                name=""
                className="bg-black text-white text-sm md:text-base border border-gray-700 rounded-md px-4 py-2 outline-none focus:border-red-600 cursor-pointer appearance-none
         hover:border-gray-500 transition-colors duration-200"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    key={lang.identifier}
                    value={lang.identifier}
                    className="bg-black text-white"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
