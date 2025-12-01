import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import React from "react";
import RecommendationCard from "./RecommendationCard";
import useCollectionEvent from "../../../shared/hooks/useCollectionEvent";

const Recommendation = () => {
  const recommendationData = useSelector(
    (store) => store.movie.movieData.recommendation
  );
  const { setArrowVisibility, settings } = useCollectionEvent(5, false);

  return (
    <div
      className={" mt-6 p-4 py-3  rounded-lg relative bg-[#313647]/30"}
      onMouseEnter={() => setArrowVisibility(true)}
      onMouseLeave={() => setArrowVisibility(false)}
    >
      <h1 className={"text-[29px] font-bold text-white mb-1 ml-4"}>
        Recommendation
      </h1>

      {!recommendationData.length ? (
        <p className="text-gray-400 mb-1 ml-4">No reviews available.</p>
      ) : (
        <Slider {...settings}>
          {recommendationData?.map((card) =>
            !card.backdrop_path ? null : (
              <div key={card?.id} className="px-2 mt-2">
                <RecommendationCard card={card} />
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default React.memo(Recommendation);
