"use client";

import Spin from "@/ui/spin/Spin";
import axios from "axios";
import { useState } from "react";
import SetNewPasswordForm from "./SetNewPasswordForm";

const ForgotPasswordForm = () => {
  const [inputData, setInputData] = useState({ email: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resData, setResData] = useState();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsSuccess(true);

      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/reset_pasword`,
        data: {
          email: inputData.email,
        },
      });

      if (res.status === 200) {
        // set resData
        setResData(res.data);

        //login successful message 😊
        // toast.success(res.data.message);
      }
    } catch (error) {
      // fail message 😢
      // toast.error(error.response.data.message[0]);

      // set message
      setErrorMessage(error.response.data.message[0]);
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      {/* <ToastContainer /> */}

      {resData?.message === undefined ? (
        <form
          className="grid gap-5 mt-5 md:mt-[30px]"
          onSubmit={onSubmitHandler}
        >
          {errorMessage && (
            <div className="-mb-5 leading-4">
              <span className="text-base text-red-500 font-medium">
                {errorMessage}
              </span>
            </div>
          )}

          <input
            className="form-item"
            type="email"
            placeholder="Email address"
            value={inputData.email}
            onChange={(e) =>
              setInputData({ ...inputData, email: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary mt-[10px] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSuccess}
          >
            Submit
            {isSuccess && <Spin />}
          </button>
        </form>
      ) : (
        // <ConfirmCodeForm data={resData} />
        <SetNewPasswordForm email={inputData.email} />
      )}
    </>
  );
};

export default ForgotPasswordForm;
