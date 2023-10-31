import Link from "next/link";

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <ul className="flex items-center justify-center gap-1 mt-1">
      {breadcrumbs?.map(([itm, link], i, arr) => (
        <>
          <li key={i} className="text-lg leading-6 capitalize">
            {i !== arr.length - 1 ? <Link href={link}>{itm}</Link> : itm}
          </li>
          {i !== arr.length - 1 && <li>{`>`}</li>}
        </>
      ))}
    </ul>
  );
};

export default Breadcrumb;
