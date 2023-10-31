import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import TeamCard from "../card/TeamCard";

const OurTeam = ({ data, error, isLoading }) => {
  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // loading and empty data check
  if (isLoading && data === null) {
    content = <FallingLinesAnimation />;
  }

  // render final data
  if (data !== null) {
    const { title, description, members } = data.team;

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

        <div className="flex items-center justify-center flex-wrap gap-6 mt-[40px] md:mt-[60px]">
          {members.map((member, i) => (
            // Team Card Here
            <TeamCard key={i} data={member} />
          ))}
        </div>
      </>
    );
  }

  return (
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
      <div className="max-w-[1440px] mx-auto">{content}</div>
    </section>
  );
};

export default OurTeam;
