"use client";

import useApiCall from "@/hooks/useApiCall";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import ReviewCard from "../card/ReviewCard";

const ReviewSlider = ({ handleOpenModal }) => {
  const sliderRef = useRef(null);
  const { error, isLoading, data, fetchData } = useApiCall();

  // slider settings
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/testimonials`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="overflow-hidden">
        {/* main slider here  */}
        <Slider {...settings} ref={sliderRef}>
          {data?.map((review) => (
            <ReviewCard
              key={review?.id}
              review={review}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ReviewSlider;
