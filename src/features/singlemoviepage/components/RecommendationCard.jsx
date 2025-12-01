import { IMG_CDN } from "../../../config/constants";
import React from "react";
import useCardEvent from "../../../shared/hooks/useCardEvent";

const RecommendationCard = ({ card }) => {
  let [handleMouseDown, handleMouseMove, handleClick] = useCardEvent(
    card,
    "movie"
  );

  return (
    <div
      className="w-68 select-none flex flex-col "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <img
        src={IMG_CDN + card.backdrop_path}
        className="scale-92 w-86 h-46 hover:scale-99 transition-transform duration-200 rounded-lg"
        alt="Movie poster"
        draggable="false"
        loading="lazy"
      />
      <span className="text-white text-center">{card.title}</span>
    </div>
  );
};

export default React.memo(RecommendationCard);
//56
