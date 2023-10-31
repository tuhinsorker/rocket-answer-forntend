"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import PricingCard from "../card/PricingCard";

const AllPackages = () => {
  const pathname = usePathname();
  const { error, isLoading, data, fetchData } = useApiCall();

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
    content = <Error message={error?.message} />;
  }
  // loading and empty data check
  if (isLoading === true && data === null) {
    content = <FallingLinesAnimation />;
  }
  // render final data
  if (data !== null) {
    content = data.map((item, i) => {
      return (
        <PricingCard key={item.id} data={item} index={i} pathname={pathname} />
      );
    });
  }

  // return content;
  return (
    <div className="flex flex-wrap justify-center mt-6 sm:mt-10 lg:mt-[60px]">
      {/* content here */}
      {content}
    </div>
  );
};

export default AllPackages;
