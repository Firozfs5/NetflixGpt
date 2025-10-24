import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";

const MovieView = () => {
  let { movieId } = useParams();
  console.log(movieId);
  return (
    <div>
      <Header />
    </div>
  );
};

export default MovieView;
