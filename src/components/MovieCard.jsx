import { Link } from "react-router-dom";
import { IMG_CDN } from "../utils/constants";
import React from "react";
const MovieCard = ({ movie }) => {
  return (
    <div className="w-52">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={IMG_CDN + movie.poster_path}
          className="scale-92 hover:scale-99 transition-transform duration-200 rounded-lg"
          alt="Movie poster"
        />
      </Link>
    </div>
  );
};

export default React.memo(MovieCard);
