import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import useGptCallMovies from "../hooks/useGptSearchBar";
import { IoSearch } from "react-icons/io5";

const GptSearchBar = () => {
  let languageChoose = useSelector((store) => store.config.lang);
  let searchText = useRef(null);

  let generateSearchResults = useGptCallMovies();

  let handleGptSearchClick = function () {
    generateSearchResults(searchText);
  };

  return (
    <div className="w-full pt-20 mt-6  flex justify-center items-center">
      <form
        className="max-w-[1/2] mx-auto w-[50%]"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          {lang[languageChoose].search}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearch className="text-white transfrom scale-140 hover:scale-165 transition-all duration-200" />
          </div>
          <input
            ref={searchText}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-medium text-white  rounded-lg bg-black  "
            placeholder={lang[languageChoose].gptSearchPlaceholder}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2 "
            onClick={handleGptSearchClick}
          >
            {lang[languageChoose].search}
          </button>
        </div>
      </form>
    </div>
  );
};
export default GptSearchBar;
