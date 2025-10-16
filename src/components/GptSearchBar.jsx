import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";

const GptSearchBar = () => {
  let languageChoose = useSelector((store) => store.config.lang);
  let searchText = useRef(null);

  let handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    let gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for query" +
      searchText.current.value +
      ". only give me the name of five movies , comma separated like the example result given ahead.Example results: Gadar, sholay, Don, Golmaaal, Koi Mil Gaya";
    //make apui call to chat gptr to use and get the data from it
    let gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-4o-mini",
    });
    console.log(gptResults.choices);
  };

  return (
    <div className="w-full pt-20  flex justify-center items-center">
      <form
        className="max-w-[1/2] mx-auto w-[40%]"
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
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            ref={searchText}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={lang[languageChoose].gptSearchPlaceholder}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
