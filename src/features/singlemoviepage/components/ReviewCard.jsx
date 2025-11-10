import { useState } from "react";
import { IMG_CDN } from "../../../config/constants";

const ReviewCard = ({ review }) => {
  let [readMore, setReadMore] = useState(false);
  const formatDate = (dateString) => new Date(dateString).toDateString();

  return (
    <div
      key={review.id || review.created_at}
      className="bg-[#1e1f24]/80 rounded-lg mt-4 shadow-md hover:bg-[#2a2b30]/80 transition-all duration-200"
    >
      <div className="flex p-3 items-center">
        <img
          src={
            review.author_details.avatar_path
              ? review.author_details.avatar_path.startsWith("/https")
                ? review.author_details.avatar_path.slice(1)
                : IMG_CDN + review.author_details.avatar_path
              : "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png"
          }
          alt={`${review.author}'s avatar`}
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-bold text-[22px]">A review by {review.author}</h4>
          <h6 className="font-normal text-[16px] text-gray-300">
            Written by <span>{review.author}</span> on{" "}
            <span className="text-gray-400">
              {formatDate(review.created_at)}
            </span>
          </h6>
        </div>
      </div>

      <div className="p-3">
        <p className="text-lg font-normal text-gray-200 leading-relaxed">
          {readMore ? review.content : review.content.slice(0, 490) + "..."}{" "}
          <span
            className=" border-0 hover:border-b-2"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Read Less" : "Read More"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
