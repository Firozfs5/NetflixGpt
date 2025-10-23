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
    let gptQuery = `
You are a Movie Recommendation AI.
Suggest 8 movies related to "${searchText.current.value}".
Make sure the searched movie (if it's real) is also included.
Output must be only movie titles, separated by commas — no extra words or numbering.
Example: Inception, Interstellar, Tenet, The Dark Knight, Memento, Dunkirk, Prestige, Oppenheimer
`;
    //calling gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gptQuery,
    });
    console.log(response);
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
