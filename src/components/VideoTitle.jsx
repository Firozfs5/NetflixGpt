import { RxSpeakerModerate, RxSpeakerOff } from "react-icons/rx";
const VideoTitle = ({ overview, title, trailerAudio, setTrailerAudio }) => {
  return (
    <div className="w-screen h-[96vh] flex flex-col pt-[17%] z-10 px-24 absolute text-white bg-gradient-to-r from-black/0">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="hidden md:block text-lg w-2/6 py-5">
        {overview.slice(0, 200) + "..."}
      </p>
      <div>
        <button className="bg-white text-black font-bold px-10 py-3 rounded-lg mr-4 hover:bg-white/80 transition-colors duration-200">
          Play
        </button>
        <button className="bg-gray-500/50 text-white font-bold px-10 py-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
          More Info
        </button>
      </div>
      <button
        onClick={() => setTrailerAudio(!trailerAudio)}
        className="absolute right-14 bottom-25 text-4xl p-3 bg-black/40 rounded-full hover:bg-black/60 scale-90 hover:scale-110 transition-transform duration-300"

        // className="self-end mt-12 ml-22 text-4xl outline-0 "
      >
        {!trailerAudio ? <RxSpeakerOff /> : <RxSpeakerModerate />}
      </button>
    </div>
  );
};

export default VideoTitle;
