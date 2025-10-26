import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
const GptSearch = () => {
  return (
    <div className="fixed h-full w-full bg-[#18181b] overflow-y-scroll">
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};
export default GptSearch;
