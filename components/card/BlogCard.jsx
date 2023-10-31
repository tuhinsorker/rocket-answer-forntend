import imgPath from "@/utils/imgPath";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const BlogCard = ({ data, width = "w-[355px] 2xl:w-[455px]" }) => {
  const { created_at, post_image, title, user } = data;
  // const { name, profile_photo_url } = user;

  // const timestamp = new Date(created_at);
  // get the post data
  // const date = timestamp.getDate().toString();

  // get the post month name
  // const monthName = timestamp.toLocaleString("default", { month: "short" });

  // show the post title length in characters
  const titleLength = 70;

  // calculate date format
  const date = new Date(created_at);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div
      className={`${width} bg-white p-[10px_10px_16px] md:p-[12px_12px_20px] border rounded-xl shadow-md box-hover`}
    >
      {/* card header */}
      <Link
        href={`/blog/${data.id}`}
        className="block rounded-md overflow-hidden"
      >
        <Image
          src={imgPath(post_image)}
          alt="blog_img"
          height={267}
          width={430}
          className="w-full sm:w-[430px] h-[167px] lg:h-[200px] 2xl:h-[267px] hover:scale-105 transition-all duration-500"
        />
      </Link>

      <div className="flex flex-col gap-1 mt-4">
        <h6 className="text-base font-medium text-[var(--dark)]">
          Featured -
          <span className="text-[var(--gray-1)] font-normal">
            {" "}
            {formattedDate}
          </span>
        </h6>
        <h3 className="min-h-[50px] text-lg leading-6 text-[var(--dark)] font-semibold">
          {title.substring(0, titleLength)}
          {title.length > titleLength ? "...." : ""}
        </h3>
        <Link
          href={`/blog/${data.id}`}
          className="flex items-center gap-2 text-base text-hover mt-2"
        >
          Continue Reading <BsArrowRight />
        </Link>
      </div>

      {/* card body */}
      {/* <div className="flex items-center gap-3 md:gap-4 mt-[10px] md:mt-5">
        <Image
          src={profile_photo_url}
          alt={name}
          height={40}
          width={40}
          className="w-12 h-12 rounded-full"
        />
        <h6 className="text-xl md:text-2xl font-medium text-[var(--dark)]">
          {name}
        </h6>
      </div> */}

      {/* card footer */}
      {/* <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3">
        <div className="flex flex-col items-center text-sm md:text-base leading-4 md:leading-5 font-medium bg-[var(--secondary)] text-white rounded-lg p-2">
          <span>
            {date.length === 1 && 0}
            {date}
          </span>
          <span>{monthName}</span>
        </div>
        <Link
          href={`/blog/${data.id}`}
          className="text-base leading-5 md:leading-6 text-[var(--dark)] text-hover"
        >
          {title.slice(0, 60)}
        </Link>
      </div> */}
    </div>
  );
};

export default BlogCard;
