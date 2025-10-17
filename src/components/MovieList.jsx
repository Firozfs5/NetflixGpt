import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const MovieList = ({ title, movies }) => {
  const [arrowVisibility, setArrowVisibility] = useState(false);
  let { gptSearchView } = useSelector((store) => store.gpt);
  console.log(gptSearchView);
  // ✅ Corrected Left Arrow
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`${
          arrowVisibility ? "opacity-100" : "opacity-0"
        } absolute left-0 top-1/3 text-white text-3xl cursor-pointer bg-black bg-opacity-50 px-2 py-6 rounded-r-lg hover:bg-opacity-80 z-10 transition-opacity duration-300`}
      >
        ❮
      </div>
    );
  }

  // ✅ Corrected Right Arrow
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`${
          arrowVisibility ? "opacity-100" : "opacity-0"
        } absolute right-0 top-1/3 text-white text-3xl cursor-pointer bg-black bg-opacity-50 px-2 py-6 rounded-l-lg hover:bg-opacity-80 z-10 transition-opacity duration-300`}
      >
        ❯
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 4,
    arrows: true,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div
      className={
        gptSearchView ? "bg-black/80 mt-8 p-4 relative" : "px-6 pb-6 relative "
      }
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
              <MovieCard poster_path={movie?.poster_path} />
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export default MovieList;
