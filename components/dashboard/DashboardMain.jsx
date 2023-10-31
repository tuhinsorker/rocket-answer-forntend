"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AreaChart from "../charts/AreaChart";
import SideBar from "../sideBar/SideBar";
import UserDetails from "./UserDetails";

const DashboardMain = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.back();
    }
  }, [router]);

  return (
    <section className="my-5 md:my-10 px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-4">
        {/* Side Bar Here */}
        <SideBar />

        <div className="w-full sm:w-8/12 lg:w-9/12 pb-5 sm:pb-10 bg-white shadow-md">
          {/* User Details */}
          <UserDetails />

          {/* Area chart here */}
          <AreaChart />
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;
