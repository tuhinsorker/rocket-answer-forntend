"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import Link from "next/link";
import { useContext } from "react";
import { BsEnvelope, BsPhone, BsWechat } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

const ContactList = () => {
  const { error, isLoading, data } = useContext(WebSettingContext);
  const web_setup = data?.web_setup;

  return (
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        <div className="flex flex-col items-center justify-center py-3 lg:py-10 rounded-md border shadow-md box-hover">
          <div className="w-[60px] lg:w-[70px] h-[60px] lg:h-[70px] rounded-full flex items-center justify-center bg-[var(--primary)] text-white border border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] transition-all duration-500">
            <BsPhone className="text-3xl" />
          </div>

          <div className="mt-2 lg:mt-4 text-center">
            <h3 className="text-xl lg:text-2xl leading-7 tracking-widest text-[var(--primary)] font-medium">
              Call Us
            </h3>
            <h5 className="block text-sm lg:text-base leading-5 text-[var(--primary)] mt-1 text-hover">
              {web_setup?.phone || ""}
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-3 lg:py-10 rounded-md border shadow-md box-hover">
          <div className="w-[60px] lg:w-[70px] h-[60px] lg:h-[70px] rounded-full flex items-center justify-center bg-[var(--primary)] text-white border border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] transition-all duration-500">
            <BsEnvelope className="text-3xl" />
          </div>

          <div className="mt-2 lg:mt-4 text-center">
            <h3 className="text-xl lg:text-2xl leading-7 tracking-widest text-[var(--primary)] font-medium">
              Mail Us
            </h3>
            <h5 className="block text-sm lg:text-base leading-5 text-[var(--primary)] mt-1 text-hover">
              {web_setup?.email || ""}
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-3 lg:py-10 rounded-md border shadow-md box-hover">
          <div className="w-[60px] lg:w-[70px] h-[60px] lg:h-[70px] rounded-full flex items-center justify-center bg-[var(--primary)] text-white border border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] transition-all duration-500">
            <BsWechat className="text-3xl" />
          </div>

          <div className="mt-2 lg:mt-4 text-center">
            <h3 className="text-xl lg:text-2xl leading-7 tracking-widest text-[var(--primary)] font-medium">
              Live chat
            </h3>
            <h5 className="block text-sm lg:text-base leading-5 text-[var(--primary)] mt-1 text-hover">
              {web_setup?.phone || ""}
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-3 lg:py-10 rounded-md border shadow-md box-hover">
          <div className="w-[60px] lg:w-[70px] h-[60px] lg:h-[70px] rounded-full flex items-center justify-center bg-[var(--primary)] text-white border border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] transition-all duration-500">
            <TbWorld className="text-3xl" />
          </div>

          <div className="mt-2 lg:mt-4 text-center">
            <h3 className="text-xl lg:text-2xl leading-7 tracking-widest text-[var(--primary)] font-medium">
              Visit Us
            </h3>
            <Link
              href={data?.site_url || "#"}
              className="block text-sm lg:text-base leading-5 text-[var(--primary)] mt-1 text-hover"
            >
              {data?.site_url || ""}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactList;
