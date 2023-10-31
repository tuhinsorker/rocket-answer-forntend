import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Image from "next/image";
import about1 from "/public/images/about1.png";
import about2 from "/public/images/about2.png";

const AboutUs = ({ data, error, isLoading }) => {
  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // loading and empty data check
  if (isLoading === true && data === null) {
    content = <FallingLinesAnimation />;
  }

  // render final data
  if (data !== null) {
    const { features, body_description, body_title, description, title } = data;

    content = (
      <>
        <div className="text-center">
          <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] text-[var(--primary)] font-bold">
            {title}
          </h3>
          <p className="text-base leading-5 w-auto sm:w-[68ch] text-[var(--gray)] inline-block mt-3 md:mt-5">
            {description}
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-[30px] mt-[40px] md:mt-[60px]">
          <div className="w-full md:w-6/12 xl:w-7/12">
            <div className="w-[234px] sm:w-[334px] xl:w-[534px] mx-auto rounded-full relative">
              <Image src={about1} alt="about1" />

              <div className="w-[100px] xl:w-[200px] h-[100px] xl:h-[200px] rounded-full border-4 border-white absolute top-2/3 -right-10 xl:-right-20 -translate-y-2/3">
                <Image src={about2} alt="about2" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-6/12 xl:w-5/12">
            <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] text-[var(--primary)] font-bold">
              {/* Total Solutions for Your <br /> Business Here */}
              {body_title}
            </h3>
            <p className="text-base leading-5 w-auto lg:w-[58ch] text-[var(--primary)] inline-block mt-5 md:mt-7">
              {body_description}
            </p>

            <ul className="flex flex-col gap-2 mt-[30px] md:mt-[50px]">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[var(--primary)]"
                >
                  <span className="w-3 h-3 rounded-full border border-[var(--primary)] block"></span>
                  <span className="block -mt-[2px]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* <Link
              href="/"
              className="inline-flex items-center text-[16px] leading-[20px] btn-secondary mt-[30px] md:mt-[40px]"
            >
              View Service
            </Link> */}
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto">{content}</div>
    </section>
  );
};

export default AboutUs;
