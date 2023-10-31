"use client";

import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import { successAlert } from "@/utils/alerts";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Swal from "sweetalert2";

const Subscriptions = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // get cookies
  const token = Cookies.get("token");

  const cancelSubscriptionHandler = (subscriptionId) => {
    // swal confirmation message
    Swal.fire({
      title: "Are you sure?",
      text: "You wont to unsubscribe this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#084277",
      cancelButtonColor: "#ff561e",
      confirmButtonText: "Yes, Unsubscribe it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios(
            `${process.env.NEXT_PUBLIC_URL}/customer/cancelSubscription?subscription_id=${subscriptionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (data.code == 200) {
            /**
             * Display a `successAlert` message.
             *
             * @param {string} title - The title of the success alert.
             * @param {string} text - The text to display in the success alert.
             */
            successAlert("Good job!", "Subscription Cancel successful!");

            //set Cancel Subscription
            setCancelSubscription(true);
          }
        }
      })
      .catch((error) => {
        console.error("There was an error with this api.", error.message);
      });
  };

  // get the package history
  const getMyPackageHistory = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_URL}/customer/myPackages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(data?.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getMyPackageHistory();
  }, [getMyPackageHistory, cancelSubscription]);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-auto sm:h-[200px]"} />;
  } else if (data.length === 0) {
    content = <h2>No Data found!</h2>;
  } else {
    content = (
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--primary)] text-white">
            <th className="table-cell text-start">Description</th>
            <th className="table-cell">Billing Date</th>
            <th className="table-cell">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {data.map((itm, i) => {
            const {
              category,
              recurring_invoice_date,
              id,
              subscription_id,
              status,
            } = itm;

            return (
              <tr
                key={id}
                className="bg-[var(--slate)] text-[var(--primary)] text-center"
              >
                <td className="table-cell font-semibold">
                  <div className="flex justify-between gap-4">
                    <span>{category.name}</span>
                    {status ? (
                      <span
                        className="flex items-center gap-2 cursor-pointer text-[var(--secondary)] underline"
                        onClick={() =>
                          cancelSubscriptionHandler(subscription_id)
                        }
                      >
                        Cancel <BsArrowRight />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-[var(--secondary)]">
                        Canceled
                      </span>
                    )}
                  </div>
                </td>
                <td className="table-cell font-semibold">
                  <span>Auto Renews</span>
                  <br />
                  <span>{recurring_invoice_date}</span>
                </td>
                <td className="table-cell font-semibold">
                  <span
                    className={`${
                      status ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"
                    } text-white px-2 py-[2px] rounded-sm`}
                  >
                    {status ? "Subscribed" : "Unsubscribed"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {/* Toast Container */}
      {/* <ToastContainer /> */}

      <div className="w-full h-auto md:min-h-[300px] bg-white px-2">
        {/* <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--primary)]">
        <h3 className="text-xl md:text-3xl font-medium">
          Subscription Summary
        </h3>
        <h6 className="text-base md:text-xl">Last 90 Days</h6>
      </div> */}

        {/* Balance Summary Table */}
        <div className="overflow-x-auto mt-3 md:mt-5">{content}</div>
      </div>
    </>
  );
};

export default Subscriptions;
