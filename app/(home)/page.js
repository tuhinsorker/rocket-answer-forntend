"use client";

import CategoriesSlider from "@/components/carouselSliders/CategoriesSlider";
import AppDownload from "@/components/home/AppDownload";
import Banner from "@/components/home/Banner";
import HowItWork from "@/components/home/HowItWork";
import RocketAnswer from "@/components/home/RocketAnswer";
import Testimonial from "@/components/home/Testimonial";
import TopExpertList from "@/components/home/TopExpertList";
import { HomeContext } from "@/context/homeContext";
import Preloader from "@/ui/preloader/Preloader";
import { useContext } from "react";

export default function Home() {
  const { isLoading } = useContext(HomeContext);

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <Banner />
      <CategoriesSlider />
      <TopExpertList />
      <RocketAnswer />
      <Testimonial />
      <HowItWork />
      <AppDownload clss="my-[60px] md:my-[120px]" />
    </>
  );
}
