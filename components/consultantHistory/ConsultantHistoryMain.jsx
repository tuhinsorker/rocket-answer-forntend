"use client";

import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Modal from "@/ui/modal/Modal";
import Pagination from "@/ui/pagination/Pagination";
import ReactRating from "@/ui/rating/ReactRating";
import Spin from "@/ui/spin/Spin";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import avt from "/public/images/avt/avt.jpg";

const ConsultantHistoryMain = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPageNumber, setTotalPageNumber] = useState(0);

  // Show more modal
  const [showModal, setShowModal] = useState(false);
  const [ratingData, setRatingData] = useState(null);
  const [activityId, setActivityId] = useState(null);
  const [ratingSuccess, setRatingSuccess] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // navigator to
  const { push } = useRouter();

  // get cookies
  const token = Cookies.get("token");

  // get rating data callback function
  const getRatingData = (rating) => {
    setRatingData(rating);
  };

  // submit rating data
  const submitRatingHandler = async () => {
    try {
      setIsSuccess(true);

      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/general/close-activity-by-customer`,
        data: {
          conversation_id: activityId * 1,
          rating: ratingData,
          review_text: "Please",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setRatingSuccess(true);

        setShowModal(false);
      }
    } catch (error) {
      console.error("There is an error with this API.", error);
      console.log(error);
    } finally {
      setIsSuccess(false);
    }
  };

  // get consultant History
  const consultantHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/consultantHstory?page_number=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // set pagination
      const totalData = data.total;
      const limit = data.limit;

      const totalPage = Math.ceil(totalData / limit);
      setTotalPageNumber(totalPage);

      setData(data?.data);
    } catch (error) {
      console.error("There is an error with this request", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber, token]);

  // get consultant History
  useEffect(() => {
    consultantHistory();
  }, [consultantHistory, ratingSuccess]);

  useEffect(() => {
    const body = document.body;

    if (showModal) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [showModal]);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-[200px] sm:h-[400px]"} />;
  } else if (data.length === 0) {
    content = <h2>No Data found!</h2>;
  } else {
    content = (
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--primary)] text-white">
            <th className="table-cell">Profile</th>
            <th className="table-cell">Name</th>
            <th className="table-cell">Category</th>
            <th className="table-cell">Description</th>
            <th className="table-cell">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((itm) => {
            const {
              id,
              expert,
              description,
              expert_category,
              rating,
              is_customer_closed,
              is_expert_closed,
            } = itm || {};

            return (
              <Fragment key={id}>
                {!expert ? (
                  <tr
                    key={id}
                    className={` ${
                      is_expert_closed === 1
                        ? "bg-yellow-100"
                        : "bg-[var(--slate)]"
                    }  text-[var(--primary)] cursor-pointer text-center`}
                    onClick={() =>
                      push(
                        `/category/${expert_category.name.toLowerCase()}?categoryId=${
                          expert_category.id
                        }&activity_id=${id}`
                      )
                    }
                  >
                    <td className="table-cell" colSpan={2}>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={expert?.profile_img || avt}
                          alt="avt_profile"
                          className="w-full h-full"
                          height={50}
                          width={50}
                        />
                      </div>
                    </td>
                    <td className="table-cell">
                      {expert_category?.name || ""}
                    </td>
                    <td className="table-cell" colSpan={2}>
                      <span className="font-medium">
                        Be patient expert will join soon!
                      </span>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={id}
                    className={` ${
                      is_expert_closed === 1
                        ? // is_customer_closed === 1
                          "bg-yellow-100"
                        : "bg-[var(--slate)]"
                    }  text-[var(--primary)] cursor-pointer text-center`}
                    // onClick={() =>
                    //   push(
                    //     `/dashboard/board?category_name=${expert_category.name.toLowerCase()}&activity_id=${id}`
                    //   )
                    // }
                  >
                    <td
                      className="table-cell"
                      onClick={() =>
                        push(
                          `/category/${expert_category.name.toLowerCase()}?categoryId=${
                            expert_category.id
                          }&activity_id=${id}`
                        )
                      }
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={expert?.profile_img || avt}
                          alt="avt_profile"
                          className="w-full h-full"
                          height={50}
                          width={50}
                        />
                      </div>
                    </td>
                    <td
                      className="table-cell"
                      onClick={() =>
                        push(
                          `/category/${expert_category.name.toLowerCase()}?categoryId=${
                            expert_category.id
                          }&activity_id=${id}`
                        )
                      }
                    >
                      {expert?.full_name || "not found"}
                    </td>
                    <td
                      className="table-cell"
                      onClick={() =>
                        push(
                          `/category/${expert_category.name.toLowerCase()}?categoryId=${
                            expert_category.id
                          }&activity_id=${id}`
                        )
                      }
                    >
                      {expert_category?.name || "not found"}
                      <br />
                      {/* {is_customer_closed === 1 && ( */}
                      {is_expert_closed === 1 && (
                        <span className="text-xs uppercase bg-[var(--secondary)] text-white p-[1px_4px] rounded">
                          chat closed
                        </span>
                      )}
                    </td>
                    <td
                      className="table-cell"
                      onClick={() =>
                        push(
                          `/category/${expert_category.name.toLowerCase()}?categoryId=${
                            expert_category.id
                          }&activity_id=${id}`
                        )
                      }
                    >
                      {description}
                    </td>
                    <td className="table-cell">
                      {is_expert_closed === 1 &&
                      (rating === "0.00" ||
                        rating === null ||
                        rating === "") ? (
                        // {is_customer_closed === 1 && rating === "0.00" ? (
                        <button
                          className="flex items-center justify-center text-[16px] leading-[20px] btn-secondary capitalize mx-auto"
                          onClick={() => {
                            setActivityId(id);
                            setShowModal(true);
                          }}
                        >
                          give rating
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-1 text-[var(--primary)] text-center">
                          {/* <p> */}
                          {rating ? (
                            <>
                              <BsFillStarFill className="text-[var(--secondary)]" />{" "}
                              <span>{parseFloat(rating)}</span>
                            </>
                          ) : (
                            <p>Chat not closed yet</p>
                          )}
                          {/* <span> (5)</span> */}
                          {/* </p> */}
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <Modal showModal={showModal}>
        <div className="w-full sm:w-[320px] bg-white p-10 mx-auto relative flex flex-col items-center">
          <h2 className="text-xl text-[var(--dark)] font-medium">
            Your opinion matter to us!
          </h2>
          <p className="text-sm leading-4 text-[var(--gray)] text-center mt-2 my-4">
            If you enjoy the service, would you like to rating us?
          </p>

          {/* rating component */}
          <ReactRating getRatingData={getRatingData} />

          <button
            className="flex items-center justify-center text-[16px] leading-[20px] btn-secondary mt-5 capitalize disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSuccess || ratingData === null}
            onClick={submitRatingHandler}
          >
            give rating
            {isSuccess && <Spin />}
          </button>

          <button
            className="text-[var(--gray-2)] text-sm mt-2 hover:underline"
            onClick={() => setShowModal(false)}
          >
            No, Thanks!
          </button>

          {/* close button */}
          <button
            className="absolute -top-10 right-0 text-white text-4xl"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>
      </Modal>

      <section className="my-5 md:my-10 px-3 2xl:px-0">
        <div className="max-w-[1296px] h-auto md:min-h-[400px] mx-auto flex flex-col sm:flex-row gap-4">
          {/* Side Bar Here */}
          {/* <SideBar /> */}

          {/* <div className="w-full sm:w-8/12 lg:w-9/12 bg-white shadow-md pb-10 px-2"> */}
          <div className="w-full bg-white shadow-md pb-10 px-2">
            {/* <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--primary)]"> */}
            <h3 className="text-xl md:text-3xl font-medium">
              Consultant history
            </h3>
            {/* <h6 className="text-base md:text-xl">Last 90 Days</h6> */}
            {/* </div> */}

            {/* Consultant history Table */}
            <div className="overflow-x-auto mt-3 md:mt-5">{content}</div>

            {/* Pagination */}
            <Pagination
              clss="justify-end mt-5"
              totalPageNumber={totalPageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultantHistoryMain;
