import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsCheck2, BsChevronDown } from "react-icons/bs";

const Select = ({ data, handleCategory, category_id, readOnly = false }) => {
  const [selected, setSelected] = useState(data[0]);

  useEffect(() => {
    handleCategory(selected.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // set category by category_id
  useEffect(() => {
    if (category_id) {
      const fin = data.find((c) => c.id === category_id);
      setSelected(fin);
    }
  }, [category_id, data]);

  return (
    <div className="w-full z-10">
      {readOnly ? (
        <input
          className="form-item"
          type="text"
          value={selected.name || ""}
          readOnly={readOnly}
          disabled={readOnly}
        />
      ) : (
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default text-base leading-5 text-[var(--dark)] bg-[var(--slate-3)] px-4 lg:px-5 py-3 focus:border-[var(--secondary)] transition-all duration-500 border">
              <span className="block truncate text-left">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                {data?.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-[var(--secondary)] text-white"
                          : "text-[var(--dark)]"
                      }`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {category.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--dark)]">
                            <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
};

export default Select;
