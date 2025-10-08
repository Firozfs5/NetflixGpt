const VideoTitle = ({ overview, title }) => {
  return (
    <div className="pt-36 px-8 absolute">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-lg w-2/6 py-5">{overview}</p>
      <div>
        <button className="bg-black text-white font-semibold px-5 py-3 rounded-md mr-4">
          Play rounded
        </button>
        <button className="bg-black text-white font-semibold px-5 py-3 rounded-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
