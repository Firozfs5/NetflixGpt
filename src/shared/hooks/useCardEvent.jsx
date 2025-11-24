import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const useCardEvent = (card, pageName) => {
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
    navigate(`/${pageName}/${card.id}`);
  };

  return [handleMouseDown, handleMouseMove, handleClick];
};

export default useCardEvent;
