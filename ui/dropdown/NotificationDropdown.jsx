"use client";

import useApiCall from "@/hooks/useApiCall";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import NotFound from "@/ui/notFound/NotFound";
import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { BsBell } from "react-icons/bs";

const NotificationDropdown = () => {
  const [userInfo, setUserInfo] = useState();
  const { data, fetchData, error, isLoading } = useApiCall();

  // get cookies
  const token = Cookies.get("token");

  // get user info from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // get user info from localStorage
      const profile = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(profile);
      setUserInfo(userInfo);
    }
  }, []);

  // fetch the user info from api
  useEffect(() => {
    fetchData({
      url: `${process.env.NEXT_PUBLIC_URL}/notifications?limit=10&user_type=expert&notification_type=1`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide what to render
  let content = "";

  // error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  } else if (isLoading === true && data === null) {
    // loading and empty data check
    content = <FallingLinesAnimation clss={"h-auto sm:h-[200px]"} />;
  } else if (data.length === 0) {
    content = <NotFound clss="text-white" />;
  } else {
    content = data.map((itm) => {
      const { id, title, conversation } = itm;
      return (
        <Menu.Item key={id}>
          <div className="ms-2.5 py-2 border-b last:border-b-0">
            <span className="block">{title}</span>
            <span className="block text-xs text-[var(--gray-2)]">
              {conversation.description}
            </span>
          </div>
        </Menu.Item>
      );
    });
  }

  return (
    <div className="p-1">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center gap-1 text-white">
          <span className="relative">
            <BsBell className="text-xl" />
          </span>
          <span>Notification</span>
        </Menu.Button>

        <Transition as={Fragment}>
          {/* dropdown-items */}
          <Menu.Items className="!min-w-[250px] max-h-[320px] md:max-h-[420px] overflow-y-auto notification absolute top-10 sm:top-7 -right-16 sm:-right-10 text-white p-2 rounded-md shadow-2xl profile-dropdown border border-r-0">
            {content}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NotificationDropdown;
