"use client";

import AboutUs from "@/components/about/AboutUs";
import Counter from "@/components/about/Counter";
import OurTeam from "@/components/about/OurTeam";
import LatestBlogPost from "@/components/categoryDetails/LatestBlogPost";
import BannerSection from "@/components/common/BannerSection";
import AppDownload from "@/components/home/AppDownload";
import RocketAnswer from "@/components/home/RocketAnswer";
import { HomeContext } from "@/context/homeContext";
import useApiCall from "@/hooks/useApiCall";
import Preloader from "@/ui/preloader/Preloader";
import { useContext, useEffect } from "react";

export default function About() {
  const { isLoading: homeLoading } = useContext(HomeContext);

  const { data, error, fetchData, isLoading } = useApiCall();

  useEffect(() => {
    fetchData(`${process.env.NEXT_PUBLIC_URL}/customer/about-us`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return homeLoading ? (
    <Preloader />
  ) : (
    <>
      <BannerSection title="About Us" />

      <AboutUs data={data} error={error} isLoading={isLoading} />

      <Counter data={data} error={error} isLoading={isLoading} />

      <OurTeam data={data} error={error} isLoading={isLoading} />

      <RocketAnswer />

      <LatestBlogPost clss="bg-[var(--slate-3)] py-[60px] md:py-[120px]" />

      <AppDownload clss="my-[60px] md:my-[120px]" />
    </>
  );
}
