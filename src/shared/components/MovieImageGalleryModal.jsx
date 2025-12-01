import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMG_CDN } from "../../config/constants";

export default function MovieImageGalleryModal({ movieData }) {
  const sample = [
    "https://icrier.org/wp-content/uploads/2022/10/media-Event-Image-Not-Found.jpg",
  ];

  const data = movieData.movieImages?.length
    ? movieData.movieImages.map((img) => IMG_CDN + img.file_path)
    : sample;

  const settings = {
    dots: false,
    infinite: false,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <button
        aria-label="Prev"
        className="absolute z-10 left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 
                   w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center 
                   text-2xl font-bold hover:bg-gray-100"
      >
        ‹
      </button>
    ),
    nextArrow: (
      <button
        aria-label="Next"
        className="absolute z-10 right-0 translate-x-1/2 top-1/2 -translate-y-1/2
                   w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center 
                   text-2xl font-bold hover:bg-gray-100"
      >
        ›
      </button>
    ),
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-white">
        {movieData.movieInfo.original_title}
      </h2>

      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <Slider {...settings}>
          {data.map((img, idx) => (
            <div key={img.id ?? idx} className="px-2">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={img}
                  alt={"Movie's Image"}
                  className="w-full h-96 object-cover block"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
