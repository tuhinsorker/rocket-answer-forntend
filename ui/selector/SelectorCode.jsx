import { CountryContext } from "@/context/countryInfoContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

const SelectorCode = ({
  id,
  open,
  //   disabled = false,
  onToggle,
  onChange,
  selectedValue,
  clss = "mt-[5px]",
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
    <div ref={ref} className={clss}>
      <div className="country-select relative">
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
              {/* <Image
                height={30}
                width={30}
                alt={`${selectedValue?.name}`}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue?.sortname}.svg`}
                className={"inline mr-2 h-4 rounded-sm"}
              /> */}
              {selectedValue?.phonecode}
            </span>
          )}
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
                              code: value?.phonecode,
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
                            {value.phonecode}
                          </span>
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

export default SelectorCode;
