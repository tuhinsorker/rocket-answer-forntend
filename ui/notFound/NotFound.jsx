const NotFound = ({ clss = "text-[var(--gray)] " }) => {
  return (
    <div
      className={`w-[300px] text-center ${clss} px-10 py-2 mx-auto my-10 rounded`}
    >
      <h2 className="text-2xl font-semibold">No, Data Found!😒</h2>
    </div>
  );
};

export default NotFound;
