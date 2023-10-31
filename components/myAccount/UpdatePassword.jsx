import Spin from "@/ui/spin/Spin";
import { errorAlert, successAlert } from "@/utils/alerts";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // input form data
  const [inputData, setInputData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // get token
  const token = Cookies.get("token");

  const oneSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      current_password: inputData.current_password,
      password: inputData.password,
      password_confirmation: inputData.password_confirmation,
    };

    setIsSuccess(true);

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/customer/update_password`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        // set token to cookies
        Cookies.set("token", res.data.data.access_token, { expires: 1 });

        // input data empty
        setInputData({
          current_password: "",
          password: "",
          password_confirmation: "",
        });

        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Your password update successfully");
      }
    } catch (error) {
      /**
       * Display a `errorAlert` message.
       *
       * @param {string} title - The title of the error alert.
       * @param {string} text - The text to display in the error alert.
       */
      errorAlert("Error!", error.response.data.message);

      console.error("There wan an error occurred", error.message);
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={oneSubmitHandler}>
      <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5 mt-3 sm:mt-5 lg:mt-[30px]">
        <div className="w-full sm:w-1/2">
          <label className="text-sm lg:text-base text-[var(--gray-2)]">
            Old Password
          </label>
          <div className="flex items-center justify-between relative mt-[5px]">
            <input
              className="form-item pe-10"
              type={showOldPassword ? "password" : "text"}
              placeholder="Enter old password"
              value={inputData.current_password || ""}
              onChange={(e) =>
                setInputData({ ...inputData, current_password: e.target.value })
              }
              required
            />

            <span
              className="absolute right-4 text-[var(--dark)] cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="text-sm lg:text-base text-[var(--gray-2)]">
            New Password
          </label>
          <div className="flex items-center justify-between relative mt-[5px]">
            <input
              className="form-item pe-10"
              type={showPassword ? "password" : "text"}
              placeholder="Enter new password"
              value={inputData.password || ""}
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
              required
            />

            <span
              className="absolute right-4 text-[var(--dark)] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="text-sm lg:text-base text-[var(--gray-2)]">
            Confirm Password
          </label>
          <div className="flex items-center justify-between relative mt-[5px]">
            <input
              className="form-item pe-10"
              type={showConfirmPassword ? "password" : "text"}
              placeholder="Enter confirm password"
              value={inputData.password_confirmation || ""}
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  password_confirmation: e.target.value,
                })
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
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="text-[16px] leading-[20px] btn-secondary mt-[30px] lg:mt-[40px] disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSuccess}
        >
          Update Password
          {isSuccess && <Spin />}
        </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
