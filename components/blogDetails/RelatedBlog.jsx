import AllBlogs from "../blog/AllBlogs";

const RelatedBlog = () => {
  return (
    <section className="my-[60px] md:my-[120px] px-5 md:px-10 2xl:px-0">
      <div className="max-w-[1420px] mx-auto">
        <div className="text-2xl text-[var(--primary)] font-semibold">
          <h3>Related Blog Post</h3>
        </div>
        {/* All Blogs Here */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-5 mt-10 md:mt-[60px]">
          <AllBlogs slice={3} />
        </div>
      </div>
    </section>
  );
};

export default RelatedBlog;
