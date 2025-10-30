// src/hooks/useGptCallMovies.jsx
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../../../config/constants";
import { addGptMovieResult } from "../store/gptSlice";
import { toggleNetflixLoader } from "../store/gptSlice";

function useGptCallMovies() {
  let dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      let data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}`,
        API_OPTIONS
      );
      let json = await data.json();
      return json.results || [];
    } catch (error) {
      console.error("Error searching movie:", error);
      return [];
    }
  };

  let handleGptSearchClick = async (searchText) => {
    try {
      let gptQuery = `
        You are a Movie Recommendation AI.
        Suggest 8 movies related to "${searchText.current.value}".
        Make sure the searched movie (if it's real) is also included.
        Output must be only movie titles, separated by commas — no extra words or numbering.
        Example: Inception, Interstellar, Tenet, The Dark Knight, Memento, Dunkirk, Prestige, Oppenheimer
      `;

      // ✅ Simple direct call - proxy handles everything
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: gptQuery }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gemini API request failed");
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      console.log("Gemini Response:", text);

      // Split the response
      const gptMovies = text.split(", ").map((m) => m.trim());

      // Search for each movie
      let promisedArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      let tmdbResults = await Promise.all(promisedArray);

      dispatch(toggleNetflixLoader(false));
      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error in GPT search:", error);
      dispatch(toggleNetflixLoader(false));
      alert("Failed to get recommendations. Please try again.");
    }
  };

  return handleGptSearchClick;
}

export default useGptCallMovies;
