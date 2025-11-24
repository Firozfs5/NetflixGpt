import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import React from "react";
import CastCard from "./CastCard";
import useCollectionEvent from "../../../shared/hooks/useCollectionEvent";
const CastCollection = () => {
  const castData = useSelector((store) => store.movie.movieData.movieCast);
  const { setArrowVisibility, settings } = useCollectionEvent(6, false);

  return (
    <div
      className={" mt-6 p-4 py-3  rounded-lg relative bg-[#313647]/30"}
      onMouseEnter={() => setArrowVisibility(true)}
      onMouseLeave={() => setArrowVisibility(false)}
    >
      <h1 className={"text-[29px] font-bold text-white mb-1 ml-4"}>
        Movie Cast
      </h1>

      <Slider {...settings}>
        {castData?.map((card) =>
          !card.profile_path ? null : (
            <div key={card?.id} className="px-2">
              <CastCard card={card} />
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export default React.memo(CastCollection);
