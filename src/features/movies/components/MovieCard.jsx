// import { useNavigate } from "react-router-dom";
import { IMG_CDN } from "../../../config/constants";
import React from "react";
import useCardEvent from "../../../shared/hooks/useCardEvent";

const MovieCard = ({ movie }) => {
  let [handleMouseDown, handleMouseMove, handleClick] = useCardEvent(
    movie,
    "movie"
  );
  return (
    <div
      className="w-56 select-none "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <img
        src={IMG_CDN + movie.poster_path}
        className="scale-92 hover:scale-99 transition-transform duration-240 rounded-lg z-0"
        alt="Movie poster"
        draggable="false"
        loading="lazy"
      />
    </div>
  );
};

export default React.memo(MovieCard);
