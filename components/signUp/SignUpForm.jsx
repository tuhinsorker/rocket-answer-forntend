"use client";

import Spin from "@/ui/spin/Spin";
import { successAlert } from "@/utils/alerts";
import setDataToLocalStorage from "@/utils/setDataToLocalStorage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import validator from "validator";

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  // input form data
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  // Email Validation checking
  const validateEmail = (e) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
      setInputData({ ...inputData, email });
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  // Email Validation checking
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
      setPasswordError("");
      setInputData({ ...inputData, password });
    } else {
      setPasswordError(
        "password must be at least 8 characters,uppercase,lowercase,symbols and number!"
      );
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //email errors checking
    if (emailError !== "") {
      return setError(emailError);
    }

    //password errors checking
    if (passwordError !== "") {
      return setError(passwordError);
    }

    // passwords match checking
    if (inputData.password !== inputData.confirm_password) {
      return setError("password does not match");
    }

    // error null
    setError("");

    // create a new user
    try {
      setIsSuccess(true);

      // register a new user
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/customer_register`,
        data: {
          email: inputData.email,
          password: inputData.password,
          password_confirmation: inputData.confirm_password,
          bypass_status: null,
        },
      });

      if (res.status === 200) {
        // login the new user
        const res = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
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
          setDataToLocalStorage(res, "customer");

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
          successAlert("Good job!", "Registration successful!");

          // redirect to home
          router.push("/");

          //login successful message 😊
          // toast.success("Login Successful!");
        }
      }

      //sign up successful message 😊
      // toast.success("Sign Up Successful !");

      //redirect to /sign-in page after sign up successful
      // router.push("/sign-in");
    } catch (error) {
      // set Error message
      setError(error.response.data.message);

      console.log(error);

      //sign up fail message 😢
      // toast.error(error.response.data.message);
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      {/* <ToastContainer /> */}

      {/* form sign up */}
      <form className="grid gap-5 mt-5 md:mt-[30px]" onSubmit={onSubmitHandler}>
        <input
          className="form-item"
          type="email"
          placeholder="Email address"
          onChange={(e) => validateEmail(e)}
          required
        />

        <div className="flex items-center justify-between relative">
          <input
            className="form-item pe-10"
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            onChange={(e) => validatePassword(e)}
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
            placeholder="Confirm Password"
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

        {error && (
          <div className="-mt-5 leading-4">
            <span className="text-xs text-red-500">{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="block w-full text-[16px] leading-[20px] btn-secondary mt-[10px] disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSuccess}
        >
          Signup
          {isSuccess && <Spin />}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
