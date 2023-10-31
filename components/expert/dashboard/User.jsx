import LatestTransaction from "./LatestTransaction";
import TopUsers from "./TopUsers";

const User = () => {
  return (
    <section className="py-5 lg:py-10 px-3 2xl:px-0 bg-[var(--slate)]">
      <div className="max-w-[1296px] m-auto flex flex-wrap gap-5 lg:gap-10">
        <TopUsers />

        {/* <WithdrawForm /> */}
        <LatestTransaction />
      </div>
    </section>
  );
};

export default User;
