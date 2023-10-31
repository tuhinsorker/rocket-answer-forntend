"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Spin from "@/ui/spin/Spin";
import { errorAlert, successAlert } from "@/utils/alerts";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
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
    doc_type_id: "",
    doc_number: "",
    doc_valid_date: "",
    doc_path: "",
  },
];

const StepFourMain = ({ readOnly = false, handleStep }) => {
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
      doc_type_id: "",
      doc_number: "",
      doc_valid_date: "",
      doc_path: "",
    };

    setInputData((prev) => [...prev, newItm]);
  };

  // handle remove new input fields
  const handleRemoveOne = (id) => {
    const filterItm = inputData.filter((itm) => itm.itmId !== id);

    setInputData(filterItm);
  };

  /**
   * Handle the selection of an image file and update the input data with the image data.
   *
   * This function takes an `event`, `id`, and `name` as arguments. It reads the selected image
   * file from the event, processes it, and updates the `inputData` state by setting the specified
   * `name` property to the image data (base64-encoded) for the item with the matching `id`.
   *
   * @param {Event} event - The event object containing information about the selected file.
   * @param {number} id - The unique identifier of the item to be updated with the image data.
   * @param {string} name - The name of the property to be updated with the image data.
   */
  const onchangePhotoHandler = (event, id, name) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create a new array based on the current `inputData` state
        const changedPhoto = inputData.map((itm) => {
          const itmId = itm.id ?? itm.itmId;

          if (itmId * 1 === id * 1) {
            return { ...itm, [name]: reader.result };
          }

          return itm;
        });

        // Update the `inputData` state with the new array
        setInputData(changedPhoto);
      };
      reader.readAsDataURL(file);
    }
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

    const newInputData = inputData.map((itm) => {
      //base 64 uri pattern
      const base64DataUriPattern =
        /^data:[a-zA-Z0-9\/+]+;base64,([a-zA-Z0-9/+=]+)$/;

      // check base 64 uri pattern
      const checkBase64Data = base64DataUriPattern.test(itm.doc_path);

      return { ...itm, doc_path: !checkBase64Data ? "" : itm.doc_path };
    });

    const data = {
      // expert_document: inputData,
      expert_document: newInputData,
    };

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/update_expert_document`,
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

        successAlert("Good job!", "Licenses & Certification save successfully");

        //redirect to
        // router.replace("/expert/dashboard/profile/step-2");
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
    if (!isProfileLoading && profileData?.expert?.documents?.length !== 0) {
      setInputData(profileData.expert.documents);
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
        className="flex flex-col gap-5 sm:gap-10 lg:gap-14 border px-2 md:px-5 py-[30px] md:py-10 rounded mt-5 md::mt-[30px]"
        onSubmit={oneSubmitHandler}
      >
        {inputData.map((itm, i) => (
          <div key={i} className="flex flex-col gap-[10px] sm:gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl">License & Certification {i + 1}</h3>
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
                  Education
                </label>
                <select
                  className="form-item mt-[5px]"
                  name="doc_type_id"
                  value={itm.doc_type_id || ""}
                  onChange={(e) =>
                    onchangeHandler(
                      itm.id ?? itm.itmId,
                      e.target.name,
                      e.target.value
                    )
                  }
                  disabled={readOnly}
                >
                  <option value={1}>Education</option>
                  <option value={2}>Certificate</option>
                </select>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
                  Upload Document
                </label>
                {!readOnly && (
                  <label className="w-full flex flex-col cursor-pointer">
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
                      name="doc_path"
                      onChange={(e) =>
                        onchangePhotoHandler(
                          e,
                          itm.id ?? itm.itmId,
                          e.target.name
                        )
                      }
                    />
                  </label>
                )}
                {itm?.path && (
                  <div className="w-[100px] h-[30px] overflow-hidden mt-[5px]">
                    <Image src={itm.path} alt="img" width={100} height={30} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-[10px] lg:gap-5">
              <div className="w-full sm:w-1/2">
                <label className="text-sm lg:text-base leading-5 text-[var(--gray-2)]">
                  Document Number
                </label>
                <input
                  className="form-item mt-[5px]"
                  type="number"
                  placeholder="Document Number"
                  name="doc_number"
                  value={itm.doc_number || ""}
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
                  Start Form
                </label>
                <input
                  className="form-item mt-[5px]"
                  type="date"
                  placeholder="Start Form"
                  name="doc_valid_date"
                  value={itm.doc_valid_date || ""}
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
                href="/expert/dashboard/profile/step-2"
                className="text-[16px] leading-[20px] btn-primary"
              >
                Previous
              </Link>
              <button
                type="submit"
                className="text-[16px] leading-[20px] btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSuccess}
              >
                Save Profile
                {isSuccess && <Spin />}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-end gap-5 mt-[10px]">
            <span
              className="text-[16px] leading-[20px] btn-primary cursor-pointer"
              onClick={() => handleStep(3)}
            >
              Previous
            </span>
          </div>
        )}
      </form>
    );
  }

  return (
    <section className="py-5 md:py-10 px-3 2xl:px-0 bg-[var(--slate)]">
      <div className="max-w-[1296px] mx-auto border rounded shadow p-3 md:p-10 bg-white">
        <StepLine title="Basic Form" active="step-4" />

        {content}
      </div>
    </section>
  );
};

export default StepFourMain;
