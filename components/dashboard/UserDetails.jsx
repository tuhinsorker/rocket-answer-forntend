const UserDetails = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between w-full gap-2 md:gap-5 mb-10 px-2 sm:px-3">
      <div className="w-full sm:w-1/3 bg-[var(--primary)] rounded-md text-white px-3 md:px-5 py-3">
        <h3 className="text-lg lg:text-xl leading-5">Total Consultation</h3>
        <h2 className="text-2xl lg:text-4xl">20</h2>
      </div>
      <div className="w-full sm:w-1/3 bg-[var(--secondary)] rounded-md text-white px-3 md:px-5 py-3">
        <h3 className="text-lg lg:text-xl leading-5">Package Bought</h3>
        <h2 className="text-2xl lg:text-4xl">20</h2>
      </div>
      <div className="w-full sm:w-1/3 bg-[var(--primary)] rounded-md text-white px-3 md:px-5 py-3">
        <h3 className="text-lg lg:text-xl leading-5">Active Plan</h3>
        <h2 className="text-sm lg:text-base">Plan Name ($20)</h2>
      </div>
    </div>
  );
};

export default UserDetails;
