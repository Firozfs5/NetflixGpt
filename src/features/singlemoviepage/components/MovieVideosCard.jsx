import { IMG_CDN } from "../../../config/constants";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../shared/components/Modal";
import VideoModalBody from "../../../shared/components/VideoModalBody";
import useModal from "../../../shared/hooks/useModal";

const MovieVideosCard = ({ card }) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const backdrop_path = useSelector(
    (store) => store.movie.movieData.movieInfo.backdrop_path
  );

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
    handleOpenModal();
  };

  let { openModal, closeModal, handleOpenModal } = useModal();

  return (
    <div
      className="w-68 select-none flex flex-col "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <img
        src={IMG_CDN + backdrop_path}
        className="scale-92 w-86 h-46 hover:scale-99 transition-transform duration-200 rounded-lg"
        alt="Movie poster"
        draggable="false"
        loading="lazy"
      />
      <span className="text-white text-center font-medium">{card.type}</span>

      {openModal && (
        <Modal closeModal={closeModal}>
          <VideoModalBody videokey={card.key} />
        </Modal>
      )}
    </div>
  );
};

export default React.memo(MovieVideosCard);
// max-76
