"use client";

import { useParams } from "next/navigation";
import SideBar from "../sideBar/SideBar";
import PackageDetails from "./PackageDetails";

const MembershipPurchaseMain = () => {
  const { id: packageId } = useParams();

  return (
    <section className="my-5 md:my-10 px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-4">
        {/* Side Bar Here */}
        <SideBar />

        {/* Package Details */}
        <div className="w-full sm:w-8/12 lg:w-9/12 bg-white shadow-md border pb-10 px-2 lg:px-20">
          <PackageDetails packageId={packageId} />
        </div>
      </div>
    </section>
  );
};

export default MembershipPurchaseMain;
