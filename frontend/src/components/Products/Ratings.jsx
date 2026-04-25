import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const starts = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starts.push(
        <AiFillStar
          size={20}
          key={i}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />,
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      starts.push(
        <BsStarHalf
          size={17}
          color="#f6ba00"
          key={i}
          className="mr-2 cursor-pointer"
        />,
      );
    } else {
      starts.push(
        <AiOutlineStar
          key={i}
          size={20}
          className="mr-2 cursor-pointer"
          color="#f6ba00"
        />,
      );
    }
  }
  return <div className="flex">{starts}</div>;
};

export default Ratings;
