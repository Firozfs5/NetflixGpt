import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
const GptSearch = () => {
  return (
    <div>
      <div className="fixed h-full w-full">
        <img
          src="/searchBarImg.jpg"
          alt="background_img"
          className="w-full h-full object-cover"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
