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
      const gptQuery = `You are an expert Movie Recommendation Engine. Analyze the user's search query and provide relevant movie suggestions.

**User Query:** "${searchText.current.value}"

**Task:** Return exactly 6 movie titles based on the query context:
- If it's a specific movie name: Include that movie first (if it exists), then 5 similar movies
- If it's a genre (action, comedy, thriller, etc.): Return 6 top movies from that genre
- If it's a language (Hindi, Tamil, Korean, etc.): Return 6 popular movies in that language
- If it's a director/actor name: Return 6 movies featuring them
- If it's a theme/mood (sad, inspiring, mind-bending, etc.): Return 6 movies matching that theme
- If it's a year/decade: Return 6 notable movies from that period

**Critical Rules:**
1. Output ONLY movie titles separated by commas
2. NO numbering, NO explanations, NO extra text
3. Ensure movies are real and well-known
4. Maintain diversity in suggestions (different years/subgenres when possible)
5. Prioritize critically acclaimed and popular films
6. If the query is a real movie, ALWAYS list it first

**Output Format:** Movie1, Movie2, Movie3, Movie4, Movie5, Movie6

**Example Outputs:**
- Query "Inception" → Inception, Interstellar, Tenet, Shutter Island, The Prestige, Memento
- Query "action" → Mad Max Fury Road, John Wick, The Dark Knight, Die Hard, Mission Impossible, The Raid
- Query "Hindi" → 3 Idiots, Dangal, PK, Zindagi Na Milegi Dobara, Andhadhun, Taare Zameen Par
- Query "Christopher Nolan" → Inception, The Dark Knight, Interstellar, Dunkirk, The Prestige, Memento`;

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
