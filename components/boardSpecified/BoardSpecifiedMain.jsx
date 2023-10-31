import ChatBox from "../board/ChatBox";
import ExportSlider from "../carouselSliders/ExportSlider";
import LatestBlogPost from "../categoryDetails/LatestBlogPost";
import RocketAnswer from "../home/RocketAnswer";
import SideBar from "../sideBar/SideBar";

// slider settings
const sliderSettings = {
  infinite: true,
  speed: 900,
  slidesToShow: 3,
  slidesToScroll: 2,
  dots: true,
  arrows: false,
  centerPadding: "0px",
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const BoardSpecifiedMain = () => {
  return (
    <section className="my-5 md:my-10 px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-4">
        {/* Side Bar Here */}
        <SideBar />

        <div className="w-full sm:w-8/12 lg:w-9/12 py-10 bg-white shadow-md">
          {/* Chat Box Here */}
          <ChatBox />

          {/* Experts Section Here */}
          <div className="mt-[60px] overflow-x-hidden px-4">
            {/*  Best Lawyer content  */}
            <div className="w-full text-center">
              <h6 className="text-sm md:text-base text-[var(--secondary)]">
                Best Lawyer
              </h6>
              <h3 className="text-2xl md:text-4xl leading-7 md:leading-[42px] text-[var(--primary)] font-bold mt-[10px]">
                Our Expert Lawyer
              </h3>
            </div>

            <div className="export-slider mt-3 md:mt-5">
              {/* Export Slider Here */}
              <ExportSlider settings={sliderSettings} />
            </div>
          </div>

          {/* Rocket Answer Section Here */}
          <RocketAnswer
            width="w-[300px]"
            clss="mt-[60px] md:mt-[80px] bg-[var(--slate-4)] py-10"
          />

          {/* Latest Blog Section here */}
          <LatestBlogPost width="w-[300px]" clss="mt-[60px] md:mt-[80px]" />
        </div>
      </div>
    </section>
  );
};

export default BoardSpecifiedMain;
