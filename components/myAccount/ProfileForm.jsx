"use client";

import { CountryContext } from "@/context/countryInfoContext";
import useApiCall from "@/hooks/useApiCall";
import Selector from "@/ui/selector/Selector";
import SelectorCode from "@/ui/selector/SelectorCode";
import Spin from "@/ui/spin/Spin";
import { successAlert } from "@/utils/alerts";
import imgPath from "@/utils/imgPath";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import avt from "/public/images/avt/avt.jpg";

const ProfileForm = () => {
  const { countryData } = useContext(CountryContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [base64String, setBase64String] = useState("");
  const [isCode, setIsCode] = useState(false);

  // input form data
  const [inputData, setInputData] = useState({
    name: "",
    code: 880,
    phone_number: "",
    email: "",
    address: "",
    country: {
      id: 18,
      sortname: "BD",
      name: "Bangladesh",
      phonecode: 880,
    },
    date_of_birth: "",
    profile_image: "",
  });

  // fetch Data hook
  const { data, isLoading, error, fetchData } = useApiCall();

  // get token
  const token = Cookies.get("token");

  // input change handler
  const onchangeHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // update profile settings
  const oneSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: inputData.name,
      phone: inputData.phone_number,
      email: inputData.email,
      address: inputData.address,
      country_id: inputData.country.id,
      dob: inputData.date_of_birth,
      // image_old: "",
      image: base64String,
    };

    try {
      setIsSuccess(true);

      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/updateCustomerProfile`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Profile information save successfully");

        // reload the page
        location.reload();
      }
    } catch (error) {
      // fail message 😢
      // toast.error(error.message);

      console.error("There wan an error occurred", error.message);
    } finally {
      setIsSuccess(false);
    }
  };

  // get profile info
  useEffect(() => {
    fetchData({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && data !== null) {
      const { name, email, phone, address, image, country, dob } =
        data?.customer;
      setInputData({
        name: name,
        code: country == null ? inputData.code : country?.phonecode,
        phone_number: phone,
        email: email,
        address: address,
        country: country == null ? inputData.country : country,
        date_of_birth: dob,
        profile_image: image,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  return (
    <>
      {/* Toast Container */}
      {/* <ToastContainer /> */}

      <form onSubmit={oneSubmitHandler}>
        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-lg text-[var(--gray-2)]">
              Name
            </label>
            <input
              className="form-item mt-[5px] md:mt-[10px]"
              type="text"
              placeholder="Name"
              value={inputData.name || ""}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-[10px] lg:gap-5">
            <div className="w-full  sm:w-1/3">
              <label className="text-sm lg:text-lg text-[var(--gray-2)]">
                Code
              </label>

              <SelectorCode
                id={"country-code"}
                open={isCode}
                onToggle={() => setIsCode(!isCode)}
                // onChange={setCountry}
                onChange={setInputData}
                selectedValue={countryData?.find(
                  (option) => option.phonecode === inputData?.code
                )}
              />
            </div>

            <div className="w-full sm:w-2/3">
              <label className="text-sm lg:text-lg text-[var(--gray-2)]">
                Phone
              </label>
              <input
                className="form-item mt-[5px] md:mt-[10px]"
                type="number"
                placeholder="Phone number"
                value={inputData.phone_number || ""}
                onChange={(e) =>
                  setInputData({ ...inputData, phone_number: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5 mt-3 sm:mt-5 lg:mt-[30px]">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-lg text-[var(--gray-2)]">
              Email
            </label>
            <input
              className="form-item mt-[5px] md:mt-[10px]"
              type="email"
              placeholder="email@example.com"
              value={inputData.email || ""}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-lg text-[var(--gray-2)]">
              Address
            </label>
            <input
              className="form-item mt-[5px] md:mt-[10px]"
              type="text"
              placeholder="H-24 kingdom city"
              value={inputData.address || ""}
              onChange={(e) =>
                setInputData({ ...inputData, address: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5 mt-3 sm:mt-5 lg:mt-[30px]">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-lg text-[var(--gray-2)]">
              Country
            </label>
            {/* <input
            className="form-item mt-[5px] md:mt-[10px]"
            type="text"
            placeholder="United Kingdom"
            value={inputData.country || ""}
            onChange={(e) =>
              setInputData({ ...inputData, country: e.target.value })
            }
            required
          /> */}
            <Selector
              id={"country-selector"}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              // onChange={setCountry}
              onChange={setInputData}
              selectedValue={countryData?.find(
                (option) => option.sortname === inputData?.country?.sortname
              )}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-lg text-[var(--gray-2)]">
              Date Of Birth
            </label>
            <input
              className="form-item mt-[5px] md:mt-[10px]"
              type="date"
              value={inputData.date_of_birth || ""}
              onChange={(e) =>
                setInputData({ ...inputData, date_of_birth: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="w-full mt-3 sm:mt-5 lg:mt-[30px]">
          <span className="text-sm lg:text-lg text-[var(--gray-2)]">
            Upload Profile Photo
          </span>

          <div className="flex items-start gap-[10px] lg:gap-5">
            {/* <div className="px-4 lg:px-5 py-3 mt-[5px] md:mt-[10px] bg-[var(--slate-3)] border"> */}
            <div className="w-full sm:w-1/2">
              <label className="w-full flex flex-col cursor-pointer">
                <div className="w-full flex flex-wrap items-center justify-between gap-5 px-4 lg:px-5 py-3 mt-[5px] md:mt-[10px] bg-[var(--slate-3)] border">
                  <span className="text-[var(--dark)] opacity-70">
                    Upload Photo
                  </span>

                  <svg
                    className="w-6 h-6 text-[var(--secondary)]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="file"
                  className=""
                  accept=".jpg, .png, .JPG, .PNG"
                  // onChange={(e) =>
                  //   setInputData({
                  //     ...inputData,
                  //     profile_image: e.target.files[0],
                  //   })
                  // }

                  onChange={onchangeHandler}
                />
              </label>
            </div>

            <div className="w-[55px] h-12 self-start overflow-hidden mt-[5px] md:mt-[10px]">
              {!isLoading && (
                <Image
                  src={
                    base64String ||
                    (inputData?.profile_image &&
                      imgPath(inputData?.profile_image)) ||
                    avt
                  }
                  alt="profile-photo"
                  className="w-full h-full"
                  width={60}
                  height={60}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="text-[16px] leading-[20px] btn-secondary mt-[30px] lg:mt-[50px] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSuccess}
          >
            Save Profile Info
            {isSuccess && <Spin />}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
