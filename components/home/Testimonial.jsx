"use client";

import { HomeContext } from "@/context/homeContext";
import Modal from "@/ui/modal/Modal";
import { useContext, useEffect, useState } from "react";
import ReviewSlider from "../carouselSliders/ReviewSlider";

const Testimonial = () => {
  const { data } = useContext(HomeContext);
  const { testimonial_head_description, testimonial_head_text } = data;

  // Show more modal
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const handleOpenModal = (content) => {
    setModalData(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const body = document.body;

    if (showModal) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [showModal]);

  return (
    <>
      <Modal showModal={showModal} onClose={handleCloseModal}>
        <div className="w-full sm:w-1/2 bg-white p-10 mx-auto relative">
          <p className="text-sm lg:text-base left-4 lg:leading-5 text-[var(--gray)] font-medium text-justify">
            {modalData}
          </p>

          <button
            className="absolute -top-10 right-0 text-white text-4xl"
            onClick={handleCloseModal}
          >
            &times;
          </button>
        </div>
      </Modal>

      <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
        <div className="max-w-[1296px] mx-auto">
          <div className="text-center">
            <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] text-[var(--primary)] font-bold">
              {testimonial_head_text}
            </h3>
            <p className="text-base leading-5 w-auto sm:w-[58ch] text-[var(--gray)] inline-block mt-3 md:mt-5">
              {testimonial_head_description}
            </p>
          </div>

          <div className="mt-0 lg:mt-[20px]">
            {/* Review Slider Here */}
            <ReviewSlider
              setModalData={setModalData}
              handleOpenModal={handleOpenModal}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
