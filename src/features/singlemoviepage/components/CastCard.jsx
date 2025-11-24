import { IMG_CDN } from "../../../config/constants";
import React from "react";
import useCardEvent from "../../../shared/hooks/useCardEvent";

const CastCard = ({ card }) => {
  let [handleMouseDown, handleMouseMove, handleClick] = useCardEvent(
    card,
    "person"
  );
  return (
    <div
      className="w-52 select-none flex flex-col"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <img
        src={IMG_CDN + card.profile_path}
        className="scale-92 hover:scale-99 transition-transform duration-200 rounded-lg"
        alt="Movie poster"
        draggable="false"
        loading="lazy"
      />
      <span className="text-white text-center">{card.original_name}</span>
      <span className="text-white text-center">({card.character})</span>
    </div>
  );
};

export default React.memo(CastCard);
