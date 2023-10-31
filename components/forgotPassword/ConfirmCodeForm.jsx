"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SetNewPasswordForm from "./SetNewPasswordForm";

const ConfirmCodeForm = ({ data }) => {
  // input form data
  const [inputData, setInputData] = useState({ code: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [codeCheck, setCodeCheck] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (data.token === inputData.code * 1) {
      // remove the error message
      setErrorMessage("");

      // set code check to true
      setCodeCheck(true);

      // input data remove
      setInputData({ code: "" });

      // tost successfully message
      toast.success("You have entered the right code");
    } else {
      // set error message
      setErrorMessage("Invalid code");

      // tost error message
      toast.error("Invalid code 😒");
    }
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      {!codeCheck ? (
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
            type="text"
            placeholder="Enter Your Code"
            value={inputData.code}
            onChange={(e) =>
              setInputData({ ...inputData, code: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary mt-[10px]"
          >
            Submit
          </button>

          <p>{data.token}</p>
        </form>
      ) : (
        <SetNewPasswordForm data={data} />
      )}
    </>
  );
};

export default ConfirmCodeForm;
