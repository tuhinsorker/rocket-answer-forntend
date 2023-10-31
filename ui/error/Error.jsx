const Error = ({ message }) => {
  return (
    <div className="bg-red-200 text-red-600 w-full sm:min-w-[500px] text-center p-2 rounded mx-3">
      <h2 className="text-2xl font-semibold">There is an Error occurred!😒</h2>
      <p className="text-base underline">{message}</p>
    </div>
  );
};

export default Error;
