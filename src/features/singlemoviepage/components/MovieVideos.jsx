import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import React from "react";
import MovieVideosCard from "./MovieVideosCard";
import useCollectionEvent from "../../../shared/hooks/useCollectionEvent";

const MovieVideos = () => {
  const movieVideos = useSelector((store) => store.movie.movieData.video);
  const filteredMovieVideos = movieVideos.filter(
    (movie) => movie.site == "YouTube"
  );
  const { setArrowVisibility, settings } = useCollectionEvent(5, false);

  return (
    <div
      className={" mt-6 p-4 py-3  rounded-lg relative bg-[#313647]/30"}
      onMouseEnter={() => setArrowVisibility(true)}
      onMouseLeave={() => setArrowVisibility(false)}
    >
      <h1 className={"text-[29px] font-bold text-white mb-1 ml-4"}>Videos</h1>

      <Slider {...settings}>
        {filteredMovieVideos?.map((card) => (
          <div key={card?.id} className="px-2">
            <MovieVideosCard card={card} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(MovieVideos);
