"use client";

import { Tab } from "@headlessui/react";
import { useState } from "react";
import BalanceSummary from "./BalanceSummar";
import PaymentMethods from "./PaymentMethods";
import Subscriptions from "./Subscriptions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BillingTab = () => {
  let [categories] = useState({
    Subscription: <Subscriptions />,
    "Order History": <BalanceSummary />,
    "Payment Methods": <PaymentMethods />,
  });

  return (
    <div className="shadow-md bg-white mt-3 md:mt-5">
      <Tab.Group>
        <Tab.List className="flex bg-[var(--primary)]">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2 lg:py-4 font-semibold text-white",
                  "ring-white ring-opacity-60",
                  selected
                    ? "!text-white bg-[var(--secondary)] focus:outline-0"
                    : "hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-5 md:mt-10">
          {Object.values(categories).map((itm, idx) => (
            <Tab.Panel key={idx} className={classNames("bg-white")}>
              {itm}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default BillingTab;
