"use client";

import { ThreeDots } from "react-loader-spinner";

const Preloader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center absolute top-0 left-0 z-50 bg-[var(--slate-4)]">
      <ThreeDots
        height="100"
        width="100"
        // height="80"
        // width="80"
        radius="9"
        color="#084277"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Preloader;
