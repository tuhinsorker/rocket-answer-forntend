"use client";

import { CountryContext } from "@/context/countryInfoContext";
import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Select from "@/ui/select/Select";
import Selector from "@/ui/selector/Selector";
import SelectorCode from "@/ui/selector/SelectorCode";
import Spin from "@/ui/spin/Spin";
import { errorAlert, successAlert } from "@/utils/alerts";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import StepLine from "../StepLine";

const StepOneMain = ({ readOnly = false, handleStep }) => {
  const { countryData } = useContext(CountryContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data, fetchData, isLoading } = useApiCall();
  const router = useRouter();
  const {
    error: profileError,
    data: profileData,
    fetchData: fetchProfileData,
    isLoading: isProfileLoading,
  } = useApiCall();
  // input form data
  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
    category_id: "",
    sub_category_id: "",
    code: 880,
    phone: "",
    email: "",
    paypal_email: "",
    address: "",
    state: "",
    gender: 0,
    zip_code: "",
    country: {
      id: 18,
      sortname: "BD",
      name: "Bangladesh",
      phonecode: 880,
    },
    dob: "",
    profile_photo_url: "",
  });

  // get token
  const token = Cookies.get("token");

  // handle category change
  const handleCategory = (category_id) => {
    setInputData({ ...inputData, category_id });
  };

  // input change handler
  const onchangeHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setBase64String(reader.result);
        setInputData({ ...inputData, profile_photo_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // handle onsubmit Handler
  const oneSubmitHandler = async (e) => {
    e.preventDefault();

    setIsSuccess(true);

    const {
      category_id,
      sub_category_id,
      dob,
      zip_code,
      state,
      country,
      first_name,
      last_name,
      gender,
      email,
      phone,
      code,
      paypal_email,
      address,
      profile_photo_url,
    } = inputData;

    //base 64 uri pattern
    const base64DataUriPattern =
      /^data:[a-zA-Z0-9\/+]+;base64,([a-zA-Z0-9/+=]+)$/;

    // check base 64 uri pattern
    const checkBase64Data = base64DataUriPattern.test(profile_photo_url);

    const profileData = {
      category_id: category_id.toString(),
      sub_category_id,
      dob,
      zip_code,
      state,
      country_id: country.id * 1,
      iso_doce: "",
      first_name,
      last_name,
      gender: gender * 1,
      expert_in_bio: "kjllnn",
      display_name: first_name,
      email,
      phone_code: code.toString(),
      phone,
      paypal_email,
      address,
      profile_photo_url_old: "",
      profile_photo_url: !checkBase64Data ? "" : profile_photo_url,
    };

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/update_expert_info`,
        data: profileData,
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

        //redirect to
        router.replace("/expert/dashboard/profile/step-2");
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

  // fetch expert category data from API
  useEffect(() => {
    fetchData(`${process.env.NEXT_PUBLIC_URL}/expert_categories`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch expert profile data from API
  useEffect(() => {
    fetchProfileData({
      url: `${process.env.NEXT_PUBLIC_URL}/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isProfileLoading && profileData !== null) {
      const {
        last_name,
        first_name,
        category_id,
        email,
        phone,
        paypal_email,
        address,
        zip_code,
        state,
        gender,
        phone_code,
        dob,
        profile_photo_url,
        country,
        profile_img,
      } = profileData.expert;

      setInputData({
        first_name,
        last_name,
        category_id,
        sub_category_id: "",
        code: phone_code * 1 || 880,
        phone,
        email,
        paypal_email,
        address,
        state,
        gender,
        zip_code,
        country: {
          id: country?.id || 18,
          sortname: country?.sortname || "BD",
          name: country?.name || "Bangladesh",
          phonecode: country?.phonecode || 880,
        },
        dob,
        profile_photo_url,
        profile_img,
      });
    }
  }, [isProfileLoading, profileData]);

  // decide what to render
  let content = "";

  // error check
  if (profileError !== null) {
    content = <Error message={profileError?.message} />;
  } else if (isProfileLoading) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-auto sm:h-[200px]"} />;
  } else {
    content = (
      <form
        className="flex flex-col gap-[10px] sm:gap-5 lg:gap-[30px] border px-2 md:px-5 py-[30px] md:py-10 rounded mt-5 md::mt-[30px]"
        onSubmit={oneSubmitHandler}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              First Name
            </label>
            <input
              className="form-item mt-[5px]"
              type="text"
              placeholder="First Name"
              value={inputData.first_name || ""}
              onChange={(e) =>
                setInputData({ ...inputData, first_name: e.target.value })
              }
              required
              readOnly={readOnly}
              disabled={readOnly}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Last Name
            </label>
            <input
              className="form-item mt-[5px]"
              type="text"
              placeholder="Last Name"
              value={inputData.last_name || ""}
              onChange={(e) =>
                setInputData({ ...inputData, last_name: e.target.value })
              }
              required
              readOnly={readOnly}
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Category
            </label>
            {/* select category */}
            {isLoading || !data ? (
              <FallingLinesAnimation clss="h-5" />
            ) : (
              <div className="mt-[5px]">
                <Select
                  readOnly={readOnly}
                  data={data}
                  handleCategory={handleCategory}
                  category_id={profileData.expert.category_id}
                />
              </div>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Sub-Category
            </label>
            <input
              className="form-item mt-[5px]"
              type="text"
              placeholder="Sub-Category"
              readOnly={readOnly}
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Email
            </label>
            <input
              className="form-item mt-[5px]"
              type="email"
              placeholder="Email"
              value={inputData.email || ""}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
              readOnly={readOnly}
              disabled={readOnly}
              required
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Phone Number
            </label>
            <div className="flex items-center mt-[5px]">
              {readOnly ? (
                <input
                  className="form-item w-1/4"
                  type="number"
                  defaultValue={inputData?.code || ""}
                  readOnly={readOnly}
                  disabled={readOnly}
                />
              ) : (
                <SelectorCode
                  id={"country-code"}
                  open={isCode}
                  onToggle={() => setIsCode(!isCode)}
                  // onChange={setCountry}
                  onChange={setInputData}
                  selectedValue={countryData?.find(
                    (option) => option.phonecode === inputData?.code
                  )}
                  clss="w-1/4"
                />
              )}

              <input
                className="form-item w-3/4"
                type="number"
                placeholder="Phone number"
                value={inputData.phone || ""}
                onChange={(e) =>
                  setInputData({ ...inputData, phone: e.target.value })
                }
                readOnly={readOnly}
                disabled={readOnly}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Paypal Email
            </label>
            <input
              className="form-item mt-[5px]"
              type="email"
              placeholder="Paypal Email"
              value={inputData.paypal_email || ""}
              onChange={(e) =>
                setInputData({ ...inputData, paypal_email: e.target.value })
              }
              readOnly={readOnly}
              disabled={readOnly}
              required
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Address
            </label>
            <input
              className="form-item mt-[5px]"
              type="text"
              placeholder="Address"
              value={inputData.address || ""}
              onChange={(e) =>
                setInputData({ ...inputData, address: e.target.value })
              }
              readOnly={readOnly}
              disabled={readOnly}
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Date Of Birth
            </label>
            <input
              className="form-item mt-[5px]"
              type="date"
              placeholder="Date Of Birth"
              value={inputData.dob || ""}
              onChange={(e) =>
                setInputData({ ...inputData, dob: e.target.value })
              }
              readOnly={readOnly}
              disabled={readOnly}
              required
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Country
            </label>

            {readOnly ? (
              <input
                className="form-item mt-[5px]"
                type="text"
                defaultValue={inputData?.country?.sortname || ""}
                readOnly={readOnly}
                disabled={readOnly}
              />
            ) : (
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
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              State
            </label>
            <input
              className="form-item mt-[5px]"
              type="text"
              placeholder="State"
              value={inputData.state || ""}
              onChange={(e) =>
                setInputData({ ...inputData, state: e.target.value })
              }
              required
              readOnly={readOnly}
              disabled={readOnly}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Zip Code
            </label>
            <input
              className="form-item mt-[5px]"
              type="number"
              placeholder="Zip Code"
              value={inputData.zip_code || ""}
              onChange={(e) =>
                setInputData({ ...inputData, zip_code: e.target.value })
              }
              required
              readOnly={readOnly}
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Gander
            </label>

            <select
              className="form-item mt-[5px]"
              value={inputData.gender || 0}
              onChange={(e) =>
                setInputData({ ...inputData, gender: e.target.value * 1 })
              }
              disabled={readOnly}
            >
              <option value="0" defaultValue>
                ----Select Gender----
              </option>
              <option value={1}>Male</option>
              <option value={2}>Female</option>
              <option value={3}>Other</option>
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
              Photo
            </label>
            <label className="w-full flex flex-col cursor-pointer">
              {!readOnly && (
                <>
                  <div className="w-full flex flex-wrap items-center justify-between gap-5 px-4 lg:px-5 py-3 mt-[5px] bg-[var(--slate-3)] border">
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
                    accept=".jpg, .png, .JPG, .PNG"
                    onChange={onchangeHandler}
                    required
                  />
                </>
              )}
              {inputData?.profile_img && (
                <div className="w-[100px] h-[40px] overflow-hidden mt-[5px]">
                  <Image
                    src={inputData.profile_img}
                    alt="img"
                    width={100}
                    height={40}
                  />
                </div>
              )}
            </label>
          </div>
        </div>

        {!readOnly ? (
          <div className="flex items-center justify-end gap-2 mt-[10px]">
            <button
              type="submit"
              className="text-[16px] leading-[20px] btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSuccess}
            >
              Next
              {isSuccess && <Spin />}
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-end gap-5 mt-[10px]">
            <span
              className="text-[16px] leading-[20px] btn-primary cursor-pointer"
              onClick={() => handleStep(2)}
            >
              Next
            </span>
          </div>
        )}
      </form>
    );
  }

  return (
    <section className="py-5 md:py-10 px-3 2xl:px-0 bg-[var(--slate)]">
      <div className="max-w-[1296px] mx-auto border rounded shadow p-3 md:p-10 bg-white">
        <StepLine title="Basic Form" active="step-1" />

        {content}
      </div>
    </section>
  );
};

export default StepOneMain;
