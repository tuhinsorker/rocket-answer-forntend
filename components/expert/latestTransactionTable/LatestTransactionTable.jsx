"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import NotFound from "@/ui/notFound/NotFound";
import Cookies from "js-cookie";
import { useEffect } from "react";

const LatestTransactionTable = ({ limit }) => {
  const { data, error, fetchData, isLoading } = useApiCall();

  // get token
  const token = Cookies.get("token");

  // fetch transactions data
  useEffect(() => {
    fetchData({
      url: `${process.env.NEXT_PUBLIC_URL}/transections?limit=${limit}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-auto sm:h-[200px]"} />;
  } else if (data.length === 0) {
    content = <NotFound />;
  } else {
    content = (
      <table className="w-full border-spacing-0">
        <thead>
          <tr className="bg-[var(--primary)] text-white">
            <th className="table-cell font-normal text-left">Date</th>
            <th className="table-cell font-normal">Amount</th>
            <th className="table-cell font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((itm) => {
            const { amount, payment_date, id } = itm;
            return (
              <tr key={id} className="text-[var(--dark)] text-center">
                <td className="table-cell font-normal text-start">
                  {payment_date}
                </td>
                <td className="table-cell font-normal">${amount}</td>
                <td className="table-cell font-normal">
                  <span className="capitalize bg-green-700 px-4 py-0.5 rounded-xl text-white">
                    in
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <>{content}</>;
};

export default LatestTransactionTable;
