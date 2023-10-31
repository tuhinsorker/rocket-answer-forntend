"use client";

import Spin from "@/ui/spin/Spin";
import { successAlert } from "@/utils/alerts";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const WithdrawForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // input form data
  const [inputData, setInputData] = useState({
    email: "",
    amount: "",
  });

  // get token
  const token = Cookies.get("token");

  // Withdraw Handler
  const withdrawHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/withdraw_request`,
        data: {
          paypal_email: inputData.email,
          request_amount: inputData.amount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status == 200) {
        setInputData({
          amount: "",
          email: "",
        });

        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", res.data.message);
      }
    } catch (error) {
      /**
       * Display a `errorAlert` message.
       *
       * @param {string} title - The title of the error alert.
       * @param {string} text - The text to display in the error alert.
       */
      errorAlert("Error!", error.response.data.message);

      // log the error message
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-none sm:flex-1 w-full">
      <div className="p-5 bg-white shadow-md box-hover rounded-md">
        <h3 className="text-xl text-[var(--primary)]">Withdraw Money</h3>
        <div className="mt-4">
          <form
            className="flex flex-col gap-[10px] sm:gap-5 lg:gap-[30px]"
            onSubmit={withdrawHandler}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-[10px] lg:gap-5">
              <div className="w-full lg:w-1/2">
                <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
                  Paypal Email
                </label>
                <input
                  className="form-item mt-[5px]"
                  type="email"
                  placeholder="example@gmail.com"
                  value={inputData.email || ""}
                  onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="w-full lg:w-1/2">
                <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
                  Amount
                </label>
                <input
                  className="form-item mt-[5px]"
                  type="number"
                  placeholder="100"
                  value={inputData.amount || ""}
                  onChange={(e) =>
                    setInputData({ ...inputData, amount: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-[10px]">
              <button
                type="submit"
                className="w-full text-[16px] leading-[20px] btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Withdraw Money
                {isLoading && <Spin />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawForm;
