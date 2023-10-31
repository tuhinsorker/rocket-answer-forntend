import Link from "next/link";
import { BsCheck2 } from "react-icons/bs";

const PricingCard = ({ data, index, pathname }) => {
  const { id, title, price, offer_price, service_number, duration } = data;

  return (
    <div
      className={`w-[315px] ${
        index % 2 !== 0 ? "bg-[var(--primary)]" : "bg-[var(--slate-4)]"
      }`}
    >
      <div
        className={`text-center ${
          index % 2 !== 0 ? "text-white" : "text-[var(--primary)]"
        } py-10`}
      >
        <p className="text-lg leading-6">{title}</p>
        <h2 className="text-4xl font-medium my-1">
          {offer_price ? (
            <>
              ${offer_price}{" "}
              <span className="line-through text-lg">${price}</span>
            </>
          ) : (
            `$${price}`
          )}
        </h2>
        <p className="text-lg leading-6">Per Month</p>
      </div>
      <hr />
      <div className="p-[30px]">
        <ul
          className={`grid gap-3 ${
            index % 2 !== 0 ? "text-white" : "text-[var(--primary)]"
          }`}
        >
          <li className="flex items-center gap-3">
            <span className="text-[var(--secondary)]">
              <BsCheck2 />
            </span>
            <span>{duration} days continue this package</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-[var(--secondary)]">
              <BsCheck2 />
            </span>
            <span>{service_number} service will get from this package</span>
          </li>
        </ul>

        <div className="flex justify-center mt-10">
          <Link
            // href={`${pathname}/${id}`}
            href={
              pathname.split("/")[1] === "membership"
                ? `/membership/${id}`
                : `/pay-for-consultancy/${id}`
            }
            className="text-[16px] leading-[20px] btn-secondary mt-[10px]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
