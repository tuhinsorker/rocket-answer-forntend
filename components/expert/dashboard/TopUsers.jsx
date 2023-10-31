"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import NotFound from "@/ui/notFound/NotFound";
import imgPath from "@/utils/imgPath";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect } from "react";
import { BsGeoAlt } from "react-icons/bs";
import profile_demo_img from "/public/images/profile_demo_img.jpg";

const TopUsers = () => {
  const { data, error, fetchData, isLoading } = useApiCall();

  // get token
  const token = Cookies.get("token");

  // fetch top user data
  useEffect(() => {
    (async () => {
      try {
        fetchData({
          url: `${process.env.NEXT_PUBLIC_URL}/top_customers?limit=10`,
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
    content = data.map((user) => {
      const { customer_id, customer, total } = user;
      const { name, image, country } = customer;
      return (
        <div
          key={customer_id}
          className="flex items-center justify-between pb-2.5 pt-2 px-5 md:px-10 border-t"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={image ? imgPath(image) : profile_demo_img}
                alt="img"
                height={40}
                width={40}
              />
            </div>
            <div className="text-[var(--primary)]">
              <p>{name ?? ""}</p>
              <p className="flex items-center text-sm">
                <BsGeoAlt />
                {country?.name}
              </p>
            </div>
          </div>

          <p className="text-xl text-[var(--primary)]">
            ${total}
            {/* $250.00 */}
          </p>
        </div>
      );
    });
  }

  return (
    <div className="flex-none sm:flex-1 w-full bg-white shadow-md box-hover rounded-md">
      <h3 className="text-xl text-[var(--primary)] pt-3 px-5 md:px-10">
        Top Users
      </h3>
      <div className="mt-3">{content}</div>
    </div>
  );
};

export default TopUsers;
