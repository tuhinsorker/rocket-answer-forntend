"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext } from "react";

const Map = () => {
  const { data } = useContext(WebSettingContext);

  const map_url = data?.contact?.map_url;

  return (
    <section className="mt-[60px] md:mt-[120px]">
      <iframe
        className="w-full"
        src={`${
          map_url ??
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.1219362906672!2d90.41942245621335!3d23.82942415322914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a4136c4b61%3A0x19549f5462616f04!2sBdtask%20Limited!5e0!3m2!1sen!2sbd!4v1687537196310!5m2!1sen!2sbd"
        }`}
        height="350"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Map;
