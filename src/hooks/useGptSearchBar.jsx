import { useDispatch } from "react-redux";
import ai from "../utils/genAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

function useGptCallMovies() {
  let dispatch = useDispatch();

  //helper tmdb
  const searchMovieTMDB = async (movie) => {
    let data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    let json = await data.json();
    return json.results;
  };

  let handleGptSearchClick = async (searchText) => {
    //query
    let gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for query" +
      searchText.current.value +
      ". only give me the name of 8 movies or i have gave a movie name then also add that movie name also in it, comma separated like the example result given ahead.Example results: Gadar, sholay, Don, Golmaaal, Koi Mil Gaya";

    //calling gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gptQuery,
    });

    //splitting output
    const gptMovies = response?.text.split(", ");

    //here we get primse of movies
    let promisedArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    let tmdbResults = await Promise.all(promisedArray);

    //sending movie to store
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return handleGptSearchClick;
}

export default useGptCallMovies;
