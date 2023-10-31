import { HomeContext } from "@/context/homeContext";
import imgPath from "@/utils/imgPath";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import app_store from "/public/images/logos/app_store.png";
import play_store from "/public/images/logos/play_store.png";

const AppDownload = ({ clss = "" }) => {
  const { data } = useContext(HomeContext);

  // check media queries
  // is medium device
  const isMediumDevice = useMediaQuery({
    query: "(max-width: 1279px)",
  });

  const {
    app_store_button_link,
    gpstore_button_link,
    app_head_description,
    app_head_text,
    app_img,
  } = data || {};

  return (
    <section className={`mt-[60px] md:mt-[120px] ${clss} mx-3 xl:mx-0`}>
      <div className="max-w-[1296px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[30px] md:gap-5 p-[40px_0_0] md:p-[24px_0]">
        {/* App Download Lef side img */}
        <div className="w-full md:w-1/2">
          <div className="w-[300px] lg:w-[400px] xl:w-[590px] h-[300px] lg:h-[400px] xl:h-[590px] mx-auto md:mx-0 rounded-full bg-[var(--slate-3)] relative">
            <Image
              src={imgPath(app_img) || ""}
              alt="phone"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-95 translate-all duration-500"
              height={isMediumDevice ? 260 : 460}
              width={isMediumDevice ? 230 : 390}
            />
          </div>
        </div>

        {/* app Download content  */}
        <div className="w-full md:w-1/2 text-start mt-[40px] md:mt-0">
          <h6 className="text-sm md:text-base text-[var(--secondary)]">
            Download Our App
          </h6>

          <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
            {/* Any Service <br /> Any Time ,Any Where */}
            {app_head_text}
          </h3>

          <p className="text-base leading-5 w-auto xl:w-[58ch] text-[var(--gray)] inline-block mt-3 md:mt-5">
            {app_head_description}
          </p>

          {/* Download Links  */}
          <div className="flex items-center gap-6 mt-[30px] md:mt-10">
            {/* play store Link here */}
            <Link
              href={gpstore_button_link || "/"}
              className="hover:shadow-xl hover:translate-y-1 transition-all duration-500"
            >
              <Image src={play_store} alt="play_store" />
            </Link>

            {/*app store Link here */}
            <Link
              href={app_store_button_link || "/"}
              className="hover:shadow-xl hover:translate-y-1 transition-all duration-500"
            >
              <Image src={app_store} alt="app_store" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
