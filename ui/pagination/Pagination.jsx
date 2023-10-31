const Pagination = ({
  clss = "justify-center",
  totalPageNumber,
  setPageNumber,
}) => {
  return (
    <ul className={`pagination flex items-center gap-2 ${clss}`}>
      {[...Array(totalPageNumber)].map((_, i) => (
        <li key={i}>
          <button onClick={() => setPageNumber(i)}>{i + 1}</button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
