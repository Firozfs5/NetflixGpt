import { useNavigate } from "react-router-dom";
import { IMG_CDN } from "../../../config/constants";
import React, { useRef } from "react";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = false;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (Math.abs(e.clientX - startX.current) > 6) {
      isDragging.current = true; // mark as drag
    }
  };

  const handleClick = (e) => {
    if (isDragging.current) {
      e.preventDefault(); // 🚫 cancel navigation if drag happened
      return;
    }
    // ✅ Real click — navigate manually
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="w-52 select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <img
        src={IMG_CDN + movie.poster_path}
        className="scale-92 hover:scale-99 transition-transform duration-200 rounded-lg"
        alt="Movie poster"
        draggable="false"
      />
    </div>
  );
};

export default React.memo(MovieCard);
