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

// import ReactDOM from "react-dom";

// const Modal = ({ children, closeModal }) => {
//   const modalRoot = document.getElementById("modal-root");

//   return ReactDOM.createPortal(
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       onClick={closeModal} // overlay click closes
//     >
//       {/* 🔥 Black Frosted Overlay */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

//       {/* 🔥 Glass Panel */}
//       <div
//         className="
//           relative z-10
//           bg-black/30 backdrop-blur-md
//           border border-white/10
//           shadow-2xl
//           rounded-2xl
//           p-4
//           max-w-5xl w-[90%] h-auto
//         "
//         onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
//       >
//         {children}
//       </div>
//     </div>,
//     modalRoot
//   );
// };

// export default Modal;
