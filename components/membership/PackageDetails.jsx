"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Image from "next/image";
import { useEffect } from "react";
import { BsCheck2 } from "react-icons/bs";
import Payment from "../common/Payment";
import diamond from "/public/images/diamond.png";

const PackageDetails = ({ packageId }) => {
  const { error, isLoading, data, fetchData } = useApiCall();

  // find single package by id
  const singlePackage = data?.find((p) => p.id === packageId * 1);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/packageList`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    return (content = <Error message={error?.message} />);
  }

  // loading check
  if (isLoading === true && data === null) {
    return (content = <FallingLinesAnimation />);
  }

  // render final data
  if (isLoading !== true && data !== null) {
    // check if single package is not exist
    if (singlePackage === undefined) {
      return (content = <h2>no data found</h2>);
    }

    const { id, title, price, service_number, duration, offer_price } =
      singlePackage;

    return (content = (
      <>
        {/* package details here */}
        <div className="w-full text-center mt-10 md:mt-[60px]">
          <h6 className="text-sm md:text-base text-[var(--secondary)]">
            Checkout
          </h6>
          <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
            Your Plan Information
          </h3>
        </div>

        <div className="bg-[var(--primary)] text-white py-2 mt-10 md:mt-[60px]">
          <div className="px-4 py-2">
            <h4 className="text-base md:text-xl leading-5 md:leading-6">
              Order Information
            </h4>
          </div>

          <div className="border-y px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-base md:text-xl leading-5 md:leading-6">
                {title}
              </h4>
              <h4 className="text-base md:text-xl leading-5 md:leading-6">
                {offer_price ? (
                  <>
                    USD {offer_price}{" "}
                    <span className="line-through text-lg">${price}</span>
                  </>
                ) : (
                  `$${price}`
                )}
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-10 mt-5 sm:mt-2">
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

          <div className="flex items-center justify-between px-4 py-2">
            <h4 className="text-base md:text-xl leading-5 md:leading-6">
              Total Price
            </h4>
            <h2 className="text-2xl lg:text-4xl text-[var(--secondary)]">
              USD {offer_price ? offer_price : price}
            </h2>
          </div>
        </div>

        {/* Payment Option Here */}
        <Payment price={offer_price ? offer_price : price} packageId={id} />
      </>
    ));
  }

  return <>{content}</>;
};

export default PackageDetails;
