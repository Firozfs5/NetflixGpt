const VideoTitle = ({ overview, title }) => {
  return (
    <div className="w-screen h-[96vh] pt-[17%] z-10 px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-lg w-2/6 py-5">{overview}</p>
      <div>
        <button className="bg-white text-black font-bold px-10 py-3 rounded-lg mr-4 hover:bg-white/80 transition-colors duration-200">
          Play
        </button>
        <button className="bg-gray-500/50 text-white font-bold px-10 py-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
