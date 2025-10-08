import useMovieTrailer from "../hooks/useTrailerVideo";

const VideoBackground = ({ movieId }) => {
  let trailerId = useMovieTrailer(movieId);
  return (
    <div className=" ">
      <iframe
        className="w-screen h-[96vh]"
        // src={`https://www.youtube.com/embed/${trailerId}?autoplay=2&mute=3&controls=0`}
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default VideoBackground;
