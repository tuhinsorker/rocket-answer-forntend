import Rating from "@/ui/rating/Rating";
import Image from "next/image";

const ExpertCard = ({ data }) => {
  const {
    profile_img,
    full_name,
    rank_no,
    category,
    sub_category,
    rating_count,
  } = data;

  return (
    <div className="w-full sm:w-[360px] lg:w-[370px] 2xl:w-[370px] h-[100px] sm:h-[120px] flex items-center gap-[10px] border border-[#ECEDF2] rounded-md bg-white hover:bg-[var(--light-yellow)] transition-all duration-500 p-2 lg:p-[15px]">
      <div className="w-[80px] sm:w-[90px] h-[80px] sm:h-[90px] overflow-hidden border">
        <Image
          src={profile_img}
          alt="avt_img"
          className="w-full h-full"
          height={90}
          width={90}
        />
      </div>

      <div className="grid gap-[5px] sm:gap-[10px]">
        <h2 className="text-lg leading-[22px] text-[var(--dark)] font-medium capitalize">
          {full_name}
        </h2>
        <span className="text-sm leading-5 text-[var(--gray)] font-medium capitalize">
          {category.name}
        </span>
        <div className="flex items-center gap-[2px] md:gap-1">
          <Rating
            numberOfReview={rank_no ?? 0}
            className="text-xs text-[var(--secondary)]"
          />
        </div>
      </div>
    </div>
    // <Link
    //   href="/"
    //   className="w-full sm:w-[360px] lg:w-[480px] 2xl:w-[638px] flex items-center justify-between bg-[var(--slate-3)] hover:bg-[var(--light-yellow)] transition-all duration-500 rounded-xl px-3 lg:px-[30px] py-2 lg:py-5"
    // >
    //   <div className="flex items-center gap-3">
    //     <div className="w-[60px] lg:w-[100px] h-[50px] lg:h-[90px] rounded-2xl overflow-hidden">
    //       <Image
    //         src={profile_img}
    //         alt="avt_img"
    //         className="w-full"
    //         height={90}
    //         width={100}
    //       />
    //     </div>

    //     <div className="grid">
    //       <h2 className="text-lg leading-[22px] text-[var(--dark)] font-medium mb-0 lg:mb-1 capitalize">
    //         {full_name}
    //       </h2>
    //       <span className="text-sm leading-5 lg:leading-6 text-[var(--gray)] capitalize">
    //         {category.name}
    //       </span>
    //       <span className="text-sm leading-5 lg:leading-6 text-[var(--gray)]">
    //         {sub_category ? sub_category.name : ""}
    //       </span>
    //     </div>
    //   </div>

    //   <div className="grid gap-1 justify-items-center">
    //     <span className="text-[var(--gray)]">Rating</span>
    //     {/*Number of Rating */}
    //     <div className="flex items-center gap-[2px] md:gap-1">
    //       <Rating
    //         numberOfReview={rank_no ?? 0}
    //         className="text-xs lg:text-xl text-[var(--secondary)]"
    //       />
    //     </div>
    //     <span className="text-[var(--gray)]">
    //       {rating_count * 1 > 0 ? rating_count : ""}
    //     </span>
    //   </div>
    // </Link>
  );
};

export default ExpertCard;
