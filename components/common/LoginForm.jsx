"use client";

import Spin from "@/ui/spin/Spin";
import { errorAlert, successAlert } from "@/utils/alerts";
import setDataToLocalStorage from "@/utils/setDataToLocalStorage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = ({ userType = "customer" }) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // input form data
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    setIsSuccess(true);

    // login URL as an expert or customer
    const path = userType === "expert" ? "login" : "customer/login";

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/${path}`,
        data: {
          email: inputData.email,
          password: inputData.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        // remove the error message
        setError("");

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
        setDataToLocalStorage(res, userType);

        // set user type on cookies
        Cookies.set("userType", res.data.data.user_type, { expires: 1 });

        // set token to cookies
        Cookies.set("token", res.data.data.access_token, { expires: 1 });

        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Login successful!");

        // redirect to
        router.push("/");
      }
    } catch (error) {
      // set error message
      setError(error.response.data.message);

      /**
       * Display a `errorAlert` message.
       *
       * @param {string} title - The title of the error alert.
       * @param {string} text - The text to display in the error alert.
       */
      errorAlert("Error!", error.response.data.message);
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <form className="grid gap-5 mt-5 md:mt-[30px]" onSubmit={loginHandler}>
      <input
        className="form-item"
        type="text"
        placeholder="Email address"
        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
        required
      />
      <input
        className="form-item"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setInputData({ ...inputData, password: e.target.value })
        }
        required
      />

      {error && (
        <div className="-mt-5 leading-4">
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary mt-[10px] disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isSuccess}
      >
        Login
        {isSuccess && <Spin />}
      </button>
    </form>
  );
};

export default LoginForm;
