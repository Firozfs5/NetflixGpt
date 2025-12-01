import ReactDOM from "react-dom";

const Modal = ({ children, closeModal }) => {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm shadow-xl rounded-2xl flex justify-center items-center z-50 "
      onClick={closeModal}
    >
      {children}
    </div>,
    modalRoot
  );
};
export default Modal;
