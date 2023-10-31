"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import NotFound from "@/ui/notFound/NotFound";
import Cookies from "js-cookie";
import { useEffect } from "react";

const History = () => {
  const { data, error, fetchData, isLoading } = useApiCall();

  // get token
  const token = Cookies.get("token");

  // fetch transactions data
  useEffect(() => {
    (async () => {
      try {
        fetchData({
          url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("There was an error fetching the data.", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const {
      total_conversation,
      cat_wise_conversation,
      avareg_rating,
      total_earnings,
      total_withdraw,
      expert_balances,
      avareg_respons_time,
    } = data;

    content = (
      <div className="max-w-[1296px] m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-5">
        <div className="py-3 md:py-6 px-2.5 sm:px-5 md:px-10 text-[var(--primary)] rounded-lg bg-white border shadow-md box-hover">
          <h3 className="text-3xl text-[var(--secondary)]">
            ${expert_balances}
          </h3>
          <p className="text-sm">Your Balance</p>
          <p className="text-sm mt-1">Available</p>
        </div>
        <div className="py-3 md:py-6 px-2.5 sm:px-5 md:px-10 text-[var(--primary)] rounded-lg bg-white border shadow-md box-hover">
          <h3 className="text-3xl">{total_conversation}</h3>
          <p className="text-sm">Question Response </p>
          <p className="text-sm mt-1">
            Out of
            <span className="text-[var(--secondary)]">
              {" "}
              {cat_wise_conversation}
            </span>
          </p>
        </div>
        <div className="py-3 md:py-6 px-2.5 sm:px-5 md:px-10 text-[var(--primary)] rounded-lg bg-white border shadow-md box-hover">
          <h3 className="text-3xl">{avareg_rating}</h3>
          <p className="text-sm">Average Rating</p>
          <p className="text-sm mt-1">
            Form
            <span className="text-[var(--secondary)]">
              {" "}
              {total_conversation}
            </span>
          </p>
        </div>
        <div className="py-3 md:py-6 px-2.5 sm:px-5 md:px-10 text-[var(--primary)] rounded-lg bg-white border shadow-md box-hover">
          <h3 className="text-3xl">{avareg_respons_time}</h3>
          <p className="text-sm">Average Response</p>
          <p className="text-sm mt-1">
            Form
            <span className="text-[var(--secondary)]">
              {" "}
              {total_conversation}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // console.log("History ===", data);

  return (
    <section className="pt-10 md:pt-16 px-3 2xl:px-0 bg-[var(--slate)]">
      {content}
    </section>
  );
};

export default History;
