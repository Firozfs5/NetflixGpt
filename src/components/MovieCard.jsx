import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  return (
    <div className="w-48 pr-4">
      <img src={IMG_CDN + poster_path} alt="" />
    </div>
  );
};

export default MovieCard;
