"use client";

import Spin from "@/ui/spin/Spin";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";

const SetNewPasswordForm = ({ email }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  // input form data
  const [inputData, setInputData] = useState({
    code: "",
    password: "",
    confirm_password: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Password Validation checking
  const validatePassword = (e) => {
    const password = e.target.value;

    const options = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    };

    if (validator.isStrongPassword(password, options)) {
      setErrorMessage("");
      setInputData({ ...inputData, password });
    } else {
      setErrorMessage(
        "password must be at least 8 characters,uppercase,lowercase,symbols and number!"
      );
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // passwords match checking
    if (inputData.password !== inputData.confirm_password) {
      return setErrorMessage("Password does not match");
    }

    // error null
    setErrorMessage("");

    try {
      setIsSuccess(true);

      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot_password`,
        data: {
          token: inputData.code,
          email,
          password: inputData.password,
          password_confirmation: inputData.confirm_password,
        },
      });

      if (res.status === 200) {
        // remove error message
        setErrorMessage("");

        setInputData({
          password: "",
          confirm_password: "",
        });

        // set success message
        setSuccessMessage(res.data.message);

        //login successful message 😊
        toast.success(res.data.message);

        //redirect to /sign-in page after sign up successful
        router.push("/sign-in");
      }
    } catch (error) {
      // fail message
      setErrorMessage(error.response.data.message);

      // fail message 😢
      toast.error(error.response.data.message);
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      <form className="grid gap-5 mt-5 md:mt-[30px]" onSubmit={onSubmitHandler}>
        {successMessage && (
          <div className="-mb-5 leading-4">
            <span className="text-base text-green-600 font-medium">
              {successMessage}
            </span>
          </div>
        )}

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
          onChange={(e) => setInputData({ ...inputData, code: e.target.value })}
          required
        />

        <div className="flex items-center justify-between relative">
          <input
            className="form-item pe-10"
            type={showPassword ? "password" : "text"}
            placeholder="New Password"
            // value={inputData.password}
            onChange={validatePassword}
            required
          />

          <span
            className="absolute right-4 text-[var(--dark)] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        </div>

        <div className="flex items-center justify-between relative">
          <input
            className="form-item"
            type={showConfirmPassword ? "password" : "text"}
            placeholder="Password Confirmation"
            value={inputData.confirm_password}
            onChange={(e) =>
              setInputData({ ...inputData, confirm_password: e.target.value })
            }
            required
          />

          <span
            className="absolute right-4 text-[var(--dark)] cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary mt-[10px] disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSuccess ? true : false}
        >
          Submit
          {isSuccess && <Spin />}
        </button>
      </form>
    </>
  );
};

export default SetNewPasswordForm;
