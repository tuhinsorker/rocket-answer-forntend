import AllBlogs from "../blog/AllBlogs";

const LatestBlogPost = ({
  clss = "bg-[var(--slate-3)] mt-[60px] md:mt-[120px] py-[60px] md:py-[120px]",
  width,
}) => {
  return (
    <section className={`${clss} px-3 2xl:px-0`}>
      <div className="max-w-[1420px] mx-auto">
        {/*  Latest Blog Post  */}
        <div className="w-full text-center">
          <h6 className="text-sm md:text-base text-[var(--secondary)]">
            Articles
          </h6>
          <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
            Latest Blog Post
          </h3>
        </div>

        <div className="mt-10 md:mt-[60px]">
          <div className="flex items-center justify-center flex-wrap gap-4 md:gap-5">
            {/* fetch blogs from 0 to 3 */}
            <AllBlogs slice={(0, 3)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPost;
