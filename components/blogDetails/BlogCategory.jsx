"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Link from "next/link";
import { useEffect } from "react";

const BlogCategory = () => {
  const { data, error, fetchData, isLoading } = useApiCall();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogCategory`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true) {
    // loading and empty data check
    content = <FallingLinesAnimation />;
  } else if (data === null || data.length <= 0) {
    content = <h2>No data found</h2>;
  } else {
    content = data.map((itm) => {
      const { id, category_name, posts_count } = itm;
      return (
        <li key={id} className="border-b pb-3">
          <Link
            href={`/blog?category_id=${id}`}
            className="flex items-center justify-between text-base leading-5 text-[var(--primary)] hover:text-[var(--secondary)] transition-all duration-500"
          >
            <span>{category_name}</span>
            <span>{posts_count}</span>
          </Link>
        </li>
      );
    });
  }

  return (
    <div className="w-full md:w-1/3">
      {/* <div className="search">
        <input className="form-item" type={"text"} placeholder="Search" />
      </div> */}
      {/* <div className="mt-[40px] lg:mt-[60px]"> */}
      <div className="mt-[40px] lg:mt-0">
        <h3 className="text-2xl leading-8 font-medium text-[var(--primary)]">
          Categories
        </h3>
        <ul className="flex flex-col gap-3 mt-5 lg:mt-[30px]">{content}</ul>
      </div>
    </div>
  );
};

export default BlogCategory;
