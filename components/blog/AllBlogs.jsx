"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import BlogCard from "../card/BlogCard";

const AllBlogs = ({ slice }) => {
  const { data, isLoading, error, fetchData } = useApiCall();
  const searchParams = useSearchParams();

  // get category_id
  const categoryId = searchParams.get("category_id");

  // console.log("categoryId", categoryId ?? "");

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogPost?category_id=${
        categoryId ?? ""
      }`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-auto sm:h-[200px]"} />;
  } else if (data.length === 0) {
    content = <h2 className="text-4xl mb-14">No Data found!</h2>;
  } else {
    content = data.slice(0, slice ? slice : data.length).map((blog) => (
      // Single blog here
      <BlogCard key={blog.id} data={blog} />
    ));
  }
  return (
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
      <div className="max-w-[1420px] mx-auto">
        {/* All Blogs Here */}
        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-5">
          {/* {content} */}
          {content}
        </div>

        <div className="my-10">
          {/* Pagination Here */}
          {/* <Pagination totalPageNumber={5} /> */}
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;
