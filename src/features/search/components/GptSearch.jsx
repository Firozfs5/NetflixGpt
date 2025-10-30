import NetflixFooter from "../../../shared/components/NetflixFooter";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
const GptSearch = () => {
  return (
    // <div className="fixed h-full w-full bg-[#18181b] overflow-y-scroll">
    <div className="min-h-screen bg-[#18181b] ">
      <GptSearchBar />
      <GptMovieSuggestion />
      <NetflixFooter />
    </div>
  );
};
export default GptSearch;
