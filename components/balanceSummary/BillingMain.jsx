import BillingTab from "./BillingTab";

const BillingMain = () => {
  return (
    <section className="my-5 md:my-10">
      <div className="max-w-[1296px] mx-2 xl:mx-auto">
        <div className="text-3xl font-semibold text-[var(--dark)]">
          <h2>Manage your billing</h2>
        </div>
        <BillingTab />
      </div>
    </section>
  );
};

export default BillingMain;
