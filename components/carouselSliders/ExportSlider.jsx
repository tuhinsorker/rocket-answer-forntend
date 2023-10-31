"use client";

import Rating from "@/ui/rating/Rating";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Slider from "react-slick";
import batch from "/public/images/batch.png";

const ExportSlider = ({ data }) => {
  const sliderRef = useRef(null);

  // slider settings
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: data.length < 4 ? data.length : 4,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 676,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      {data.map((itm, i) => (
        <div key={i} className="py-5 md:py-10 !w-[320px]">
          <div className="grid justify-items-center py-[30px] md:py-[45px] px-[25px] border shadow-md rounded-md box-hover relative">
            {/* batch img */}
            <div className="absolute top-0 right-2">
              <Image src={batch} alt="batch" className="w-full h-full" />
            </div>

            <div className="h-20 w-20 rounded-full overflow-hidden border">
              {/* Expert  img here */}
              <Image
                src={itm.profile_img}
                alt="avt"
                className=""
                height={80}
                width={80}
              />
            </div>

            {/* Expert  details */}
            <div className="text-center mt-4 md:mt-6">
              <Link
                href="/"
                className="block text-lg lg:text-xl text-[var(--gray)] font-medium"
              >
                Jonathan Smith
              </Link>
              <span className="text-sm lg:text-lg leading-5 lg:leading-6 text-[var(--gray)] mt-1">
                Family Lawyear
              </span>
            </div>

            {/* rating */}
            <div className="flex items-center gap-[2px] md:gap-1 mt-2">
              {/* <BsFillStarFill className="text-xs lg:text-lg leading-4 lg:leading-6 text-[var(--secondary)]" />
              <BsFillStarFill className="text-xs lg:text-lg leading-4 lg:leading-6 text-[var(--secondary)]" />
              <BsFillStarFill className="text-xs lg:text-lg leading-4 lg:leading-6 text-[var(--secondary)]" />
              <BsFillStarFill className="text-xs lg:text-lg leading-4 lg:leading-6 text-[var(--secondary)]" />
              <BsFillStarFill className="text-xs lg:text-lg leading-4 lg:leading-6 text-[var(--secondary)]" /> */}
              <Rating
                numberOfReview={4.5}
                className="text-xs lg:text-lg leading-4 lg:leading-6 text-[var(--secondary)]"
              />
            </div>

            {/* total Customers */}
            <p className="text-sm lg:text-base text-[var(--gray)] text-center mt-2">
              505 Satisfied Customers
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ExportSlider;
