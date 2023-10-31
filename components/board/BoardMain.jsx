"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SideBar from "../sideBar/SideBar";
import ChatBox from "./ChatBox";

const BoardMain = () => {
  const router = useRouter();

  // get the search params
  const searchParams = useSearchParams();
  const activityId = searchParams.get("activity_id");
  const categoryName = searchParams.get("category_name");

  useEffect(() => {
    if (!activityId && !categoryName) {
      router.push("/dashboard/consultant-history");
    }
  }, [activityId, categoryName, router]);

  return (
    <section className="my-5 md:my-10 px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-4">
        {/* Side Bar Here */}
        <SideBar />

        {/* pb-5 sm:pb-10 */}
        <div className="w-full sm:w-8/12 lg:w-9/12  bg-white shadow-md">
          {/* Chat Box Here */}
          <ChatBox />

          {/* <div className="mt-10 md:mt-[80px]">
            <div className="w-full text-center">
              <h6 className="text-sm md:text-base text-[var(--secondary)]">
                Pricing
              </h6>
              <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
                Choose Pricing Plan
              </h3>
            </div>
            <AllPackages />
          </div> */}

          {/* Rocket Answer Section Here */}
          {/* <RocketAnswer width="w-[300px]" clss="mt-[60px] md:mt-[80px]" /> */}
        </div>
      </div>
    </section>
  );
};

export default BoardMain;
