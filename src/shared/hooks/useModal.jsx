import { useState } from "react";

const useModal = () => {
  let [openModal, setOpenModal] = useState(false);

  const closeModal = (e) => {
    e.stopPropagation();
    setOpenModal(false);
    document.body.style.overflow = "";
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
    document.body.style.overflow = openModal ? "" : "hidden";
  };

  return { openModal, closeModal, handleOpenModal, toggleModal };
};

export default useModal;
