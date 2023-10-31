import Error from "@/ui/error/Error";
import Link from "next/link";
import { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";

const CategorySlider = ({ data, error, isLoading }) => {
  const sliderRef = useRef(null);

  // slider settings
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // render final data
  if (data !== null) {
    content = data.map((item) => {
      const { id, icon, name } = item;

      const makeUrl = name.toLowerCase().split(" ").join("_");

      return (
        <div
          key={id}
          className="text-center hover:bg-[var(--primary)] rounded-md transition-all duration-500"
        >
          {/* slider single item */}
          <Link
            href={`/pay-for-consultancy?category_name=${name.toLowerCase()}&category_id=${id}`}
            className="text-xs leading-7 text-white"
          >
            {name}
          </Link>
        </div>
      );
    });
  }

  return (
    <div className="category-slider relative">
      {/* main slider here  */}
      <div className="mx-2 sm:mx-4">
        <Slider {...settings} ref={sliderRef}>
          {/* content */}
          {content}
        </Slider>
      </div>

      {/* slider navigators  */}
      <div className="navigator">
        {/* slick Prev navigator */}
        <button
          type={"button"}
          className="absolute -translate-y-1/2 top-1/2 -left-[5px]"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <BsChevronLeft className="text-xs text-white" />
        </button>

        {/* slick Next navigator */}
        <button
          type={"button"}
          className="absolute -translate-y-1/2 top-1/2 -right-[5px]"
          onClick={() => sliderRef.current.slickNext()}
        >
          <BsChevronRight className="text-xs text-white" />
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
