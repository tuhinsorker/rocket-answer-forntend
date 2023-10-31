"use client";

import ExpertProfileDropdown from "@/ui/dropdown/ExpertProfileDropdown";
import NotificationDropdown from "@/ui/dropdown/NotificationDropdown";
import tokenCheck from "@/utils/tokenCheck";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import logo from "/public/images/logos/logo_expert.png";
import mobile_logo from "/public/images/logos/mobile-logo.png";

const ExpertDashboardNavbar = () => {
  const [show, setShow] = useState(false);
  const [validateToken, setValidateToken] = useState(null);
  const pathName = usePathname();
  const router = useRouter();

  // get cookies
  const token = Cookies.get("token");

  // check media queries for mobile
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const logoutHandler = () => {
    // remove token from cookies
    Cookies.remove("token");

    // remove user type from cookies
    Cookies.remove("userType");

    // remove userInfo from local storage
    localStorage.removeItem("userInfo");

    // remove active_status from local storage
    localStorage.removeItem("active_status");

    // redirectTo home page
    router.replace("/");

    // set isValidToken
    setValidateToken(null);

    // mobile nab bar hidden
    setShow(false);
  };

  useEffect(() => {
    const body = document.body;

    if (show) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [show]);

  // resolve the token check
  useEffect(() => {
    const resolver = async () => {
      try {
        const isValidToken = await tokenCheck(token);

        // set isValidToken
        setValidateToken(isValidToken);
      } catch (error) {
        // log error message
        console.error(
          "An error occurred while checking the token:",
          error.message
        );
      }
    };

    resolver();
  }, [pathName, token]);

  return (
    <Fragment>
      <nav className="w-full py-3 sm:py-6 px-3 2xl:px-0 bg-[var(--primary)]">
        {/* navbar brand */}
        <div className="max-w-[1296px] m-auto flex items-center justify-between pb-5">
          <div className="flex items-center cursor-pointer">
            <Link href="/">
              <Image
                src={logo}
                alt="Nav Bar Brand"
                className="hidden lg:block"
              />
              <Image
                src={mobile_logo}
                alt="Nav Bar Brand"
                className="block lg:hidden"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3 xl:gap-[32px]">
            <NotificationDropdown />
            {/* <div className="flex items-center gap-1 text-white">
              <span className="relative">
                <BsBell className="text-xl" />
              </span>
              <span>Notification</span>
            </div> */}

            {/* Profile Dropdown */}
            <ExpertProfileDropdown logoutHandler={logoutHandler} />

            <button className="block md:hidden" onClick={() => setShow(!show)}>
              <BsList className="text-3xl text-white" />
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-[var(--slate)]">
        <div className="max-w-[1296px] m-auto py-0 md:py-5 border-none md:border shadow-md bg-white rounded md:-translate-y-[30px]">
          <motion.div
            animate={{ width: !show ? (isMobile ? 0 : "auto") : "100%" }}
            transition={{ duration: 0.5 }}
            className={`${"overflow-hidden"} absolute md:relative top-0 right-0 w-0 md:w-auto h-screen md:h-auto bg-opacity-90 z-20 bg-black md:bg-transparent`}
          >
            <ul className="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-around gap-5 md:gap-3 xl:gap-[32px] w-3/5 md:w-auto h-full ms-auto p-[40px_0_0_20px] md:p-0 bg-white md:bg-transparent">
              {[
                ["Dashboard", "/expert/dashboard"],
                ["Balance Summary", "/expert/dashboard/balance-summary"],
                ["Records", "/expert/dashboard/records"],
                ["My Account", "/expert/dashboard/my-account"],
              ].map(([title, url]) => (
                <li
                  key={title}
                  className={`nav-item ${
                    pathName === url && "text-[var(--secondary)]"
                  }`}
                >
                  <Link
                    href={url}
                    className="block"
                    onClick={() => setShow(false)}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type={"button"}
              className="absolute top-4 end-5 block md:hidden"
              onClick={() => setShow(false)}
            >
              <FaTimes className="text-2xl text-[var(--primary)]" />
            </button>
          </motion.div>
        </div>
      </section>
    </Fragment>
  );
};

export default ExpertDashboardNavbar;
