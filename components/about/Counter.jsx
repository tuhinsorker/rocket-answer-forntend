import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";

const Counter = ({ data, error, isLoading }) => {
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
    const { total_users, categories, total_customer, total_experts } = data;

    content = (
      <div className="max-w-[1296px] mx-auto flex flex-wrap items-center justify-around gap-5 py-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-[48px] leading-9 md:leading-[56px] font-bold text-white">
            {total_experts}+
          </h2>
          <span className="text-sm md:leading-4 md:text-base text-white">
            Experts
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-3xl md:text-[48px] leading-9 md:leading-[56px] font-bold text-white">
            {total_users}+
          </h2>
          <span className="text-sm md:leading-4 md:text-base text-white">
            Happy Clients
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-3xl md:text-[48px] leading-9 md:leading-[56px] font-bold text-white">
            {categories}+
          </h2>
          <span className="text-sm md:leading-4 md:text-base text-white">
            Categories
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-3xl md:text-[48px] leading-9 md:leading-[56px] font-bold text-white">
            {total_customer}+
          </h2>
          <span className="text-sm md:leading-4 md:text-base text-white">
            Total Users
          </span>
        </div>
      </div>
    );
  }
  return (
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0 bg-[var(--primary)]">
      {content}
    </section>
  );
};

export default Counter;
