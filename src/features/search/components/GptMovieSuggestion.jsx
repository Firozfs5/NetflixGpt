import { useSelector } from "react-redux";
import MovieList from "../../movies/components/MovieList";
import NetflixLoader from "../../../shared/components/NetflixLoader";
const GptMovieSuggestion = () => {
  let { movieResults, movieNames, netflixLoader } = useSelector(
    (store) => store.gpt
  );

  if (netflixLoader) return <NetflixLoader />;

  return (
    <div>
      {movieResults.map((movie, idx) => (
        <MovieList title={movieNames[idx]} movies={movie} key={idx} />
      ))}
    </div>
  );
};
export default GptMovieSuggestion;
