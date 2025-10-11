import MovieCard from "./MovieCard";

// const MovieList = ({ title, movies }) => {
//   console.log(title, movies);

//   return (
//     <div className="px-6 ">
//       <h1 className="max-w-lg text-3xl font-semibold leading-loose text-white">
//         {title}
//       </h1>
//       <div className="flex  overflow-x-scroll scrollbar-hide">
//         <div className="flex">
//           {movies.map((movie) => (
//             <MovieCard key={movie?.id} poster_path={movie?.poster_path} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MovieList;

// import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieList = ({ title, movies }) => {
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute right-0 top-1/3 text-white text-3xl cursor-pointer bg-black bg-opacity-50 px-2 py-6 rounded-l-lg hover:bg-opacity-80 z-10"
      >
        ❯
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute left-0 top-1/3 text-white text-3xl cursor-pointer bg-black bg-opacity-50 px-2 py-6 rounded-r-lg hover:bg-opacity-80 z-10"
      >
        ❮
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 7, // number of visible movie cards
    slidesToScroll: 4,
    arrows: true,
    autoplay: false, // set true if you want auto-slide
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 4, slidesToScroll: 2 },
      },
      {
        breakpoint: 768, // mobile
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="px-6 mb pb-6">
      <h1 className="text-2xl font-semibold text-white mb-4">{title}</h1>

      <Slider {...settings}>
        {movies?.map((movie) => (
          <div key={movie?.id} className="px-2">
            <MovieCard poster_path={movie?.poster_path} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieList;
