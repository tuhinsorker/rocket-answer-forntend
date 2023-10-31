"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Spin from "@/ui/spin/Spin";
import { errorAlert, successAlert } from "@/utils/alerts";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import StepLine from "../StepLine";

// initial state
const initialState = [
  {
    itmId: Date.now(),
    id: null,
    degree: "",
    pass_year: "",
    institute_name: "",
  },
];

const StepTwoMain = ({ readOnly = false, handleStep }) => {
  const [inputData, setInputData] = useState(initialState);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const {
    error: profileError,
    data: profileData,
    fetchData: fetchProfileData,
    isLoading: isProfileLoading,
  } = useApiCall();

  // get token
  const token = Cookies.get("token");

  // handle add new input fields
  const handleAddAnother = () => {
    const newItm = {
      itmId: Date.now(),
      id: null,
      degree: "",
      pass_year: "",
      institute_name: "",
    };

    setInputData((prev) => [...prev, newItm]);
  };

  // handle remove new input fields
  const handleRemoveOne = (id) => {
    const filterItm = inputData.filter((itm) => itm.itmId !== id);

    setInputData(filterItm);
  };

  /**
   * Update the input data with a modified property value.
   *
   * This function takes an `id`, `name`, and `text` as arguments and updates the `inputData` state
   * by creating a new array where the property with the given `name` is modified for the item
   * with the matching `id`. The function returns a new state array with the update applied.
   *
   * @param {number} id - The unique identifier of the item to be updated.
   * @param {string} name - The name of the property to be modified.
   * @param {string} text - The new value to set for the specified property.
   */
  const onchangeHandler = (id, name, text) => {
    // Create a new array based on the current `inputData` state
    const changedInputData = inputData.map((itm) => {
      const itmId = itm.id ?? itm.itmId;

      if (itmId * 1 === id * 1) {
        return { ...itm, [name]: text };
      }

      return itm;
    });

    // Update the `inputData` state with the new array
    setInputData(changedInputData);
  };

  // handle onsubmit Handler
  const oneSubmitHandler = async (e) => {
    e.preventDefault();

    setIsSuccess(true);

    const data = {
      expert_educations: inputData,
    };

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/update_expert_education`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Education information save successfully");

        //redirect to
        router.replace("/expert/dashboard/profile/step-3");
      }
    } catch (error) {
      /**
       * Display a `errorAlert` message.
       *
       * @param {string} title - The title of the error alert.
       * @param {string} text - The text to display in the error alert.
       */
      errorAlert("Error!", error.response.data.message);

      // error console log
      console.error("There wan an error occurred", error.message);
    } finally {
      setIsSuccess(false);
    }
  };

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

  // @if find profileData the set to state
  useEffect(() => {
    if (!isProfileLoading && profileData?.expert?.educations?.length !== 0) {
      setInputData(profileData.expert.educations);
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
        {inputData.map((itm, i) => (
          <div key={i} className="flex flex-col gap-[10px] sm:gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl">Certificate {i + 1}</h3>
              {itm.itmId && inputData.length > 1 && (
                <span
                  className="cursor-pointer"
                  onClick={() => handleRemoveOne(itm.itmId)}
                >
                  <BsXLg />
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
              <div className="w-full sm:w-1/2">
                <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
                  Degree
                </label>
                <input
                  className="form-item mt-[5px]"
                  type="text"
                  placeholder="M.s.c"
                  name="degree"
                  value={itm.degree || ""}
                  onChange={(e) =>
                    onchangeHandler(
                      itm.id ?? itm.itmId,
                      e.target.name,
                      e.target.value
                    )
                  }
                  required
                  readOnly={readOnly}
                  disabled={readOnly}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
                  Passing Year
                </label>
                <input
                  className="form-item mt-[5px]"
                  type="number"
                  placeholder="2021"
                  name="pass_year"
                  value={itm.pass_year || ""}
                  onChange={(e) =>
                    onchangeHandler(
                      itm.id ?? itm.itmId,
                      e.target.name,
                      e.target.value
                    )
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
                  Institute Name
                </label>
                <input
                  className="form-item mt-[5px]"
                  type="text"
                  placeholder="Kingdom University"
                  name="institute_name"
                  value={itm.institute_name || ""}
                  onChange={(e) =>
                    onchangeHandler(
                      itm.id ?? itm.itmId,
                      e.target.name,
                      e.target.value
                    )
                  }
                  required
                  readOnly={readOnly}
                  disabled={readOnly}
                />
              </div>
            </div>
          </div>
        ))}

        {!readOnly ? (
          <div className="flex flex-wrap items-center justify-between gap-5 mt-[10px]">
            <span
              className="flex items-center gap-2 cursor-pointer border border-[var(--secondary)] px-5 py-2 text-[var(--dark)]"
              onClick={handleAddAnother}
            >
              <BsPlusLg className="text-[var(--dark)]" />
              Add Another
            </span>

            <div className="flex items-center justify-end gap-2">
              <Link
                href="/expert/dashboard/profile/step-1"
                className="text-[16px] leading-[20px] btn-primary"
              >
                Previous
              </Link>
              <button
                type="submit"
                className="text-[16px] leading-[20px] btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSuccess}
              >
                Next
                {isSuccess && <Spin />}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-end gap-5 mt-[10px]">
            <span
              className="text-[16px] leading-[20px] btn-primary cursor-pointer"
              onClick={() => handleStep(1)}
            >
              Previous
            </span>
            <span
              className="text-[16px] leading-[20px] btn-primary cursor-pointer"
              onClick={() => handleStep(3)}
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
        {/* step line here */}
        <StepLine title="Basic Form" active="step-2" />

        {content}
      </div>
    </section>
  );
};

export default StepTwoMain;
