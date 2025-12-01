import { RxSpeakerModerate, RxSpeakerOff } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/components/Modal";
import VideoModalBody from "../../../shared/components/VideoModalBody";
import useModal from "../../../shared/hooks/useModal";

const VideoTitle = ({
  overview,
  title,
  trailerAudio,
  setTrailerAudio,
  trailerId,
  movieId,
}) => {
  let navigate = useNavigate();

  let { openModal, closeModal, handleOpenModal } = useModal();

  return (
    <div className="w-screen h-[94vh] flex flex-col pt-[15%]  z-10 px-24 absolute text-white inset-0 bg-linear-to-b from-[#18181b]/70 via-[#18181b]/50 to-[#18181b]/90">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="hidden md:block text-lg w-2/6 py-5">
        {overview.slice(0, 200) + "..."}
      </p>
      <div>
        <button
          onClick={handleOpenModal}
          className="bg-white text-black font-bold px-10 py-3 rounded-lg mr-4 hover:bg-white/80 transition-colors duration-200"
        >
          Play
        </button>
        <button
          onClick={() => navigate("/movie/" + movieId)}
          className="bg-gray-500/50 text-white font-bold px-10 py-3 rounded-lg hover:bg-white/50 transition-colors duration-200"
        >
          More Info
        </button>
      </div>
      <button
        onClick={() => setTrailerAudio(!trailerAudio)}
        className="absolute right-14 bottom-25 text-4xl p-3 bg-black/40 rounded-full hover:bg-black/60 scale-90 hover:scale-110 transition-transform duration-300"
      >
        {!trailerAudio ? <RxSpeakerOff /> : <RxSpeakerModerate />}
      </button>

      {/* modal */}
      {openModal && (
        <Modal closeModal={closeModal}>
          <VideoModalBody videokey={trailerId} />
        </Modal>
      )}
    </div>
  );
};

export default VideoTitle;
//70
