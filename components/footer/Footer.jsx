"use client";

import { HomeContext } from "@/context/homeContext";
import { WebSettingContext } from "@/context/webSettingContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import app_store from "/public/images/logos/app_store.png";
import play_store from "/public/images/logos/play_store.png";

const Footer = () => {
  const { error, isLoading, data } = useContext(WebSettingContext);
  const { data: homeData } = useContext(HomeContext);

  const social_link = data?.social_link;
  const web_setup = data?.web_setup;
  const categories = data?.categories;

  const { app_store_button_link, gpstore_button_link } = homeData || {};

  return (
    <footer className="bg-[var(--primary)] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto p-[60px_0_40px] md:p-[120px_0_70px]">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-y-6 md:gap-y-8 xl:gap-y-0 gap-x-2 sm:gap-x-5">
          <div className="itm col-span-2 sm:col-span-1 xl:col-span-2">
            <h4 className="text-xl xl:text-3xl font-medium text-white">
              Quick Contact
            </h4>
            {isLoading ? (
              "loading"
            ) : (
              <ul className="text-white mt-3 md:mt-4 2xl:mt-5">
                {/* <li className="text-base xl:text-lg hover:underline hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2 cursor-default"> */}
                <li className="text-base hover:underline hover:text-[var(--secondary)] hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2 cursor-default">
                  {web_setup?.phone}
                  {/* <Link href="#">{web_setup?.phone}</Link> */}
                </li>
                <li className="text-base hover:underline hover:text-[var(--secondary)] hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2 cursor-default">
                  {web_setup?.email}
                  {/* <Link href="#">{web_setup?.email}</Link> */}
                </li>
                <li
                  className="text-base hover:underline hover:text-[var(--secondary)] transition duration-500 cursor-default"
                  dangerouslySetInnerHTML={{ __html: web_setup?.address }}
                />
              </ul>
            )}
          </div>

          <div className="itm">
            <h4 className="text-xl xl:text-3xl font-medium text-white">
              Categories
            </h4>
            <ul className="text-white mt-3 md:mt-4 2xl:mt-5">
              {categories?.map((category, i) => {
                const { id, name } = category || {};

                return (
                  <li
                    key={id}
                    // className={`text-base xl:text-lg hover:underline hover:translate-x-1 transition duration-500 ${
                    className={`text-base hover:underline hover:text-[var(--secondary)] hover:translate-x-1 transition duration-500 ${
                      categories?.length - 1 === i ? "" : " mb-1 2xl:mb-2"
                    }`}
                  >
                    <Link
                      href={`/category/${name.toLocaleLowerCase()}?categoryId=${id}`}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
              {/* <li className="text-base xl:text-lg hover:underline hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="#">Interior</Link>
              </li>
              <li className="text-base xl:text-lg hover:underline hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="#">Car Wash</Link>
              </li>
              <li className="text-base xl:text-lg hover:underline hover:translate-x-1 transition duration-500">
                <Link href="#">Cleaning</Link>
              </li> */}
            </ul>
          </div>

          {/* <div className="itm">
            <h4 className="text-xl 2xl:text-3xl font-medium text-white">
              Join Us
            </h4>
            <ul className="text-white mt-3 md:mt-4 2xl:mt-6">
              <li className="text-base 2xl:text-lg hover:underline hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="#">Careers</Link>
              </li>
              <li className="text-base 2xl:text-lg hover:underline hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="#">Become an Expert</Link>
              </li>
              <li className="text-base 2xl:text-lg hover:underline hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="#">Become an Affiliate</Link>
              </li>
              <li className="text-base 2xl:text-lg hover:underline hover:translate-x-1 transition duration-500">
                <Link href="#">Refer an Expert</Link>
              </li>
            </ul>
          </div> */}

          <div className="itm">
            <h4 className="text-xl xl:text-3xl font-medium text-white">
              Support
            </h4>
            <ul className="text-white mt-3 md:mt-4 2xl:mt-5">
              <li className="text-base hover:underline hover:text-[var(--secondary)] hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="#">Help Center</Link>
              </li>
              <li className="text-base hover:underline hover:text-[var(--secondary)] hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="/about">About us</Link>
              </li>
              <li className="text-base hover:underline hover:text-[var(--secondary)] hover:translate-x-1 transition duration-500 mb-1 2xl:mb-2">
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li className="text-base hover:underline hover:text-[var(--secondary)] hover:translate-x-1 transition duration-500">
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          <div className="itm">
            <h4 className="text-xl xl:text-3xl font-medium text-white">
              Connect Us
            </h4>
            <div className="text-white mt-3 md:mt-5">
              {/* socials links here */}
              {isLoading ? (
                "loading"
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href={social_link?.facebook}
                    className="p-2 rounded-full border border-white hover:border-[var(--secondary)] hover:shadow-lg transition-all duration-500"
                  >
                    <FaFacebookF className="text-lg" />
                  </Link>
                  <Link
                    href={social_link?.twitter}
                    className="p-2 rounded-full border border-white hover:border-[var(--secondary)] hover:shadow-lg transition-all duration-500"
                  >
                    <FaTwitter className="text-lg" />
                  </Link>
                  <Link
                    href={social_link?.linkedin}
                    className="p-2 rounded-full border border-white hover:border-[var(--secondary)] hover:shadow-lg transition-all duration-500"
                  >
                    <FaLinkedinIn className="text-lg" />
                  </Link>
                </div>
              )}
              <div className="mt-4 md:mt-7">
                <h6 className="text-base xl:text-lg font-medium">
                  Download Our App
                </h6>

                {/*app Download Links  */}
                <div className="flex items-center gap-4 mt-3">
                  {/* play store Link here */}
                  <Link
                    href={gpstore_button_link || "/"}
                    className="hover:shadow-md hover:translate-y-[1px] transition-all duration-500"
                  >
                    <Image src={play_store} alt="play_store" />
                  </Link>

                  {/*app store Link here */}
                  <Link
                    href={app_store_button_link || "/"}
                    className="hover:shadow-md hover:translate-y-[1px] transition-all duration-500"
                  >
                    <Image src={app_store} alt="app_store" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* copyright section  */}
      <div className="w-full text-center border-t border-[var(--slate)] py-2">
        <p className="text-white text-sm font-medium">
          © 2003-2023
          <Link
            href="/"
            className="hover:text-[var(--secondary)] transition duration-500"
          >
            {" "}
            Rocket{" "}
          </Link>
          LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
