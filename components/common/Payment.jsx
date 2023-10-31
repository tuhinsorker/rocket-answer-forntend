"use client";

import useApiCall from "@/hooks/useApiCall";
import Stripe from "@/ui/Stripe";
import PayPayment from "@/ui/payPayment/PayPayment";
import Spin from "@/ui/spin/Spin";
import setDataToLocalStorage from "@/utils/setDataToLocalStorage";
import tokenCheck from "@/utils/tokenCheck";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import validator from "validator";

const Payment = ({ price, categoryId, categoryName }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [paymentOption, setPaymentOption] = useState("card");
  const [validateToken, setValidateToken] = useState(null);
  const [duplicateEmail, setDuplicateEmail] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState();

  // const [paypalAccountInfo, setPaypalAccountInfo] = useState("");
  const { data: paymentMethodsData, fetchData, isLoading } = useApiCall();

  const pathName = usePathname();

  // get cookies
  const token = Cookies.get("token");

  // Email Validation checking
  const validateEmail = (e) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setError("");
      setEmail(email);
    } else {
      setError("Enter valid Email!");
    }
  };

  // const paypalAccount = async () => {
  //   try {
  //     const { data } = await axios(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/paypalAccount`
  //     );
  //     // set paypal information
  //     setPaypalAccountInfo(data?.data);
  //   } catch (error) {
  //     console.error(
  //       "There is an error to connect with the paypal account",
  //       error.message
  //     );
  //   }
  // };

  // useEffect(() => {
  //   paypalAccount();
  // }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // set is successful trues
    setIsSuccess(true);

    // error null
    setError("");

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/customer_register`,
        data: {
          email: email,
          password: "password",
          password_confirmation: "password",
          bypass_status: 1,
        },
      });

      if (res.status === 200) {
        const res = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
          data: {
            email: email,
            password: "password",
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.data.code === 200) {
          /**
           * Store data in local storage.
           *
           * This function is responsible for storing data, such as user information or response data,
           * in the local storage of the application. It typically takes two parameters: `res`, which
           * represents the data to be stored, and `userType`, which may be used as a key or identifier
           * for retrieving the data later.
           *
           * @param {any} res - The data to be stored in local storage.
           * @param {string} userType - An optional user type or identifier for organizing the data.
           */
          setDataToLocalStorage(res, "customer");

          // set user type on cookies
          Cookies.set("userType", res.data.data.user_type, { expires: 1 });

          // set token to cookies
          Cookies.set("token", res.data.data.access_token, { expires: 1 });

          //reload this page
          location.reload();
        }
      }
    } catch (error) {
      setIsSuccess(false);

      if (error.response.data.code === 400) {
        setDuplicateEmail(email);

        if (duplicateEmail && password) {
          try {
            setIsSuccess(true);

            const res = await axios({
              method: "POST",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
              data: {
                email: duplicateEmail,
                password: password,
              },
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (res.status === 200) {
              /**
               * Store data in local storage.
               *
               * This function is responsible for storing data, such as user information or response data,
               * in the local storage of the application. It typically takes two parameters: `res`, which
               * represents the data to be stored, and `userType`, which may be used as a key or identifier
               * for retrieving the data later.
               *
               * @param {any} res - The data to be stored in local storage.
               * @param {string} userType - An optional user type or identifier for organizing the data.
               */
              setDataToLocalStorage(res, "customer");

              // set user type on cookies
              Cookies.set("userType", res.data.data.user_type, { expires: 1 });

              // set token to cookies
              Cookies.set("token", res.data.data.access_token, { expires: 1 });

              //reload this page
              location.reload();
            }
          } catch (error) {
            setIsSuccess(false);

            // set error message
            setError(error.response.data.message);

            // log error
            console.error("There was an error occurred", error.message);
          }
        }
      }
    }
  };

  // get account information
  useEffect(() => {
    fetchData(`${process.env.NEXT_PUBLIC_URL}/customer/paymentMethod`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // resolve the token check
  useEffect(() => {
    const resolver = async () => {
      try {
        const isValidToken = await tokenCheck(token);

        // set isValidToken
        setValidateToken(isValidToken);
      } catch (error) {
        // log error message
        console.error(
          "An error occurred while checking the token:",
          error.message
        );
      }
    };

    resolver();
  }, [pathName, token]);

  return (
    <div className="mt-[30px] md:mt-10">
      <div className="flex items-center gap-10 md:gap-20">
        <label
          htmlFor="card"
          className="flex items-center gap-2 cursor-pointer text-sm lg:text-lg text-[var(--primary)]"
          onClick={() => setPaymentOption("card")}
        >
          <input
            type="radio"
            name="card"
            id="card"
            checked={paymentOption === "card"}
            onChange={() => {}}
          />
          Credit Card
        </label>

        {/* <label
          htmlFor="pay-pal"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setPaymentOption("paypal")}
        >
          <input
            type="radio"
            name="pay-pal"
            id="pay-pal"
            checked={paymentOption === "paypal"}
            onChange={() => {}}
          />
          <Image src={pay_pal} alt="pay-pal" />
        </label> */}
      </div>

      {/* payment options */}
      {!isLoading && (
        <>
          {paymentOption === "card" ? (
            <>
              {validateToken || validateToken === null ? (
                <Stripe
                  paymentMethodsData={paymentMethodsData}
                  price={price}
                  categoryId={categoryId}
                  categoryName={categoryName}
                ></Stripe>
              ) : (
                <form
                  className="mt-[20px] md:mt-[30px]"
                  onSubmit={handleSignUp}
                >
                  <div className="mt-5 lg:mt-[30px]">
                    <label className="text-sm lg:text-lg text-[var(--gray-2)]">
                      Email Address
                    </label>
                    <input
                      className="form-item mt-[5px] md:mt-[10px] max-w-[750px]"
                      type="email"
                      placeholder="exapmle@gmail.com"
                      onChange={validateEmail}
                      required
                    />
                  </div>

                  {duplicateEmail && (
                    <div className="mt-5">
                      <label className="text-sm lg:text-lg text-[var(--gray-2)]">
                        Your Password
                      </label>
                      <input
                        className="form-item mt-[5px] md:mt-[10px] max-w-[750px]"
                        type="password"
                        placeholder="your password here"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {error && (
                    <div className="leading-4">
                      <span className="text-xs text-red-500">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary disabled:opacity-70 disabled:cursor-not-allowed mt-[30px]"
                    disabled={isSuccess}
                  >
                    {!duplicateEmail ? "Next" : "login"}
                    {isSuccess && <Spin />}
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              {validateToken || validateToken === null ? (
                <PayPayment
                  email={email}
                  price={price}
                  categoryId={categoryId}
                  paymentMethodsData={paymentMethodsData}
                >
                  {/* <form className="mt-[20px] md:mt-[30px]"> */}
                  <div id="paypal-button-container" className="mt-[30px]"></div>
                  {/* </form> */}
                </PayPayment>
              ) : (
                <form
                  className="mt-[20px] md:mt-[30px]"
                  onSubmit={handleSignUp}
                >
                  <div className="mt-5 lg:mt-[30px]">
                    <label className="text-sm lg:text-lg text-[var(--gray-2)]">
                      Email Address
                    </label>
                    <input
                      className="form-item mt-[5px] md:mt-[10px] max-w-[750px]"
                      type="email"
                      placeholder="exapmle@gmail.com"
                      onChange={validateEmail}
                      required
                    />
                  </div>

                  {duplicateEmail && (
                    <div className="mt-5">
                      <label className="text-sm lg:text-lg text-[var(--gray-2)]">
                        Your Password
                      </label>
                      <input
                        className="form-item mt-[5px] md:mt-[10px] max-w-[750px]"
                        type="password"
                        placeholder="your password here"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {error && (
                    <div className="leading-4">
                      <span className="text-xs text-red-500">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary disabled:opacity-70 disabled:cursor-not-allowed mt-[30px]"
                    disabled={isSuccess}
                  >
                    {!duplicateEmail ? "Next" : "login"}
                    {isSuccess && <Spin />}
                  </button>
                </form>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Payment;
