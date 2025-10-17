import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  let { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;
  let head = 0;
  return (
    <div className="bg-red-300">
      {movieResults.map((movie) => (
        <MovieList title={movieNames[head++]} movies={movie} key={head} />
      ))}
    </div>
  );
};
export default GptMovieSuggestion;
