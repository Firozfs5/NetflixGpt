import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import React from "react";
import MovieVideosCard from "./MovieVideosCard";

const MovieVideos = () => {
  const [arrowVisibility, setArrowVisibility] = useState(false);
  const movieVideos = useSelector((store) => store.movie.movieData.video);
  const filteredMovieVideos = movieVideos.filter(
    (movie) => movie.site == "YouTube"
  );
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
    infinite: false,
    speed: 600,
    slidesToShow: 5,
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
