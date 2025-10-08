import useMovieTrailer from "../hooks/useTrailerVideo";

const VideoBackground = ({ movieId }) => {
  let trailerId = useMovieTrailer(movieId);
  return (
    <div className=" ">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default VideoBackground;
