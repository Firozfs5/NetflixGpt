import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import NetflixLoader from "./NetflixLoader";
const GptMovieSuggestion = () => {
  let { movieResults, movieNames, netflixLoader } = useSelector(
    (store) => store.gpt
  );
  console.log(movieResults, movieNames);
  if (netflixLoader) return <NetflixLoader />;
  let head = 0;
  return (
    <div className="">
      {movieResults.map((movie) => (
        <MovieList title={movieNames[head++]} movies={movie} key={head} />
      ))}
    </div>
  );
};
export default GptMovieSuggestion;
