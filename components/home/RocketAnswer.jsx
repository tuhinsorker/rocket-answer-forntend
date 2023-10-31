import { HomeContext } from "@/context/homeContext";
import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import imgPath from "@/utils/imgPath";
import Image from "next/image";
import { useContext, useEffect } from "react";

const RocketAnswer = ({
  width = "w-[400px]",
  clss = "mt-[60px] md:mt-[120px]",
}) => {
  const { data } = useContext(HomeContext);
  const { data: howItWorkData, error, fetchData, isLoading } = useApiCall();

  const { to_word_head_description, to_work_head_text } = data || {};

  useEffect(() => {
    fetchData(`${process.env.NEXT_PUBLIC_URL}/customer/howitwork`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // loading and empty data check
  if (isLoading === true && howItWorkData === null) {
    content = <FallingLinesAnimation />;
  }

  // render final data
  if (howItWorkData !== null) {
    content = howItWorkData.map((item, i) => {
      const { image, btn_text, name, header, description } = item;
      const steps = name.split(" ");
      return (
        <div
          key={i}
          className={`${width} flex flex-col items-center gap-2 sm:gap-[15px] text-center`}
          // className={`${width} relative overflow-hidden bg-white rounded-2xl p-[50px_20px_20px] lg:p-[70px_40px_40px] shadow-md border box-hover`}
        >
          {/* <div
            className={`w-[120px] h-[120px] rounded-full text-white ${
              i === 0 ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"
            } absolute -top-8 -left-8`}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-base font-medium mt-3 ms-2">
              {steps.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
          </div> */}
          {/* <div className=""> */}
          <div className="w-[70px] sm:w-[94px] h-[70px] sm:h-[94px] rounded-full flex items-center justify-center bg-[var(--secondary)] to-white">
            <Image src={imgPath(image)} alt="law" width={40} height={40} />
          </div>

          <h3 className="text-2xl font-semibold text-white">{header}</h3>
          <p className="text-base leading-5 left-5 text-white">{description}</p>

          {/* </div> */}
        </div>
      );
    });
  }

  return (
    <section
      className={`${clss} px-3 2xl:px-0 bg-[var(--primary)] py-10 md:py-[60px]`}
    >
      <div className="max-w-[1296px] mx-auto">
        <div className="text-center text-white">
          <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] font-bold">
            {/* Join The Rocket Answer <br /> How it work */}
            {to_work_head_text}
          </h3>
          <p className="text-base leading-5 w-auto lg:w-[58ch] inline-block mt-3 md:mt-5">
            {/* Advanced cameras combined with a large display, fast performance,
            and highly calibrated sensors have always made uniquely capable. */}
            {to_word_head_description}
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-[30px] sm:gap-10 mt-6 sm:mt-10 lg:mt-[60px]">
          {content}
        </div>
      </div>
    </section>
  );
};

export default RocketAnswer;
