import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// card - is the details of person in cast present
// pagename - is the page at where is need to open
// separatepage is that use to make to open new website or within it
const useCardEvent = (card, pageName = false, separatePage = false) => {
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
    if (separatePage) {
      window.open(
        `https://www.themoviedb.org/person/${card.id + "-" + card.name}`
      );
    } else if (pageName) {
      navigate(`/${pageName}/${card.id}`);
    }
  };

  return [handleMouseDown, handleMouseMove, handleClick];
};

export default useCardEvent;
