import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGO, MENU_ITEMS, SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import UserProfile from "./UserProfile";
import { NavLink, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import TudumIntro from "./TudumIntro";

const Header = () => {
  let dispatch = useDispatch();
  let [scroll, setScroll] = useState(false);
  let location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 100 ? true : false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let user = useSelector((store) => store?.user);

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
        scroll ? "bg-[#18181b] backdrop-blur-md  " : "bg-transparent"
      } w-screen px-8 transition-colors duration-300  ease-in-out bg-gradient-to-b from-[bg-[#18181b]] z-30 `}
    >
      <img className="w-44" src={LOGO} alt="Netflix_Logo" />

      {user && (
        <div className="flex items-center justify-between w-full">
          <div>
            {MENU_ITEMS.map((menueItem) => (
              <NavLink
                to={menueItem.path}
                key={menueItem.menueName}
                className={({ isActive }) =>
                  `inline-block  mx-5 text-[19px] font-[400] transform transition duration-200 hover:scale-110 ${
                    isActive ? "text-red-500 font-bold" : "text-white"
                  }`
                }
              >
                {menueItem.menueName}
              </NavLink>
            ))}
          </div>

          <div className="flex justify-center items-center mx-7">
            <NavLink
              className="mx-5 items-center justify-center "
              to={"/search"}
            >
              <IoSearch className="text-white transfrom scale-140 hover:scale-165 transition-all duration-200" />
            </NavLink>

            {location.pathname == "/search" && (
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
