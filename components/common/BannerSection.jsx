const BannerSection = ({ title, text = "" }) => {
  return (
    // <section className="home-banner pt-[65px] md:pt-[150px] pb-[60px] md:pb-[75px] relative">
    <section className="home-banner py-[20px] sm:py-[65px] relative">
      <div className="bg-[var(--primary)] w-full h-full absolute top-0 left-0 -z-[1]"></div>

      <div className="text-center text-white">
        <h2 className="text-2xl sm:text-4xl lg:text-[42px] leading-[43px] lg:leading-[56px] font-semibold">
          {title}
        </h2>
        <p>{text}</p>
      </div>
    </section>
  );
};

export default BannerSection;
