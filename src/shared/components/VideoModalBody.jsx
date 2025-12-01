import { RxCross2 } from "react-icons/rx";

const ModalBody = ({ videokey, closeModal }) => {
  return (
    <div className="w-4/5 h-4/5">
      <div className="absolute top-6 left-[93%] text-white">
        <span onClick={(e) => closeModal(e)}>
          <RxCross2 className="text-4xl font-bold hover:scale-120 transition duration-200" />
        </span>
      </div>
      <div>
        <iframe
          className="w-full h-[600px] rounded-2xl"
          src={`https://www.youtube.com/embed/${videokey}?autoplay=1&mute=4&rel=0&controls=1&modestbranding=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};

export default ModalBody;
