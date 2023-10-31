"use client";

import Rating from "@/ui/rating/Rating";
import imgPath from "@/utils/imgPath";
import Image from "next/image";
import profile_demo_img from "/public/images/profile_demo_img.jpg";

const ReviewCard = ({ review, handleOpenModal }) => {
  const { name, designation, rating, description, image } = review;

  return (
    <div className="py-5 sm:py-10">
      <div className="grid justify-items-center gap-[10px] py-5 lg:py-[45px] px-5 md:px-[25px] rounded-[15px] shadow-md border box-hover">
        <div className="h-[88px] w-[88px] rounded-full overflow-hidden">
          <Image
            src={(image && imgPath(image)) || profile_demo_img}
            height={88}
            width={88}
            alt={name}
          />
        </div>
        <p className="text-sm lg:text-base leading-4 lg:leading-5 text-[var(--gray)] text-center h-[50px] overflow-hidden">
          {description.slice(0, 90)}
          {description.length < 90 ? (
            ""
          ) : (
            <span
              className="font-bold cursor-pointer"
              onClick={() => handleOpenModal(description)}
            >
              {" "}
              more....
            </span>
          )}
          {/* {"description".slice(0, 5)} */}
        </p>

        <div className="flex flex-col items-center gap-1 mt-2">
          <h5 className="text-lg leading-[22px] text-[var(--gray)] font-bold">
            {name}
          </h5>
          <div className="flex items-center gap-[2px] md:gap-1">
            {/*Number of Rating */}
            <Rating
              numberOfReview={rating}
              className="text-base text-[var(--secondary)]"
            />
          </div>
          <span className="text-sm left-4 text-[var(--gray)]">
            {designation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
