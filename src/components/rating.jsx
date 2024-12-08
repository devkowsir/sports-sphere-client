import React from "react";
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

export const Rating = ({ maxRating, achievedRating, className }) => {
  const stars = [];
  for (let i = 0; i < maxRating; i++) {
    if (achievedRating - i <= 0) stars[i] = FaRegStar;
    else if (achievedRating - i >= 0.5) stars[i] = FaStar;
    else stars[i] = FaStarHalfStroke;
  }

  return (
    <div className={`flex gap-x-0.5 ${className}`}>
      {stars.map((Star, i) => (
        <Star key={i} className="inline text-xl text-orange-500" />
      ))}
    </div>
  );
};
