import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../../../config/constants";
import { addGptMovieResult } from "../store/gptSlice";
import { toggleNetflixLoader } from "../store/gptSlice";
import { OpenAI } from "openai";

function useGptCallMovies() {
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie,
        )}`,
        API_OPTIONS,
      );
      const json = await res.json();
      return json.results || [];
    } catch (err) {
      console.error("TMDB error:", err);
      return [];
    }
  };

  const handleGptSearchClick = async (searchText) => {
    const query = searchText?.current?.value?.trim();
    if (!query) return;

    dispatch(toggleNetflixLoader(true));

    try {
      const gptQuery = `You are a movie recommendation engine.

      User query: "${searchText.current.value}"

      Return EXACTLY 6 real, popular movie titles.

      Rules:
      - Output ONLY comma-separated titles
      - No numbering, no explanation, no extra text
      - If the query is a specific movie, list it first
      - Match genre, language, person, mood, or year if mentioned
      - Dont generate any notes point or any other comment or extra information just given format type must be there nothing much.
      - Dont give dates next to movie names.
      Format:
      The Grand Budapest Hotel, Inception, The Shawshank Redemption, The Dark Knight, Forrest Gump, The Matrix.`;

      // ⚠️ DEV ONLY — move to backend later
      const client = new OpenAI({
        baseURL: "https://router.huggingface.co/v1",
        apiKey: import.meta.env.VITE_QWEN_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await client.chat.completions.create({
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages: [{ role: "user", content: gptQuery }],
      });

      const rawText = completion.choices[0].message.content;

      const gptMovies = rawText
        .replace(/\n/g, "")
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean)
        .slice(0, 6);
      console.log(gptMovies);
      if (gptMovies.length === 0) {
        throw new Error("No movies returned");
      }

      const tmdbResults = await Promise.all(gptMovies.map(searchMovieTMDB));

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        }),
      );
    } catch (err) {
      console.error("HF GPT error:", err);
      alert("Failed to get recommendations");
    } finally {
      dispatch(toggleNetflixLoader(false));
    }
  };

  return handleGptSearchClick;
}

export default useGptCallMovies;
