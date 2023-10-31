"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import NotFound from "@/ui/notFound/NotFound";
import Rating from "@/ui/rating/Rating";
import Cookies from "js-cookie";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import profile_demo_img from "/public/images/profile_demo_img.jpg";

const ProfileCard = () => {
  const { error, data, fetchData, isLoading } = useApiCall();

  // get token
  const token = Cookies.get("token");

  // fetch transactions data
  useEffect(() => {
    (async () => {
      try {
        fetchData({
          url: `${process.env.NEXT_PUBLIC_URL}/profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("There was an error fetching the data.", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-auto sm:h-[200px]"} />;
  } else if (data.length === 0) {
    content = <NotFound />;
  } else {
    const { user_name, expert } = data;
    const { rank_no, profile_img, category } = expert;

    content = (
      <div className="grid justify-items-center gap-[10px] py-5 lg:py-[45px] px-5 md:px-[25px] shadow-md bg-white box-hover rounded-md">
        <div className="h-[100px] w-[100px] rounded-full overflow-hidden">
          <Image
            src={profile_img || profile_demo_img}
            height={100}
            width={100}
            alt={"name"}
          />
        </div>

        <div className="flex flex-col items-center gap-1 mt-2">
          <h5 className="text-lg leading-[22px] text-[var(--gray)] font-bold">
            {user_name}
          </h5>
          <span className="text-sm left-4 text-[var(--gray)]">
            {category.name}
          </span>

          <div className="flex items-center gap-[2px] md:gap-1">
            {/*Number of Rating */}

            <Rating
              numberOfReview={rank_no ?? 0}
              className="text-base text-[var(--secondary)]"
            />
          </div>

          {/* <span className="text-sm left-4 text-[var(--gray)]">
            505 Satisfied Customers
          </span> */}
        </div>
      </div>
    );
  }

  // console.log("Profile Data", data);

  return <Fragment>{content}</Fragment>;
};

export default ProfileCard;
