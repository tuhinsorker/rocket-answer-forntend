"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import imgPath from "@/utils/imgPath";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const BlogContents = () => {
  const { blogId } = useParams();
  const { data, isLoading, error, fetchData } = useApiCall();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogPostDetails?id=${blogId}`,
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
  } else if (data === null) {
    content = <h2>No data found</h2>;
  } else {
    const { content: postContent, post_image, title, user, created_at } = data;
    const { name, profile_photo_url } = user;

    const timestamp = new Date(created_at);

    // get the post data
    const date = timestamp.getDate().toString();

    // get the post month name
    const monthName = timestamp.toLocaleString("default", { month: "short" });

    content = (
      <div className="w-full md:w-2/3">
        <h4 className="text-lg sm:text-4xl font-medium text-[var(--dark)] mb-5">
          {title}
        </h4>

        <Image
          src={imgPath(post_image)}
          blurDataURL={imgPath(post_image)}
          height={614}
          width={900}
          alt="blog_post_img"
          placeholder="blur"
        />

        <div className="flex items-center justify-between mt-3 lg:mt-5 mb-[30px] lg:mb-10">
          <div className="flex items-center gap-3">
            <Image
              src={profile_photo_url}
              alt={name}
              height={40}
              width={40}
              className="w-12 h-12 rounded-full"
            />

            <h6 className="text-sm leading-[24px] font-medium text-[var(--dark)]">
              {name}
            </h6>
          </div>

          <div className="flex flex-col items-center text-sm leading-4  font-medium bg-[var(--secondary)] text-white rounded-lg p-2">
            <span>
              {date.length === 1 && 0}
              {date}
            </span>
            <span>{monthName}</span>
          </div>
        </div>

        <div
          className="text-base text-[var(--gray)]"
          dangerouslySetInnerHTML={{ __html: postContent }}
        />
      </div>
    );
  }

  return <>{content}</>;
};

export default BlogContents;
