"use client";

import useApiCall from "@/hooks/useApiCall";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Error from "../error/Error";
import FallingLinesAnimation from "../fallingLinesAnimation/FallingLinesAnimation";

const LargeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { error, isLoading, data, fetchData } = useApiCall();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/expertCategories`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // loading and empty data check
  if (isLoading === true && data === null) {
    content = <FallingLinesAnimation />;
  }

  // render final data
  if (data !== null) {
    content = (
      <ul>
        {data.map(({ name, id }) => {
          const makeUrl = name.toLowerCase().split(" ").join("_");

          return (
            <li key={id}>
              <Link
                href={`/category/${makeUrl}?categoryId=${id}`}
                className="block px-4 py-1 text-white bg-opacity-70"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="relative">
      {/* Dropdown toggle button */}
      <button
        className="flex items-center justify-center gap-1 bg-[var(--secondary)] py-3 px-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        More <BsChevronDown className="mt-1" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="more-dropdown-wrapper w-[700px] absolute bg-[var(--secondary)] shadow-md pt-5 pb-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-base">
            <h5>Car categories</h5>
            {/* content here */}
            {content}
          </div>
          <div className="text-base border-t mt-[30px] py-1">
            <h5>Car categories</h5>
            {/* content here */}
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default LargeDropdown;
