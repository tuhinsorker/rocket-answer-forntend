import BlogCategory from "./BlogCategory";
import BlogContents from "./BlogContents";

const BlogDetailsMain = () => {
  return (
    <section className="my-[60px] lg:my-[120px] px-5 md:px-10 2xl:px-0">
      <div className="max-w-[1420px] mx-auto flex flex-col md:flex-row justify-between gap-10 lg:gap-[70px]">
        {/* Blog Contents Here */}
        <BlogContents />

        {/* Blog Category  */}
        <BlogCategory />
      </div>
    </section>
  );
};

export default BlogDetailsMain;
