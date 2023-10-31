"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function Dropdown({ title, items, clss = "py-3 px-6" }) {
  return (
    <div className={clss}>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full items-center justify-center gap-1 rounded-md">
          {title}
          <BsChevronDown
            className="ml-2 -mr-1 h-5 w-5 text-white mt-1"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          // enter="transition ease-out duration-100"
          // enterFrom="transform opacity-0 scale-95"
          // enterTo="transform opacity-100 scale-100"
          // leave="transition ease-in duration-75"
          // leaveFrom="transform opacity-100 scale-100"
          // leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 origin-top-right text-white dropdown-items">
            {items?.slice(2).map(({ id, name }) => (
              <Menu.Item key={id}>
                <Link className="flex" href="/">
                  {name}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
