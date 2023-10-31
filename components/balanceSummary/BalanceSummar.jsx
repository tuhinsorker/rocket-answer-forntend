"use client";

import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import imgPath from "@/utils/imgPath";
import axios from "axios";
import { saveAs } from "file-saver";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";

const BalanceSummary = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // get cookies
  const token = Cookies.get("token");

  /**
   * Saves a file by downloading it to the user's device.
   *
   * @param {File} file - The file to be saved.
   */
  const saveFile = (file) => {
    const filePath = imgPath(file);
    saveAs(filePath);
  };

  // get payment history
  const getPaymentHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/paymentHistory`,
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
    getPaymentHistory();
  }, [getPaymentHistory]);

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
            <th className="table-cell">Date</th>
            <th className="table-cell">Order ID</th>
            <th className="table-cell">Category</th>
            <th className="table-cell">Amount</th>
            <th className="table-cell">Payment Method</th>
            <th className="table-cell border">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {data.map((itm, i) => {
            const {
              received_date,
              invoice_id,
              total_amount,
              category,
              card,
              inv_pdf,
            } = itm;

            const { exp_year, exp_month, last4, brand } = card;

            return (
              <tr
                key={i}
                className="bg-[var(--slate)] text-[var(--primary)] text-center"
              >
                <td className="table-cell">{received_date}</td>
                <td className="table-cell">{invoice_id}</td>
                <td className="table-cell">{category.name}</td>
                <td className="table-cell">${total_amount} Paid</td>
                <td className="table-cell">
                  <span className="capitalize">
                    {brand}....{last4}
                  </span>
                  <br />
                  <span>
                    Exp {exp_month}/{exp_year}
                  </span>
                </td>
                <td className="table-cell text-center">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="flex gap-2 items-center justify-center px-2 py-[2px] rounded-sm btn-primary"
                      onClick={() => saveFile(inv_pdf)}
                    >
                      <BsDownload />
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    // <section className="my-5 md:my-10 px-3 2xl:px-0">
    // <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-4">
    // <div className="w-full lg:w-9/12 h-auto md:min-h-[400px] mx-auto bg-white shadow-md pb-10 px-2">

    <div className="w-full h-auto md:min-h-[300px] bg-white px-2">
      {/* <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--primary)]">
        <h3 className="text-xl md:text-3xl font-medium">Balance Summary</h3>
        <h6 className="text-base md:text-xl">Last 90 Days</h6>
      </div> */}

      {/* Balance Summary Table */}
      <div className="overflow-x-auto mt-3 md:mt-5">{content}</div>
    </div>
    //  </div>
    // </section>
  );
};

export default BalanceSummary;
