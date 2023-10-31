"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import { disconnectSocket, getSocket, initiateSocket } from "@/utils/socket";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import Payment from "../common/Payment";
import avt from "/public/images/avt/avt.jpg";

export default function PayConsultancyMain() {
  const { data: profileData, fetchData: fetchProfileData } = useApiCall();
  const [isPackageActive, setIsPackageActive] = useState(false);
  const [subscription, setSubscription] = useState();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  // get cookies
  const token = Cookies.get("token");

  // get the search params
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category_name");
  const categoryId = searchParams.get("category_id");

  // get profile data
  useEffect(() => {
    if (token) {
      fetchProfileData({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const checkPackage = useCallback(async () => {
    const socket = getSocket();

    setIsPackageActive(true);

    // get the conversation
    const conversations = localStorage.getItem("conversation");

    if (profileData?.id) {
      try {
        //@TODO: check if package is already active
        // const { data } = await axios(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/myPackageDetails?category_id=${categoryId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const { data } = await axios(
          // `${process.env.NEXT_PUBLIC_BASE_URL}/consultantHstory`,
          `${process.env.NEXT_PUBLIC_URL}/customer/myPackages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // find subscription data by @status
        const hasCancelSubscription = data?.data?.find((p) => p.status === 1);

        // set has subscription data
        setSubscription(hasCancelSubscription);

        //@TODO: check if package is already active
        if (hasCancelSubscription) {
          const res = await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BASE_URL_SOCKET}/create_activity`,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              title: `Looking for good ${categoryName}`,
              description: `Looking for good ${categoryName}`,
              question_answers: conversations,
              expert_category_id: categoryId,
              customer_id: profileData?.id,
            },
          });

          socket.emit("activity_created", {
            title: `Looking for good ${categoryName}`,
            description: `Looking for good ${categoryName}`,
            topic: `category_${categoryId}`,
            category_id: categoryId,
            user_type: "customer",
            user_id: profileData?.id,
          });

          // remove connection from the local storage
          localStorage.removeItem("conversation");

          // redirect to dashboard
          router.replace(
            `/category/${categoryName.toLowerCase()}?categoryId=${categoryId}&activity_id=${
              res.data.data
            }`
          );
        }
      } catch (error) {
        setIsPackageActive(false);

        // console.log(error);
        console.error("There is an error occurred", error.message);
      } finally {
        setIsPackageActive(false);
      }
    }
  }, [token, categoryName, categoryId, profileData?.id, router]);

  // check Package
  useEffect(() => {
    if (token) {
      checkPackage();
    }
  }, [checkPackage, token]);

  const expertCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/expertCategories?category_id=${categoryId}`
      );

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  // fetch the category data from the API
  useEffect(() => {
    expertCategories();
  }, [expertCategories]);

  // socket connection here
  useEffect(() => {
    initiateSocket();

    const socket = getSocket();

    socket.on("connect", () => {
      console.log("connected to socket", "socket id = " + socket.id);

      socket.emit("get_online_experts", {
        user_id: 68,
        user_type: "customer",
        category_id: categoryId,
        socket_id: socket.id,
      });
    });

    // online experts listener
    socket.on("online_experts", (message) => {
      // console.log("total online experts", message);
    });

    return () => {
      disconnectSocket();
    };
  }, [categoryId]);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-[200px] sm:h-[400px]"} />;
  } else if (isPackageActive || subscription) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-[200px] sm:h-[400px]"} />;
  } else {
    const findByCategoryId = data?.data?.find(
      (itm) => itm?.id === categoryId * 1
    );
    const membership_info = data?.membership_info.split("|");
    const customer_satisfied = data?.customer_satisfied;

    const { name, id, pricing, online_user_count, image_url } =
      findByCategoryId || {};
    const {
      trial_price,
      trial_day,
      recurring_price,
      recurring_day,
      description,
    } = pricing || {};

    content = (
      <>
        <div className="w-full md:w-1/2 pe-0 sm:pe-5 lg:pe-10 xl:pe-20">
          {/* logo here */}
          {/* <Image src={logo} alt="logo" /> */}
          <h2 className="text-xl sm:text-2xl capitalize text-[var(--primary)]">
            Payment for{" "}
            <span className="text-[var(--secondary)] font-medium">{name}</span>{" "}
            Category
          </h2>

          <div className="mt-[15px] md:mt-5">
            <p className="text-sm md:text-lg leading-5 md:leading-6 text-[var(--primary)] font-medium mt-1">
              {/* Join for ${trial_price || 0} and get your answer for{" "}
              {trial_day || 0} days */}
              Get your answer from an Expert in minutes
            </p>
            <p className="text-base leading-5 text-[var(--primary)] mt-3">
              Unlimited conversations—one-time ${trial_price || 0} join fee and
              ${recurring_price || 0}/{recurring_day || 0} days. Cancel anytime.
              {/* Unlimited conversations—try {recurring_day || 0} days for just $
              {recurring_price || 0}. Then ${recurring_price || 0}/month. Cancel
              anytime. */}
            </p>
          </div>

          {/* Payment Option Here */}
          <Payment categoryId={id} price={trial_price} categoryName={name} />
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0 bg-[var(--primary)]">
          <div className="w-full sm:w-[356px] xl:w-[556px] px-[10px] sm:px-0 pt-10 flex flex-col items-center ">
            <p className="text-white text-center">
              {online_user_count} {name}s are online now
            </p>

            <div className="w-[200px] flex items-center justify-center mt-10 mb-5">
              <Image
                src={image_url || avt}
                alt="img"
                height={100}
                width={100}
              />
            </div>

            <p className="text-white text-center">
              {customer_satisfied} Satisfied Customers
            </p>
          </div>

          <div className="w-full sm:w-[356px] xl:w-[556px] mx-auto px-[10px] sm:px-0 py-10 sm:py-[60px]">
            {/* Membership Benefits Here */}
            <div className="bg-[var(--primary-dark)] text-white p-[15px_20px] md:p-[30px_40px] shadow-md">
              <h6 className="text-2xl font-semibold">Membership Benefits:</h6>
              <ul className="grid gap-4 mt-[30px] md:mt-12">
                {membership_info.map((itm, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{itm}</span>
                    <span>
                      <BsCheck2 />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  // console.log(data);

  return (
    <section className="my-[40px] md:m-[40px_0_60px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* content here */}
        {content}
      </div>
    </section>
  );
}
