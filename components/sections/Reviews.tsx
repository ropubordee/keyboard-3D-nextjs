import React from "react";
import Marquee from "react-fast-marquee";
import ReviewCard from "../ReviewCard";
import { reviews } from "@/mockdata/reviewsdata";
const Reviews = () => {
  return (
    <div>
      <h2 className="text-2xl  font-semibold pl-4 md:pl-16 pb-16">
        <span className="animate-ping">/</span>
        reviews
      </h2>

      <Marquee speed={25}>
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            imgSrc={review.imgSrc}
            name={review.name}
            starts={review.stars}
            text={review.text}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
