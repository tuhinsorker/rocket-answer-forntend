import LatestTransactionTable from "../latestTransactionTable/LatestTransactionTable";

const LatestTransaction = () => {
  return (
    <div className="flex-none sm:flex-1 w-full bg-white shadow-md box-hover rounded-md">
      <h3 className="text-xl text-[var(--primary)] py-2.5 md:py-5 px-5">
        Latest Transaction
      </h3>
      <div className="overflow-x-auto px-5">
        {/* latest Transaction Table */}
        <LatestTransactionTable limit={3} />
      </div>
    </div>
  );
};

export default LatestTransaction;
