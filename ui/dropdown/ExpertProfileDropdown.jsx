"use client";

import useApiCall from "@/hooks/useApiCall";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  BsBoxArrowInRight,
  BsMotherboard,
  BsPersonGear,
  BsToggleOff,
  BsToggleOn,
} from "react-icons/bs";
import avt from "/public/images/avt/avt.jpg";

const ExpertProfileDropdown = ({ logoutHandler }) => {
  const [userInfo, setUserInfo] = useState();
  const { data, fetchData } = useApiCall();
  const [onlineOffLine, setOnlineOffLine] = useState();

  // get cookies
  const token = Cookies.get("token");

  const handleOfflineOnline = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/online_offline`,
        data: {
          online_status: onlineOffLine === 1 ? 0 : 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status == 200) {
        // set active status to localStorage
        localStorage.setItem("active_status", res.data.data);

        setOnlineOffLine(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // get user info from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      //get active state from localStorage
      const active_status = localStorage.getItem("active_status");
      setOnlineOffLine(JSON.parse(active_status) * 1);

      // get user info from localStorage
      const profile = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(profile);
      setUserInfo(userInfo);
    }
  }, []);

  // fetch the user info from api
  useEffect(() => {
    fetchData({
      url: `${process.env.NEXT_PUBLIC_URL}/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data?.expert?.profile_img);

  return (
    <div className="p-1">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="w-10 h-10 rounded-full overflow-hidden border-[5px] dropdown-btn">
          <Image
            src={
              // (userInfo?.profile_photo && imgPath(userInfo?.profile_photo)) ||
              data?.expert?.profile_img || avt
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
              <Link
                className="flex items-center gap-2 py-1"
                href="/expert/dashboard"
              >
                <BsMotherboard className="text-lg" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="flex items-center gap-2 py-1"
                href="/expert/dashboard/profile/step-1"
              >
                <BsPersonGear className="text-lg" />
                <span>Edit Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="flex items-center gap-2 py-1"
                href="/"
                onClick={handleOfflineOnline}
              >
                {onlineOffLine * 1 ? (
                  <BsToggleOn className="text-lg text-[var(--secondary)]" />
                ) : (
                  <BsToggleOff className="text-lg" />
                )}
                <span>Active Status</span>
              </Link>
            </Menu.Item>
            <hr className="mt-3" />
            <Menu.Item>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 text-center py-1 mt-2"
                onClick={logoutHandler}
              >
                <BsBoxArrowInRight className="text-lg" />
                Logout
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ExpertProfileDropdown;
