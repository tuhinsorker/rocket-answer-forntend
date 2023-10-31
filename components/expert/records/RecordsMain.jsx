"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import NotFound from "@/ui/notFound/NotFound";
import imgPath from "@/utils/imgPath";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { BsFillStarFill, BsGeoAlt } from "react-icons/bs";
import avt from "/public/images/avt/avt.jpg";

const RecordsMain = () => {
  const { data, error, fetchData, isLoading } = useApiCall();

  // navigator to
  const { push } = useRouter();

  // get token
  const token = Cookies.get("token");

  // fetch transactions data
  useEffect(() => {
    (async () => {
      try {
        fetchData({
          url: `${process.env.NEXT_PUBLIC_URL}/conversetion`,
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
    content = (
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--primary)] text-white">
            <th className="table-cell font-normal text-left">Name</th>
            <th className="table-cell font-normal text-left">Location</th>
            {/* <th className="table-cell font-normal">Description</th> */}
            <th className="table-cell font-normal">Title</th>
            <th className="table-cell font-normal">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((itm) => {
            const { id, customer, rating, price, title, is_expert_closed } =
              itm;
            const { address, image, name } = customer;
            return (
              <tr
                key={id}
                className={` ${
                  is_expert_closed === 1 ? "bg-yellow-100" : "bg-[var(--slate)]"
                }  text-[var(--primary)] cursor-pointer text-center`}
                // expert/dashboard/chat?category_id=1&activity_id=25&customer_id=365
                onClick={() => push(`/expert/dashboard/chat?activity_id=${id}`)}
              >
                <td className="table-cell font-normal">
                  <div className="flex gap-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden border">
                      <Image
                        src={image ? imgPath(image) : avt}
                        alt={name || "customer photo"}
                        width={40}
                        height={40}
                      />
                    </div>
                    <p>{name}</p>
                  </div>
                </td>
                <td className="table-cell font-normal">
                  <div className="flex items-center gap-2.5">
                    <BsGeoAlt />
                    {address ?? ""}
                  </div>
                </td>
                {/* <td className="table-cell font-normal">07 Oct,2023</td> */}
                <td className="table-cell font-normal">
                  {title}
                  <br />

                  {is_expert_closed === 1 ? (
                    <span className="text-xs text-[var(--secondary)] capitalize font-medium">
                      Closed
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--primary)] capitalize font-medium">
                      On going
                    </span>
                  )}
                </td>
                <td className="table-cell font-normal">
                  <div className="flex items-center justify-center gap-1 text-[var(--primary)] text-center">
                    {rating && (
                      <Fragment>
                        <BsFillStarFill className="text-[var(--secondary)]" />{" "}
                        <span>{rating}</span>
                      </Fragment>
                    )}
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
    <section className="pb-[60px] md:pb-[120px] pt-5 md:pt-0 px-3 2xl:px-0 bg-[var(--slate)]">
      <div className="max-w-[1296px] m-auto bg-white shadow-md box-hover rounded-md">
        <div className="overflow-x-auto px-5 pt-10">{content}</div>
      </div>
    </section>
  );
};

export default RecordsMain;
