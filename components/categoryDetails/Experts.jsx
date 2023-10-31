"use client";

import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryExpertCard from "../card/CategoryExpertCard";

const Experts = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [slice, setSlice] = useState(8);

  // get the category name
  const { categoryName } = useParams();

  // get the search params
  const searchParams = useSearchParams();

  // get the category id
  const categoryId = searchParams.get("categoryId");

  // fetch the category exports data
  useEffect(() => {
    const fetchCategoryExpert = async () => {
      try {
        const { data } = await axios(
          `${process.env.NEXT_PUBLIC_BASE_URL}/categoriyWaisExpert?category_id=${categoryId}`
        );

        setData(data?.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryExpert();
  }, [categoryId]);

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
    content = data
      .slice(0, slice)
      .map((itm) => (
        <CategoryExpertCard
          key={itm.id}
          data={itm}
          categoryName={categoryName}
        />
      ));
  }

  return (
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
      <div className="max-w-[1420px] mx-auto">
        {/*  Best Lawyer content  */}
        <div className="w-full text-center">
          <h6 className="text-sm md:text-base text-[var(--secondary)] capitalize">
            Best {categoryName.split("_").join(" ")}
          </h6>
          <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px] capitalize">
            Our Expert {categoryName.split("_").join(" ")}
          </h3>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-5 mt-10 md:mt-[60px]">
          {/* Export Slider Here */}
          {content}
        </div>

        <div className="flex items-center justify-center mt-[30px] md:mt-10">
          <button
            type="submit"
            className="flex items-center justify-center text-[16px] leading-[20px] btn-secondary disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={() => setSlice((pre) => pre + 8)}
            disabled={slice >= data?.length}
          >
            Load More
            {/* {isSuccess && <Spin />} */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experts;
