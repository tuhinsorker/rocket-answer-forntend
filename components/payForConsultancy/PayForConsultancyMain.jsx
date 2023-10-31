"use client";

import { useParams } from "next/navigation";
import PackageDetails from "../membership/PackageDetails";

const PayForConsultancyMain = () => {
  const { packageId } = useParams();

  return (
    <section className="my-[40px] md:m-[40px_0_60px] px-3 2xl:px-0">
      <div className="w-full sm:w-8/12 mx-auto bg-white shadow-md border pb-10 px-2 lg:px-20 min-h-auto sm:min-h-[782px]">
        <PackageDetails packageId={packageId} />
      </div>
    </section>
  );
};

export default PayForConsultancyMain;
