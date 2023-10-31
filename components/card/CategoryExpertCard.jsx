import Rating from "@/ui/rating/Rating";
import Image from "next/image";
import Link from "next/link";
import batch from "/public/images/batch.png";

const CategoryExpertCard = ({ data, categoryName }) => {
  const { address, full_name, profile_img, rank_no } = data;

  return (
    // <div className="py-5 md:py-10 !w-[320px]">
    <div className="!w-[320px] grid justify-items-center py-[30px] md:py-[45px] px-[25px] border shadow-md rounded-md box-hover relative">
      {/* batch img */}
      <div className="absolute top-0 right-2">
        <Image src={batch} alt="batch" className="w-full h-full" />
      </div>

      <div className="h-20 w-20 rounded-full overflow-hidden border">
        {/* Expert  img here */}
        <Image
          src={profile_img}
          alt="avt"
          className=""
          height={80}
          width={80}
        />
      </div>

      {/* Expert  details */}
      <div className="text-center mt-4 md:mt-6">
        <Link
          href="/"
          className="block text-lg lg:text-xl text-[var(--gray)] font-medium"
        >
          {full_name}
        </Link>
        <span className="text-sm lg:text-lg leading-5 lg:leading-6 text-[var(--gray)] mt-1 capitalize">
          {categoryName.split("_").join(" ")}
        </span>
      </div>

      {/* rating */}
      <div className="flex items-center gap-[2px] md:gap-1 mt-2">
        {/* Rating  */}
        <Rating
          numberOfReview={rank_no * 1}
          className="text-xs lg:text-lg leading-4 lg:leading-6 text-[var(--secondary)]"
        />
      </div>

      {/* total Customers */}
      <p className="text-sm lg:text-base text-[var(--gray)] text-center mt-2">
        {address || "505 Satisfied Customers"}
      </p>
    </div>
    // </div>
  );
};

export default CategoryExpertCard;
