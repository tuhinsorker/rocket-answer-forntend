"use client";

import Banner from "@/components/categoryDetails/Banner";
import Experts from "@/components/categoryDetails/Experts";
import LatestBlogPost from "@/components/categoryDetails/LatestBlogPost";
import AppDownload from "@/components/home/AppDownload";
import Testimonial from "@/components/home/Testimonial";
import { HomeContext } from "@/context/homeContext";
import Preloader from "@/ui/preloader/Preloader";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function CategoryDetails() {
  const { isLoading: homeLoading } = useContext(HomeContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // get the search params
  const searchParams = useSearchParams();

  // get the category id
  const categoryId = searchParams.get("categoryId");

  // fetch the category exports data
  useEffect(() => {
    const fetchCategoryExpert = async () => {
      try {
        const { data } = await axios(
          `${process.env.NEXT_PUBLIC_BASE_URL}/categoriyWaisExpert?category_id=${categoryId}`
        );

        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryExpert();
  }, [categoryId]);

  return homeLoading ? (
    <Preloader />
  ) : (
    <>
      <Banner pageInfo={data?.page_info} error={error} isLoading={isLoading} />

      <Experts />

      <LatestBlogPost />

      <Testimonial />

      <AppDownload clss="py-[60px] md:py-[120px] bg-[var(--slate-3)]" />
    </>
  );
}
