import AllBlogs from "@/components/blog/AllBlogs";
import BannerSection from "@/components/common/BannerSection";

export default function Blog() {
  return (
    <>
      <BannerSection title="Blog Post" text="Read our blog from top talents" />

      <AllBlogs />
    </>
  );
}
