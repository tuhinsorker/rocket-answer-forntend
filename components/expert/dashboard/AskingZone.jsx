"use client";

import ProfileCard from "@/components/card/ProfileCard";
import NotFound from "@/ui/notFound/NotFound";
import { disconnectSocket, getSocket, initiateSocket } from "@/utils/socket";
import Link from "next/link";
import { useEffect, useState } from "react";
import WithdrawForm from "./WithdrawForm";

const AskingZone = () => {
  const [askingZone, setAskingZone] = useState([]);
  const [userData, setUserData] = useState();

  // get user data from localStorage
  // const getUserData = localStorage.getItem("userInfo");
  // const userData = JSON.parse(getUserData);

  // get user info from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(profile);
      setUserData(userInfo);
    }
  }, []);

  // socket connection here
  useEffect(() => {
    initiateSocket();

    const socket = getSocket();

    socket.on("connect", () => {
      console.log("connected to socket", "socket id = " + socket.id);

      socket.emit("online", {
        user_id: userData?.id,
        socket_id: socket?.id,
        last_seen: new Date(),
        device_token: "zkbiaR8bI-2u_cAFAAAD",
      });

      // socket.emit("activity_joined", {
      //   activity_id: activityId * 1,
      //   status: "join",
      //   user_id: userData?.id,
      //   user_type: "customer",
      //   customer_id: userData?.id,
      //   socket_id: socket.id,
      // });
    });

    socket.on("sessions", (message) => {
      // console.log("sessions", message);
      setAskingZone(message);
    });

    return () => {
      disconnectSocket();
    };
  }, [userData?.id]);

  // decide what to render
  let content = "";

  if (askingZone?.length === 0) {
    content = <NotFound />;
  } else {
    content = askingZone?.map((itm) => {
      const { id, title, description, customer_id, expert_category_id } = itm;

      return (
        <div
          key={id}
          className="flex items-center justify-between gap-5 pb-2.5 pt-2 px-5 md:px-10 border-t"
        >
          <div className="flex flex-col gap-1">
            <h4 className="text-[var(--primary)]">{title}</h4>
            <div className="grid gap-2">
              <p className="text-sm text-[#c0bcbc]">{description}</p>
              {/* <span className="text-[var(--gray-2)]">2 days ago</span> */}
              <span className="text-[var(--secondary)]">Waiting</span>
            </div>
          </div>

          <Link
            href={`/expert/dashboard/chat?category_id=${expert_category_id}&activity_id=${id}&customer_id=${customer_id}`}
            className="border border-[var(--secondary)] text-[var(--secondary)] hover:text-white hover:bg-[var(--secondary)] hover:shadow-md transition-all duration-500 px-4 lg:px-6 py-1 lg:py-1.5"
          >
            Replay
          </Link>
        </div>
      );
    });
  }

  return (
    <section className="pt-5 lg:pt-10 px-3 2xl:px-0 bg-[var(--slate)]">
      <div className="max-w-[1296px] m-auto flex flex-col sm:flex-row gap-5 lg:gap-10">
        <div className="flex-[2_2_0%] w-full sm:w-3/5 bg-white shadow-md box-hover rounded-md">
          <h3 className="text-xl text-[var(--primary)] pt-3 px-5 md:px-10">
            Asking Zone
          </h3>
          <div className="mt-3">{content}</div>
        </div>

        <div className="flex-[1_1_0%] flex flex-col gap-5 lg:gap-10 w-full sm:w-2/5">
          {/* profile card here */}
          <ProfileCard />

          {/* Withdraw Form here */}
          <WithdrawForm />
        </div>
      </div>
    </section>
  );
};

export default AskingZone;
