"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect } from "react";
import { BsCheck2 } from "react-icons/bs";
import AllPackages from "../common/AllPackages";
import SideBar from "../sideBar/SideBar";
import diamond from "/public/images/diamond.png";

const MembershipMain = () => {
  const { data, isLoading, error, fetchData } = useApiCall();

  // get cookies
  const token = Cookies.get("token");

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/myPackages`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation />;
  } else if (data.length <= 0) {
    content = (
      <>
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[var(--primary)] p-5">
          <h3 className="text-lg md:text-3xl text-white">
            Package Not Available
          </h3>
          <button
            type="button"
            className="text-[16px] leading-[20px] btn-secondary"
          >
            Please Purchase Your Plan
          </button>
        </div>
        {/* pricing plan section here */}
        <div className="w-full text-center mt-10 md:mt-[60px]">
          <h6 className="text-sm md:text-base text-[var(--secondary)]">
            Pricing
          </h6>
          <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
            Choose Pricing Plan
          </h3>
        </div>

        {/* All Packages  */}
        <AllPackages />
      </>
    );
  } else {
    const { title, duration, price, service_number } = data[0].package;
    content = (
      <>
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[var(--primary)] p-5">
          <h3 className="text-lg md:text-3xl text-white">{title}</h3>
          <button
            type="button"
            className="text-[16px] leading-[20px] btn-secondary"
          >
            Duration {duration} days
          </button>
        </div>

        <div className="bg-[var(--primary)] text-white py-2 mt-10 md:mt-[60px]">
          <div className="px-4 py-2">
            <h4 className="text-base md:text-xl leading-5 md:leading-6">
              Package Information
            </h4>
          </div>
          <div className="border-t px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-base md:text-xl leading-5 md:leading-6">
                Package Name {title}
              </h4>
              <h4 className="text-base md:text-xl leading-5 md:leading-6">
                Price ${price}
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-10 mt-5 ">
              {/* package icon */}
              <div className="w-[150px] flex items-center justify-center">
                <Image className="w-16 h-24" src={diamond} alt="diamond" />
              </div>

              {/* package plans */}
              <ul className="grid gap-1 text-white">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--secondary)]">
                    <BsCheck2 />
                  </span>
                  <span>{duration} days continue this package</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--secondary)]">
                    <BsCheck2 />
                  </span>
                  <span>
                    {service_number} service will get from this package
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* pricing plan section here */}
        <div className="w-full text-center mt-10 md:mt-[60px]">
          <h6 className="text-sm md:text-base text-[var(--secondary)]">
            Pricing
          </h6>
          <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
            Choose Pricing Plan
          </h3>
        </div>

        {/* All Packages  */}
        <AllPackages />
      </>
    );
  }

  return (
    <section className="my-5 md:my-10 px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-4">
        {/* Side Bar Here */}
        <SideBar />

        <div className="w-full sm:w-8/12 lg:w-9/12 bg-white shadow-md pb-10">
          {content}
        </div>
      </div>
    </section>
  );
};

export default MembershipMain;
