import ActionDropdown from "@/ui/dropdown/ActionDropdown";
import cardImgCheck from "@/utils/cardImgCheck";
import Image from "next/image";

const PaymentCard = ({ method, setAction }) => {
  const {
    billing_details,
    brand,
    livemode,
    is_default,
    last4,
    funding,
    exp_year,
    exp_month,
    pm_id,
  } = method;

  const { line1, line2, city, country, postal_code, state } = billing_details;

  return (
    <div className="flex flex-col justify-between w-[250px] md:w-[300px] h-[200px] rounded bg-white shadow-md border box-hover p-4">
      <div className="flex items-center justify-between">
        <div className="">
          <Image
            src={cardImgCheck(brand || "")}
            alt={brand || ""}
            height={20}
            width={30}
          />
        </div>

        <div className="action">
          {is_default !== 1 ? (
            <ActionDropdown pm_id={pm_id} setAction={setAction} />
          ) : (
            <span className="text-xs px-2 py-1 text-white bg-[var(--secondary)] rounded">
              Default
            </span>
          )}
        </div>
      </div>
      <div className="text-[var(--gray-1)]">
        <h2 className="text-2xl font-medium text-[var(--dark)] tracking-widest capitalize">
          {brand} .... {last4}
        </h2>
        <p className="text-base leading-5 mt-3">
          Expires {exp_month}/{exp_year}
        </p>
        <p className="text-base leading-5">
          {line1 ?? ""} {country ? `"," ${country}` : ""}
        </p>
      </div>
      <div className="text-[var(--gray-1)]">
        {/* <p className="text-base leading-5 uppercase">Last used 30/07/2023</p> */}
      </div>
    </div>
  );
};

export default PaymentCard;
