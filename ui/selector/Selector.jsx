import { CountryContext } from "@/context/countryInfoContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

const Selector = ({
  id,
  open,
  //   disabled = false,
  onToggle,
  onChange,
  selectedValue,
}) => {
  const ref = useRef(null);
  const [query, setQuery] = useState("");
  const { isLoading, countryData } = useContext(CountryContext);

  useEffect(() => {
    const mutableRef = ref;

    const handleClickOutside = (event) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target) &&
        open
      ) {
        onToggle();
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, open, onToggle]);

  return (
    <div ref={ref}>
      <div className="country-select mt-[5px] relative">
        <button
          type="button"
          className="relative w-full border"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={onToggle}
        >
          {isLoading ? (
            <span className="flex">loading data...</span>
          ) : (
            <span className="truncate flex items-center gap-1">
              <Image
                height={30}
                width={30}
                alt={`${selectedValue?.name}`}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue?.sortname}.svg`}
                className={"inline mr-2 h-4 rounded-sm"}
              />
              {selectedValue?.name}
            </span>
          )}
          {/* <span
            className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
              disabled ? "hidden" : ""
            }`}
          >
            <svg
              className="h-5 w-5 text-[var(--primary)]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span> */}
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="border absolute z-10 my-1 w-full bg-white text-base sm:text-sm shadow-md"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="sticky top-0 z-10 bg-white">
                <li className="cursor-default select-none relative">
                  <input
                    type="search"
                    name="search"
                    autoComplete={"off"}
                    className="w-full outline-none p-2"
                    placeholder="Search a country"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </li>
                <hr />
              </div>
              <div className="country-list overflow-y-auto">
                {countryData?.filter((country) =>
                  country.name.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="cursor-default select-none relative py-2 px-4">
                    No countries found
                  </li>
                ) : (
                  countryData
                    ?.filter((country) =>
                      country.name.toLowerCase().startsWith(query.toLowerCase())
                    )
                    .map((value, index) => {
                      return (
                        <li
                          key={`${id}-${index}`}
                          className="cursor-pointer select-none relative py-2 px-4 flex items-center gap-1"
                          id="listbox-option-0"
                          // role="option"
                          onClick={() => {
                            //   onChange(value.value);
                            onChange((prev) => ({
                              ...prev,
                              country: value,
                            }));
                            setQuery("");
                            onToggle();
                          }}
                        >
                          <Image
                            height={30}
                            width={30}
                            alt={`${value.name}`}
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value?.sortname}.svg`}
                            className={"inline mr-2 h-4 rounded-sm"}
                          />

                          <span className="font-normal truncate">
                            {value.name}
                          </span>
                          {/* {value.value === selectedValue.value ? (
                          <span className="text-[var(--primary)] absolute inset-y-0 right-0 flex items-center pr-8">
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null} */}
                        </li>
                      );
                    })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Selector;
