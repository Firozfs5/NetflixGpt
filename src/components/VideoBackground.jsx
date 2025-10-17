import useMovieTrailer from "../hooks/useTrailerVideo";

const VideoBackground = ({ movieId, trailerAudio }) => {
  let trailerId = useMovieTrailer(movieId);
  return (
    <div className="relative w-screen h-screen  overflow-hidden ">
      {/* <div className=""> */}
      <iframe
        className="absolute -mt-8 top-1/2 left-1/2 w-[120vw] h-[129vh] -translate-x-1/2 -translate-y-1/2"
        // className="w-screen h-screen"
        // src={`https://www.youtube.com/embed/${trailerId}?autoplay=2&mute=3&controls=0`}
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
