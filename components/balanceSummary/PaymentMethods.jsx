"use client";

import useApiCall from "@/hooks/useApiCall";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Modal from "@/ui/modal/Modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import PaymentCard from "../card/PaymentCard";
import CheckoutForm from "./CheckoutForm";

const options = {
  mode: "payment",
  amount: 1,
  currency: "usd",
  appearance: {
    /*...*/
  },
};

const PaymentMethods = () => {
  // Show more modal
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState();

  const { data: stripeMethods, fetchData, isLoading, error } = useApiCall();

  const {
    data: paymentMethods,
    fetchData: paymentMethodsFetch,
    isLoading: paymentMethodsLoading,
  } = useApiCall();

  // stripe promises
  let stripePromise = "";

  if (!paymentMethodsLoading) {
    const strip = paymentMethods.find(
      (paymentMethod) => paymentMethod.name === "Strip"
    );
    stripePromise = loadStripe(strip?.client_id);
  }

  //get the token from the cookie
  const token = Cookies.get("token");

  // get account information
  useEffect(() => {
    paymentMethodsFetch(
      `${process.env.NEXT_PUBLIC_URL}/customer/paymentMethod`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get paymentMethods
  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL}/general/get_stripe_methods`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, action]);

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
    content = <h2>No Data found!</h2>;
  } else if (isLoading === true && stripeMethods === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-auto sm:h-[200px]"} />;
  } else if (stripeMethods.length === 0) {
    content = <h2>No Data found!</h2>;
  } else {
    content = stripeMethods.map((method, i) => (
      <PaymentCard key={i} method={method} setAction={setAction} />
    ));
  }

  return (
    <>
      <Modal showModal={showModal}>
        <div className="w-[300px] sm:w-[420px] bg-white p-5 mx-auto relative flex flex-col items-center">
          <h2 className="text-xl text-[var(--dark)] font-medium">
            Payment information
          </h2>

          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              setShowModal={setShowModal}
              setAction={setAction}
            ></CheckoutForm>
          </Elements>
          {/* close button */}
          <button
            className="absolute -top-10 right-0 text-white text-4xl"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>
      </Modal>

      <div className="w-full h-auto md:min-h-[300px] bg-white px-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--primary)]">
          <h3 className="text-xl md:text-3xl font-medium">Payment Methods</h3>
          {/* <h6 className="text-base md:text-xl">Last 90 Days</h6> */}
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-3 md:mt-5 pb-5 sm:pb-10">
          {/* card content here */}
          {content}

          {stripeMethods?.length > 0 && (
            <div className="w-[250px] md:w-[300px] h-[200px] border border-dashed flex items-center justify-center">
              <button
                type="button"
                className="text-[var(--primary)]"
                onClick={() => setShowModal(true)}
              >
                <BsPlusLg className="text-5xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
