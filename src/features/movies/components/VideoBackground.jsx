import useMovieTrailer from "../hooks/useTrailerVideo";

const VideoBackground = ({ movieId, trailerAudio }) => {
  let trailerId = useMovieTrailer(movieId);
  return (
    <div className="relative w-screen h-[94vh]  overflow-hidden ">
      <iframe
        className="absolute w-screen  -mt-8 top-1/2 left-1/2 h-[129vh] -translate-x-1/2 -translate-y-1/2"
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=${
          trailerAudio ? "5" : "1"
        }&controls=0&loop=1&playlist=${trailerId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default VideoBackground;
