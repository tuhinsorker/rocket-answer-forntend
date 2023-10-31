import BlogDetailsMain from "@/components/blogDetails/BlogDetailsMain";
import RelatedBlog from "@/components/blogDetails/RelatedBlog";
import BannerSection from "@/components/common/BannerSection";

export default function BlogDetails() {
  return (
    <>
      <BannerSection title="Blog Details" />

      <BlogDetailsMain />

      <RelatedBlog />
    </>
  );
}
