"use client";

import useApiCall from "@/hooks/useApiCall";
import imgPath from "@/utils/imgPath";
import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import avt from "/public/images/avt/avt.jpg";

const ProfileDropdown = ({ logoutHandler }) => {
  const { data, fetchData } = useApiCall();

  // get cookies
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      fetchData({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="p-1">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="w-10 h-10 rounded-full  overflow-hidden border-[5px] dropdown-btn">
          <Image
            src={
              (data?.customer?.image && imgPath(data?.customer?.image)) || avt
            }
            alt="profile-photo"
            className="w-full h-full"
            width={40}
            height={40}
          />
        </Menu.Button>

        <Transition as={Fragment}>
          {/* dropdown-items */}
          {/* <Menu.Items className="absolute right-0 md:left-0 text-white py-2 rounded-md shadow-2xl profile-dropdown"> */}
          <Menu.Items className="absolute right-0 text-white py-2 rounded-md shadow-2xl profile-dropdown border">
            <Menu.Item>
              <Link className="flex py-1" href="/dashboard/my-account">
                My Account
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link className="flex py-1" href="/dashboard/consultant-history">
                Consultant History
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link className="flex py-1" href="/dashboard/billing">
                Billing Summary
              </Link>
            </Menu.Item>
            <hr className="mt-3" />
            <Menu.Item>
              <button
                type="button"
                className="w-full text-center py-1 mt-2"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
