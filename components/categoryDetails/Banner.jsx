import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import imgPath from "@/utils/imgPath";
import ChatBox from "./ChatBox";

const Banner = ({ pageInfo, error, isLoading }) => {
  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // loading and empty data check
  if (isLoading === true && !pageInfo) {
    content = <FallingLinesAnimation />;
  }

  // render final data
  if (pageInfo) {
    content = (
      <section
        className="pt-[65px] md:pt-[80px] pb-[60px] md:pb-[75px] relative"
        style={{
          backgroundImage: `url("${imgPath(pageInfo.post_image)}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-[var(--primary)] w-full h-full absolute top-0 left-0 opacity-60"></div>
        <div className="max-w-[1296px] m-auto flex flex-col md:flex-row items-center gap-0 sm:gap-5 px-3 2xl:px-0 relative z-[1]">
          <div className="w-full md:w-5/12 lg:w-7/12">
            <div className="w-full lg:w-[500px] text-white">
              <h1 className="text-4xl lg:text-[56px] leading-[43px] lg:leading-[71px] font-bold">
                {/* Connect with <br /> Expertise Lawyer */}
                {pageInfo.title}
              </h1>

              <div
                className="text-base lg:text-lg leading-6 lg:leading-7 mt-4 lg:mt-7"
                dangerouslySetInnerHTML={{
                  __html: pageInfo.content.split(" ").slice(0, 30).join(" "),
                }}
              />
              {/* <p className="text-base lg:text-lg leading-6 lg:leading-7 mt-4 lg:mt-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor dolore magna aliqua. Quis ipsum suspendisse
                ultrices gravida.
              </p> */}

              {/* <div className="h-[400px] border">
                <div className="">

                </div>
              </div> */}
            </div>
          </div>

          {/* chat box here */}
          <ChatBox />
        </div>
      </section>
    );
  }

  return (
    // home-banner
    <>{content}</>
  );
};

export default Banner;
