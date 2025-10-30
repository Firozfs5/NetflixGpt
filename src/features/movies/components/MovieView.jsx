import React from "react";
// import Header from "../../../shared/components/Header";
import { useParams } from "react-router-dom";

const MovieView = () => {
  let { movieId } = useParams();
  console.log(movieId);
  return (
    <div className="bg-[#18181b] w-screen h-screen  ">{/* <Header /> */}</div>
  );
};

export default MovieView;

// https://www.perplexity.ai/search/i-want-movie-detail-page-simil-DvoKN27uQgCnXNgrBMyh_g
