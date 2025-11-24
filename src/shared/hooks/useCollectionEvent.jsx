import { useState } from "react";

const useCollectionEvent = (cardsToShow, isInfinite) => {
  const [arrowVisibility, setArrowVisibility] = useState(false);

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
    infinite: isInfinite,
    speed: 600,
    slidesToShow: cardsToShow,
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
  //  PrevArrow, NextArrow,
  return { setArrowVisibility, settings };
};
export default useCollectionEvent;
