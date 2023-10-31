"use client";

import useApiCall from "@/hooks/useApiCall";
import imgPath from "@/utils/imgPath";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsTextRight } from "react-icons/bs";
import avt from "/public/images/avt/avt.jpg";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(true);
  const { isLoading, data, fetchData } = useApiCall();

  // active item check
  const activeItem = (itm) => {
    return pathname === `/${itm}`;
    // return pathname.split("/")?.includes(itm);
  };

  const logoutHandler = () => {
    // remove token from cookies
    Cookies.remove("token");

    // redirectTo home page
    router.replace("/sign-in");
  };

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
    <div className="w-full h-auto sm:min-h-[500px] sm:w-4/12 lg:w-3/12 bg-[var(--slate-3)] relative">
      {/* Profile Info   */}
      <div className="flex items-center justify-between sm:justify-center bg-[var(--primary)] py-3 px-3">
        {!isLoading && (
          <div className="flex items-center justify-center gap-5">
            <Image
              src={data?.customer?.image ? imgPath(data?.customer?.image) : avt}
              alt="user_avt"
              className="w-12 h-12 rounded-full"
              width={50}
              height={50}
            />
            <h4 className="text-xl text-white font-medium">{data?.name}</h4>
          </div>
        )}

        <div
          className="text-white text-2xl p-1 border border-[var(--secondary)] rounded block sm:hidden"
          onClick={() => setActive(!active)}
        >
          <BsTextRight />
        </div>
      </div>

      <ul
        className={`flex flex-col mt-0 sm:mt-10 lg:mt-[60px] absolute top-20 left-0 w-full bg-inherit z-10 sm:z-0 ${
          active
            ? "h-0 sm:h-auto overflow-hidden"
            : "h-[340px] py-[30px] shadow-xl overflow-y-auto"
        } transition-all delay-150 duration-300`}
      >
        {[
          ["Dashboard", "dashboard"],
          ["Rocket Board", "dashboard/board"],
          // ["Membership", "membership"],
          ["Membership", "/"],
          ["Balance Summary", "dashboard/balance-summary"],
          ["Consultant History", "dashboard/consultant-history"],
          [" My Account", "dashboard/my-account"],
        ].map(([itm, url], i) => (
          <li
            key={i}
            className={`text-lg leading-6 text-[var(--primary)] font-medium ps-10 py-3 border-b hover:active ${
              // url == pathname && "active"
              activeItem(url) && "active"
            }`}
          >
            <Link href={`/${url}`} className="block">
              {itm}
            </Link>
          </li>
        ))}
        <li className="text-lg leading-6 text-[var(--primary)] font-medium ps-10 py-3 border-b hover:active">
          <button className="w-full text-start" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
