import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import React from "react";
import useCollectionEvent from "../../../shared/hooks/useCollectionEvent";
const MovieList = ({ title, movies }) => {
  let { gptSearchView } = useSelector((store) => store.gpt);

  const { setArrowVisibility, settings } = useCollectionEvent(6, false);

  return (
    <div
      className={gptSearchView ? " mt-8 p-4 relative" : "px-6 pb-6 "}
      onMouseEnter={() => setArrowVisibility(true)}
      onMouseLeave={() => setArrowVisibility(false)}
    >
      <h1
        className={
          gptSearchView
            ? "text-3xl font-bold text-white mb-1 ml-4"
            : "text-2xl font-semibold text-white mb-4"
        }
      >
        {title}
      </h1>

      <Slider {...settings}>
        {movies?.map((movie) =>
          !movie.poster_path ? null : (
            <div key={movie?.id} className="px-2">
              <MovieCard movie={movie} />
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export default React.memo(MovieList);
