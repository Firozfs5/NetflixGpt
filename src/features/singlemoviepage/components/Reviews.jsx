import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const { reviews } = useSelector((store) => store.movie.movieData);

  return !reviews || reviews.length === 0 ? (
    <div className="bg-[#111111]/30 w-full mt-6 rounded-lg p-3 px-5 text-white">
      <h1 className="font-bold text-4xl">Reviews</h1>
      <p className="text-gray-400 mt-4">No reviews available.</p>
    </div>
  ) : (
    <div className="bg-[#111111]/30 w-full mt-6 rounded-lg p-3 px-5 text-white">
      <h1 className="font-bold text-4xl">Reviews</h1>
      {reviews.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
};

export default Reviews;
