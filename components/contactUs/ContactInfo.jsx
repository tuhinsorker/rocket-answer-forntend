"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import Error from "@/ui/error/Error";
import FallingLinesAnimation from "@/ui/fallingLinesAnimation/FallingLinesAnimation";
import Link from "next/link";
import { useContext } from "react";
import ContactForm from "./ContactForm";

const ContactInfo = () => {
  const { error, isLoading, data } = useContext(WebSettingContext);

  // decide what to render
  let content = "";

  //   error check
  if (error !== null) {
    content = <Error message={error?.message} />;
  }

  // loading and empty data check
  if (isLoading === true && data === null) {
    content = (
      <div className="w-full sm:w-1/2 order-1 sm:order-0">
        <FallingLinesAnimation />
      </div>
    );
  }

  // render final data
  if (data !== null) {
    const { web_setup, contact } = data;

    const words = contact.dialog.split(" ");

    content = (
      <div className="w-full sm:w-1/2 order-1 sm:order-0">
        <div className="content">
          <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] text-[var(--primary)] font-bold">
            {words.slice(0, 4).join(" ")} <br />
            {words.slice(4).join(" ")}
          </h3>
          <p className="text-base leading-5 w-auto sm:w-[40ch] text-[var(--primary)] mt-3 md:mt-5">
            {contact.dialog_description}
          </p>
          <Link
            href="/"
            className="inline-flex text-[16px] leading-[20px] btn-primary mt-5 md:mt-10"
          >
            Get Directions
          </Link>
        </div>

        <div className="mt-5 md:mt-10">
          <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] text-[var(--primary)] font-bold">
            Our Headquarters
          </h3>
          <p
            className="text-base leading-5 w-auto sm:w-[58ch] text-[var(--primary)] mt-3 md:mt-5 text-hover"
            dangerouslySetInnerHTML={{
              __html: web_setup?.address || "Loading...",
            }}
          />
        </div>
        <div className="mt-3 md:mt-5">
          <p className="text-base md:text-lg leading-5 md:leading-7 w-auto sm:w-[58ch] text-[var(--primary)]">
            Phone:
            <Link href="#" className="text-hover">
              {" "}
              {web_setup?.phone || "Loading..."}
            </Link>
          </p>

          <p className="text-base md:text-lg leading-5 md:leading-7 w-auto sm:w-[58ch] text-[var(--primary)]">
            Email:
            <Link href="#" className="text-hover">
              {" "}
              {web_setup?.email || "Loading..."}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-[60px] md:mt-[120px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-5">
        {content}
        <div className="w-full sm:w-1/2 order-0 sm:order-1">
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
