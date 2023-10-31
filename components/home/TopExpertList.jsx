"use client";

import { HomeContext } from "@/context/homeContext";
import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Spin from "@/ui/spin/Spin";
import { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import ExpertCard from "../card/ExpertCard";

const TopExpertList = () => {
  const { data } = useContext(HomeContext);
  const { top_head_description, top_head_text } = data;
  const { error, isLoading, data: topExpertData, fetchData } = useApiCall();
  const [slice, setSlice] = useState(8);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL}/customer/topExperts?limit=${slice}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slice]);

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // loading and empty data check
  if (isLoading === true && topExpertData === null) {
    content = <FallingLinesAnimation />;
  }

  // render final data
  if (topExpertData !== null) {
    content = topExpertData.map((item) => (
      <ExpertCard key={item.id} data={item} />
    ));
  }

  // console.log(topExpertData);

  return (
    // <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto">
        <div className="text-center">
          <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] text-[var(--primary)] font-bold">
            {top_head_text}
          </h3>
          <p className="text-base leading-5 w-auto sm:w-[58ch] text-[var(--gray)] inline-block mt-3 md:mt-5">
            {top_head_description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-[15px] lg:gap-[30px] mt-6 sm:mt-10 lg:mt-[60px]">
          {/* content here */}
          {content}

          <button
            type="button"
            className="w-full sm:w-[360px] lg:w-[370px] 2xl:w-[370px] h-[100px] sm:h-[120px] flex items-center justify-center gap-2 border border-[#ECEDF2] rounded-md bg-white hover:bg-[var(--light-yellow)] transition-all duration-500 p-2 lg:p-[15px]"
            onClick={() => setSlice((pre) => pre + 8)}
          >
            <span className="flex items-center justify-center bg-[var(--secondary)] text-white w-5 h-5 rounded-full">
              <BsPlusLg />
            </span>
            <span className="text-lg leading-5 font-medium">
              {" "}
              {isLoading ? "Loading..." : "Load More"}
            </span>
            {isLoading && <Spin />}
          </button>
        </div>
        {/* 
        <div className="flex items-center justify-center mt-10">
          <button
            type="submit"
            className="flex items-center justify-center text-[16px] leading-[20px] btn-secondary mt-[10px] disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={() => setSlice((pre) => pre + 8)}
            disabled={isLoading}
          >
            Load More
            {isLoading && <Spin />}
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TopExpertList;
