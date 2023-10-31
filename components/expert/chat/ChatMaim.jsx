"use client";

import useApiCall from "@/hooks/useApiCall";
import Spin from "@/ui/spin/Spin";
import { successAlert } from "@/utils/alerts";
import imgPath from "@/utils/imgPath";
import { disconnectSocket, getSocket, initiateSocket } from "@/utils/socket";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import avt_s from "/public/images/avt/avt_s.png";

const ChatMaim = () => {
  const [userInfo, setUserInfo] = useState();
  const [chatMessageData, setChatMessageData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [chatCloseLoading, setChatCloseLoading] = useState(false);
  const [isChatActive, setIsChatActive] = useState(0);
  const [activityReload, setActivityReload] = useState(false);

  // activityInfo data from api
  const {
    data: activityInfo,
    fetchData: fetchActivityInfo,
    isLoading: isActivityInfoLoading,
  } = useApiCall();

  // get cookies
  const token = Cookies.get("token");

  // get the search params
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const activity_id = searchParams.get("activity_id");
  const category_id = searchParams.get("category_id");

  // submit rating data
  const closeActivity = async () => {
    const socket = getSocket();

    setChatCloseLoading(true);

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/general/close-activity`,
        data: {
          conversation_id: activity_id * 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const data = {
          activity_id: activity_id * 1,
          user_id: userInfo?.id * 1,
          category_id: category_id * 1,
          socket_id: socket.id,
          user_type: "expert",
          sender_id: userInfo?.id * 1,
          receiver_id: customer_id * 1,
          receiver_device_token: "zkbiaR8bI-2u_cAFAAAD",
          user_name: userInfo?.user_name,
        };

        /**
         * Emit an event signaling the close of an activity by an expert.
         *
         * @param {object} data - The data object containing information about the closed activity.
         */
        socket.emit("activity_closed_by_expert", data);

        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Activity Close successful!");

        // activity reload
        setActivityReload(true);
      }
    } catch (error) {
      console.error("There was an error", error);
      setChatCloseLoading(false);
      // console.log(error);
    } finally {
      setChatCloseLoading(false);
    }
  };

  // message send request
  const submitMessageHandler = (e) => {
    e.preventDefault();

    const socket = getSocket();

    const data = {
      text: inputText,
      activity_id: activity_id * 1,
      sender_id: userInfo?.id,
      user_type: "expert",
      user_type_id: userInfo?.id,
      socket_id: socket.id,
      chat_message_type: "text",
      receiver_id: customer_id,
      receiver_device_token: "zkbiaR8bI-2u_cAFAAAD",
      user_name: userInfo?.name,
    };

    socket.emit("message_sent_gp", data);

    setInputText("");
  };

  // get user info from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(profile);
      setUserInfo(userInfo);
    }
  }, []);

  // get Is Chat Active
  const getIsChatActive = useCallback(async () => {
    try {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_URL}/general/conversation-details?conversation_id=${activity_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.code === 200) {
        setIsChatActive(data.data.conversation.is_expert_closed);
      }
    } catch (error) {
      console.error("There is an error occurred", error);
    }
  }, [activity_id, token]);

  // get Is Chat Active
  useEffect(() => {
    if (activity_id) {
      getIsChatActive();
    }
  }, [getIsChatActive, activity_id, activityReload]);

  // fetch user info with active id
  useEffect(() => {
    if (chatMessageData.length > 0) {
      fetchActivityInfo(
        `${process.env.NEXT_PUBLIC_URL}/general/user-info?conversation_id=${activity_id}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity_id, chatMessageData.length]);

  // socket connection here
  useEffect(() => {
    initiateSocket();

    const socket = getSocket();

    if (userInfo !== null) {
      socket.on("connect", () => {
        console.log("connected to socket", "socket id = " + socket.id);

        socket.emit("online", {
          user_id: userInfo?.id,
          socket_id: socket?.id,
          last_seen: new Date(),
          device_token: "zkbiaR8bI-2u_cAFAAAD",
        });

        socket.emit("activity_joined", {
          activity_id: activity_id * 1,
          status: "join",
          user_id: userInfo?.id,
          user_type: "expert",
          // customer_id: userInfo?.customer?.id,
          customer_id: customer_id,
          socket_id: socket.id,
        });
      });
    }

    // online experts
    socket.on("online_experts", (message) => {
      // console.log("total online experts", message);
      setOnlineExperts(message);
    });

    socket.on("disconnect", (message) => {
      // console.log("Disconnected from the server.", message);
      // io.emit('disconnect', message);
    });

    socket.on("sessions", (message) => {
      // console.log("sessions", message);
    });

    // socket.on("activity_closed_by_expert", (message) => {
    //   // console.log("activity_closed_by_expert", message);
    //   setActivityClosedData(message);
    // });

    socket.on("chat_m", (message) => {
      // console.log("chat_m message", message);
      setChatMessageData(message?.reverse());
    });

    socket.on("get_message_gp", (message) => {
      // console.log("get group Message", message);

      setChatMessageData((prv) => [
        ...prv,
        { id: Date.now(), message: message.text, ...message },
      ]);
    });

    return () => {
      disconnectSocket();
    };
  }, [activity_id, customer_id, userInfo]);

  return (
    <section className="py-5 md:py-10 px-3 2xl:px-0 bg-[var(--slate)]">
      <div className="max-w-[1296px] mx-auto bg-white shadow-md rounded-md">
        <div className="w-full relative">
          {/* Profile info */}
          <div className="flex flex-wrap items-center justify-between border px-2 lg:px-5 py-3">
            <div className="w-3/4 lg:w-1/2 flex items-start sm:items-center gap-2 lg:gap-5 border-r">
              <div className="w-[50px] lg:w-[70px] h-[50px] lg:h-[70px] rounded-full border overflow-hidden">
                <Image
                  src={
                    activityInfo?.customer?.image
                      ? imgPath(activityInfo?.customer?.image)
                      : avt_s
                  }
                  alt={activityInfo?.customer?.full_name || "customer photo"}
                  width={70}
                  height={70}
                />
              </div>

              <div className="text-[var(--primary)]">
                <h3 className="text-lg md:text-2xl">
                  {activityInfo?.customer?.name}
                </h3>

                <p className="text-sm md:text-base">
                  {activityInfo?.customer?.email}
                </p>
              </div>
            </div>

            <div className="clss">
              {chatMessageData.length > 0 ? (
                isChatActive !== 1 ? (
                  <button
                    type="button"
                    className="btn-secondary rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={closeActivity}
                    disabled={chatCloseLoading}
                  >
                    Close
                    {chatCloseLoading && <Spin />}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-secondary rounded-md opacity-70 cursor-not-allowed hover:shadow-none"
                  >
                    Closed
                  </button>
                )
              ) : (
                <button
                  type="button"
                  className="btn-secondary rounded-md opacity-70 cursor-not-allowed hover:shadow-none"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>

        {/* conversations  */}
        <div className="h-[320px] md:h-[500px] p-[10px_14px] lg:p-[10px_24px] bg-[var(--chat-bg)] overflow-y-auto chat scrollbar-thick">
          {chatMessageData.map((chat) => {
            const { sender_id, id, message, chat_message_type, created_at } =
              chat || {};

            return (
              <Fragment key={id}>
                {sender_id !== userInfo?.id ? (
                  <div className="w-full xl:w-1/2 mt-2">
                    {/* designation */}
                    <p className="flex items-center gap-10 text-xs text-[var(--primary)] opacity-80 ms-[55px]">
                      <span>{activityInfo?.customer?.name}</span>
                      {/* <span>01:40 AM</span> */}
                    </p>

                    <div className="w-full flex items-start gap-2 sm:gap-[10px] mt-[2px]">
                      {/* user img */}
                      <div className="w-[45px] h-[45px] rounded-full border border-white overflow-hidden">
                        <Image
                          src={
                            activityInfo?.customer?.image
                              ? imgPath(activityInfo?.customer?.image)
                              : avt_s
                          }
                          alt={
                            activityInfo?.customer?.full_name ||
                            "customer photo"
                          }
                          width={45}
                          height={45}
                        />
                      </div>

                      {/* message  */}
                      <div className="px-4 sm:px-8 py-2 md:py-4 bg-white rounded-e-full rounded-b-full">
                        {chat_message_type === "text" && (
                          <p className="text-sm sm:text-base leading-4 sm:leading-5 text-[var(--primary)]">
                            {message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full xl:w-1/2 ms-auto mt-2">
                    {/* designation */}
                    <p className="flex items-center justify-end gap-10 text-xs text-[var(--primary)] opacity-80 me-[55px]">
                      <span>you</span>
                      {/* <span>01:40 AM</span> */}
                    </p>

                    <div className="w-full ms-auto text-right flex items-center gap-2 sm:gap-[10px] mt-[2px]">
                      {/* message  */}
                      <div className="ms-auto px-4 sm:px-8 py-2 md:py-4 bg-white rounded-s-full rounded-b-full">
                        {chat_message_type === "text" && (
                          <p className="text-sm sm:text-base leading-4 sm:leading-5 text-[var(--primary)]">
                            {message}
                          </p>
                        )}
                      </div>
                      {/* user img */}
                      <div className="w-[45px] h-[45px] rounded-full border border-white overflow-hidden">
                        <Image
                          src={
                            activityInfo?.expert?.profile_photo_url
                              ? imgPath(activityInfo?.expert?.profile_photo_url)
                              : avt_s
                          }
                          alt={
                            activityInfo?.expert?.full_name || "customer photo"
                          }
                          width={45}
                          height={45}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* write message section*/}
        {isChatActive !== 1 && (
          <div className="p-2 md:p-4">
            <form
              className="flex items-center justify-around"
              onSubmit={submitMessageHandler}
            >
              <input
                className="p-2 outline-0 w-full"
                type="text"
                name="message"
                placeholder="Write your message here...."
                onChange={(e) => setInputText(e.target.value)}
                value={inputText || ""}
                required
              />

              <button type="submit" className="icon-primary">
                <BsSend />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatMaim;
