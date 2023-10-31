"use client";

import { HomeContext } from "@/context/homeContext";
import useApiCall from "@/hooks/useApiCall";
import imgPath from "@/utils/imgPath";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import CategorySlider from "../carouselSliders/CategorySlider";

const Banner = () => {
  // search input text
  const [inputText, setInputText] = useState("");

  // store the search category
  const [getSearchItm, setGetSearchItm] = useState("doctor");

  const { data: landingPageData } = useContext(HomeContext);
  const { head_text, head_description, head_button_text, head_bg_img } =
    landingPageData;

  // use api hook
  const { error, data, isLoading, fetchData } = useApiCall();

  // get the typing element
  const el = useRef(null);

  // get the category name
  const category = data?.map((c) => c.name);

  // search by the category
  function searchByCategory(query) {
    // set the default category
    const defaultCategory = "doctors";
    const defaultCategory1 = data[0];

    // set the input text
    setInputText(query);

    // Convert the query to lowercase for case-insensitive searching
    const lowerCaseQuery = query.toLowerCase();

    // Filter the category array to find matches
    const matchCategory = category.filter((category) =>
      category.toLowerCase().includes(lowerCaseQuery)
    );

    const c = data?.filter((c) =>
      c?.name.toLowerCase().includes(lowerCaseQuery)
    );

    // const url = `${c[0].name}/${c[0].id}`;

    // console.log(url);

    // Set the matching category to the state
    setGetSearchItm(c.length === 0 ? defaultCategory1 : c[0]);
  }

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Ask doctors...", "Ask lawyers..."],
      typeSpeed: 60,
      backSpeed: 60,
      loop: true,
      attr: "placeholder",
      bindInputFocusEvents: true,
      cursorChar: "",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  // fetch the category data from the API
  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/expertCategories`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      // home-banner md:pt-[150px]
      className="pt-10 sm:pt-[60px] md:pt-[75px] pb-[60px] md:pb-[75px] relative"
      style={{
        backgroundImage: `url("${imgPath(head_bg_img)}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-[var(--primary)] opacity-60"></div>
      {/* <div className="max-w-[1296px] m-auto flex flex-col sm:flex-row items-center sm:items-start px-3 2xl:px-0 relative z-[1]"> */}
      <div className="max-w-[1296px] m-auto flex flex-col sm:flex-row items-center px-3 2xl:px-0 relative z-[1]">
        <div className="w-full sm:w-7/12 lg:w-7/12 mt-5 sm:mt-0 order-1 sm:order-0">
          <div className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] text-white">
            <h1 className="text-4xl lg:text-[45px] leading-[43px] lg:leading-[54px] font-bold text-white">
              {head_text}
            </h1>
            <p className="text-base leading-5 mt-3 lg:mt-5">
              {head_description}
            </p>

            {/* Get an Answer */}
            {/* <Link
              href="/"
              className="inline-flex items-center justify-center text-base lg:text-xl leading-5 lg:leading-6 font-semibold btn-secondary mt-[30px] lg:mt-10"
            >
              {head_button_text}
            </Link> */}
          </div>
        </div>

        {/* chat box here */}
        <div className="w-[300px] mt-5 sm:mt-0 order-0 sm:order-1">
          <div className="bg-[var(--secondary-light)] text-white p-1 lg:p-2">
            <CategorySlider data={data} error={error} isLoading={isLoading} />
          </div>

          {/* This is the chat div */}
          <div className="h-[270px] bg-white rounded-b-md shadow-2xl">
            <form className="h-full grid gap-5 content-between p-5">
              <div className="bg-white h-[150px]">
                <textarea
                  className="w-full h-full outline-none border-0 resize-none"
                  name="message"
                  ref={el}
                  required
                  onChange={(e) => searchByCategory(e.target.value)}
                  value={inputText}
                ></textarea>
              </div>
              <div className="block">
                <Link
                  href={`/pay-for-consultancy?category_name=${getSearchItm?.name?.toLocaleLowerCase()}&category_id=${
                    getSearchItm?.id
                  }`}
                  className={`block text-center text-base leading-5 btn-secondary-light rounded ${
                    !inputText && " pointer-events-none opacity-40"
                  }
                  `}
                >
                  Ask
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
