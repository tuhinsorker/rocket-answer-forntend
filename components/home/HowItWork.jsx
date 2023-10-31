"use client";

import { HomeContext } from "@/context/homeContext";
import imgPath from "@/utils/imgPath";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import ModalVideo from "react-modal-video";

const HowItWork = () => {
  const { data } = useContext(HomeContext);
  const [isOpen, setOpen] = useState(false);

  const {
    get_start_head_text,
    get_start_head_description,
    get_start_button_text,
    get_start_video_url,
    get_start_img,
    head_bg_img,
  } = data;

  const fistFiveItems = get_start_head_text.split(" ").slice(0, 5).join(" ");
  const itemsFromFifthToEnd = get_start_head_text.split(" ").slice(5).join(" ");

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="KMXknKQRpBo"
        onClose={() => setOpen(false)}
      />

      <section
        className="mt-[60px] md:mt-[120px] px-3 2xl:px-0 relative"
        style={{
          backgroundImage: `url("${imgPath(head_bg_img)}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-[var(--primary)] opacity-60"></div>
        {/* <div className="max-w-[1296px] mx-auto flex flex-col md:flex-row items-center 2xl:items-start justify-between gap-[30px] md:gap-5"> */}
        <div className="max-w-[1296px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[30px] md:gap-5 z-[1] py-10 md:py-[60px]">
          <div className="w-full md:w-1/2 text-start z-[1]">
            <h6 className="text-sm md:text-base text-white">
              Find and hire specialized talent.
            </h6>

            <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-white font-bold mt-[10px]">
              {/* {get_start_head_text} */}
              <span>{fistFiveItems} </span>
              <br />
              <span className="text-[var(--secondary)]">
                {itemsFromFifthToEnd}
              </span>
            </h3>

            <p className="text-base leading-5 w-auto lg:w-[58ch] text-white inline-block mt-3 md:mt-5">
              {get_start_head_description}
            </p>

            <div className="mt-[30px] md:mt-10">
              <Link
                href="/"
                className="inline-block text-base leading-5 btn-secondary"
              >
                {get_start_button_text}
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative rounded-[10px] overflow-hidden">
            <div className="h-[200px] sm:h-[300px] lg:h-[400px] w-full overflow-hidden">
              <Image src={imgPath(get_start_img)} alt="img" layout="fill" />
            </div>

            <div className="flex items-center justify-center w-[60px] h-[60px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--secondary)] opacity-90 -z-[1]"></span>
              <button
                type={"button"}
                className="flex items-center justify-center rounded-full bg-[var(--secondary)] p-3"
                onClick={() => setOpen(true)}
              >
                <BsFillPlayFill className="text-4xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWork;
