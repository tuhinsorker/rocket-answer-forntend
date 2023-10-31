import LatestTransactionTable from "../latestTransactionTable/LatestTransactionTable";

const BalanceSummaryMain = () => {
  return (
    <section className="pb-[60px] md:pb-[120px] pt-5 md:pt-0 px-3 2xl:px-0 bg-[var(--slate)]">
      <div className="max-w-[1296px] m-auto bg-white shadow-md box-hover rounded-md">
        <h3 className="text-xl text-[var(--primary)] py-2.5 md:py-5 px-5">
          Latest Transaction
        </h3>
        <div className="overflow-x-auto px-5">
          <LatestTransactionTable limit={10} />
        </div>
      </div>
    </section>
  );
};

export default BalanceSummaryMain;
