import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  return (
    <div className="w-52">
      <img
        src={IMG_CDN + poster_path}
        className="scale-92 hover:scale-99 transition-transform duration-200 rounded-lg"
        alt=""
      />
    </div>
  );
};

export default MovieCard;
