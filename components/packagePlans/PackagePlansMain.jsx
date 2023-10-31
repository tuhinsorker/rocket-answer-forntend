"use client";

import AllPackages from "../common/AllPackages";

const PackagePlansMain = () => {
  return (
    <section className="my-[40px] md:m-[40px_0_60px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto min-h-auto sm:min-h-[520px]">
        {/* pricing plan section here */}
        <div className="w-full text-center mt-10 md:mt-[60px]">
          <h6 className="text-sm md:text-base text-[var(--secondary)]">
            Package Pricing
          </h6>
          <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
            Choose you package plan
          </h3>
        </div>

        {/* All Packages  */}
        <AllPackages />
      </div>
    </section>
  );
};

export default PackagePlansMain;
