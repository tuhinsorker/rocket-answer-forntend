"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";

const CategoriesSlider = () => {
  const sliderRef = useRef(null);
  const { error, isLoading, data, fetchData } = useApiCall();

  // slider settings
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 7,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerPadding: "0px",
    responsive: [
      // {
      //   breakpoint: 450,
      //   settings: {
      //     slidesToShow: 1,
      //   },
      // },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/expertCategories`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }
  // loading and empty data check
  if (isLoading === true && data === null) {
    content = <FallingLinesAnimation />;
  }
  // render final data
  if (data !== null) {
    content = data.map((item) => {
      const { id, icon, name } = item;

      const makeUrl = name.toLowerCase().split(" ").join("_");

      return (
        <Link href={`/category/${makeUrl}?categoryId=${id}`} key={id}>
          {/* slider single item */}
          <div className="flex items-center justify-center gap-2 text-[var(--violet)] hover:text-white bg-inherit hover:bg-[var(--secondary)] transition-all duration-500 cursor-pointer border border-opacity-80 rounded-[4px] py-2">
            <div className="h-[36px] w-[36px] overflow-hidden">
              <Image
                src={icon}
                alt={name}
                width={36}
                height={36}
                className="w-full h-full"
              />
            </div>
            <h6 className="text-base leading-5">{name}</h6>
          </div>
          {/* <div className="flex flex-col items-center justify-center text-[var(--violet)] hover:text-white bg-inherit hover:bg-[var(--secondary)] transition-all duration-500 cursor-pointer py-3 sm:py-6 lg:py-10 border border-opacity-80">
            <div className="h-[50px] sm:h-[70px] w-[50px] sm:w-[70px] overflow-hidden">
              <Image
                src={icon}
                alt={name}
                width={50}
                height={70}
                className="w-full h-full"
              />
            </div>
            <h6 className="text-xl leading-7 mt-3 lg:mt-5">{name}</h6>
          </div> */}
        </Link>
      );
    });
  }

  return (
    // <section className="mt-[60px] md:mt-[120px]">
    <section className="mt-[30px] md:mt-[60px]">
      <div className="relative max-w-[1296px] mx-auto">
        {/* main slider here  */}
        <div className="mx-9 sm:mx-11">
          <Slider {...settings} ref={sliderRef}>
            {/* Content  */}
            {content}
          </Slider>
        </div>

        {/* slider navigators  */}
        <div className="navigator">
          {/* slick Prev navigator */}
          <button
            type={"button"}
            className="absolute -translate-y-1/2 top-1/2 left-2"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <BsChevronLeft className="text-2xl text-[var(--gray-2)]" />
          </button>

          {/* slick Next navigator */}
          <button
            type={"button"}
            className="absolute -translate-y-1/2 top-1/2 right-2"
            onClick={() => sliderRef.current.slickNext()}
          >
            <BsChevronRight className="text-2xl text-[var(--gray-2)]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
