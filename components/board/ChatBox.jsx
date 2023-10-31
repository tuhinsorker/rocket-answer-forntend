"use client";

import useApiCall from "@/hooks/useApiCall";
import Dropdown from "@/ui/dropdown/Dropdown";
import Modal from "@/ui/modal/Modal";
import ReactRating from "@/ui/rating/ReactRating";
import Spin from "@/ui/spin/Spin";
import imgPath from "@/utils/imgPath";
import { disconnectSocket, getSocket, initiateSocket } from "@/utils/socket";
import axios from "axios";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsEmojiSmile, BsFolder, BsSend } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import avt from "/public/images/avt/avt.jpg";

const ChatBox = () => {
  const { error, isLoading, data, fetchData } = useApiCall();
  const { data: userData, fetchData: fetchUserData } = useApiCall();
  const { data: activityInfo, fetchData: fetchActivityInfo } = useApiCall();
  const [chatEnd, setChatEnd] = useState(false);

  // input text field
  const [inputText, setInputText] = useState();
  // chat messages data
  const [chatMessageData, setChatMessageData] = useState([]);
  // get Is Chat Active
  const [isChatActive, setIsChatActive] = useState(0);

  //@TODO: Emoji control states
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  // Show more modal
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ratingData, setRatingData] = useState(null);

  // get the search params
  const searchParams = useSearchParams();
  const activityId = searchParams.get("activity_id");
  const categoryName = searchParams.get("category_name");

  // get the chat div
  const chatDivRef = useRef(null);

  // get cookies
  const token = Cookies.get("token");

  //@TODO: Emoji handling function
  function onClick(emojiData) {
    setSelectedEmoji(emojiData.unified);
  }

  // get rating data callback function
  const getRatingData = (rating) => {
    setRatingData(rating);
  };

  // submit rating data
  const submitRatingHandler = async () => {
    try {
      setIsSuccess(true);

      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/general/close-activity-by-customer`,
        data: {
          conversation_id: activityId * 1,
          rating: `${ratingData}`,
          review_text: "Please",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Rating.........................", res);

      if (res.status === 200) {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSuccess(false);
    }
  };

  // leave the session and end the chat
  const leaveMessageHandler = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/general/close-activity-by-customer`,
        data: {
          conversation_id: activityId * 1,
          review_text: "Please",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      if (res.status === 200) {
        setShowModal(true);
        setChatEnd(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //@TODO: Image send
  const handleImgChange = async (event) => {
    const selectedFile = event.target.files[0];
    const fileType = selectedFile.type.split("/")[0];

    if (selectedFile) {
      const socket = getSocket();

      try {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_URL}/general/file-upload`,
          data: {
            file: selectedFile,
            type: fileType,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(data?.data?.file_url);

        if (fileType === "image") {
          socket.emit("message_sent_gp", {
            text: data?.data?.file_url,
            activity_id: activityId,
            sender_id: userData?.id,
            user_type: "customer",
            // user_type_id: userData?.customer?.id,
            user_type_id: userData?.id,
            socket_id: socket.id,
            chat_message_type: "image",
            receiver_id: 28,
            receiver_device_token: "zkbiaR8bI-2u_cAFAAAD",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // message send request
  const submitHandler = (e) => {
    e.preventDefault();

    const socket = getSocket();

    console.log(inputText, userData?.id);

    socket.emit("message_sent_gp", {
      text: inputText,
      activity_id: activityId,
      sender_id: userData?.id,
      user_type: "customer",
      // user_type_id: userData?.customer?.id,
      user_type_id: userData?.id,
      socket_id: socket.id,
      chat_message_type: "text",
      receiver_id: 28,
      receiver_device_token: "zkbiaR8bI-2u_cAFAAAD",
    });

    setInputText("");
  };

  // get Is Chat Active
  const getIsChatActive = useCallback(async () => {
    try {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/consultantDetails?conversetion_id=${activityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("getIsChatActive..........dfdfdf", data);
      setIsChatActive(data.is_close);
    } catch (error) {
      console.log(error);
    }
  }, [activityId, token]);

  // get Is Chat Active
  useEffect(() => {
    getIsChatActive();
  }, [getIsChatActive, chatEnd]);

  // socket connection here
  useEffect(() => {
    initiateSocket();

    const socket = getSocket();

    if (userData !== null) {
      console.log(userData.id);

      socket.on("connect", () => {
        console.log("connected to socket", "socket id = " + socket.id);

        socket.emit("online", {
          user_id: userData?.id,
          socket_id: socket?.id,
          last_seen: new Date(),
          device_token: "zkbiaR8bI-2u_cAFAAAD",
        });

        socket.emit("activity_joined", {
          activity_id: activityId,
          status: "join",
          user_id: userData?.id,
          user_type: "customer",
          // customer_id: userData?.customer?.id,
          customer_id: userData?.id,
          socket_id: socket.id,
        });
      });
    }

    socket.on("disconnect", (message) => {
      console.log("Disconnected from the server.", message);
      // io.emit('disconnect', message);
    });

    // socket.on("user_joined", (message) => {
    //   console.log("user joined message", message);
    // });

    socket.on("sessions", (message) => {
      console.log("sessions", message);
    });

    // socket.on("notify_activity", (message) => {
    //   console.log("notify activity created------", message);
    // });

    // socket.on("activity_joined", (message) => {
    //   console.log("user joined message", message);
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected from the server.");
    // });

    // socket.on("recent_chat", (message) => {
    //   console.log("recent_chat message", message);
    // });

    // socket.on("notify_activity_join", (message) => {
    //   console.log("notify_activity_join", message);
    // });

    socket.on("chat_m", (message) => {
      // console.log("chat_m message", message);
      setChatMessageData(message?.reverse());
    });

    socket.on("get_message_gp", (message) => {
      console.log("get group Message", message);

      setChatMessageData((prv) => [
        ...prv,
        { id: Date.now(), message: message.text, ...message },
      ]);
    });

    return () => {
      disconnectSocket();
    };
  }, [activityId, userData]);

  // chat Div scroll to bottom
  useEffect(() => {
    if (chatDivRef.current) {
      const { scrollHeight } = chatDivRef.current;
      chatDivRef.current.scrollTop = scrollHeight;
    }
  }, [chatMessageData]);

  // fetch profile data
  useEffect(() => {
    if (token) {
      fetchUserData({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // fetch expert categories
  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/expertCategories`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch user info with active id
  useEffect(() => {
    if (chatMessageData.length > 0) {
      fetchActivityInfo(
        `${process.env.NEXT_PUBLIC_URL}/general/user-info?conversation_id=${activityId}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId, chatMessageData.length]);

  // decide what to render
  let content = "";
  //   error check
  if (error !== null) {
    content = error.message;
  }
  // loading and empty data check
  if (isLoading === true && data === null) {
    content = "loading....";
  }
  // render final data
  if (data !== null) {
    content = data.slice(0, 5).map(({ id, name }) => (
      <Link key={id} href="/">
        {name}
      </Link>
    ));
  }

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      <Modal showModal={showModal}>
        <div className="w-full sm:w-[320px] bg-white p-10 mx-auto relative flex flex-col items-center">
          <h2 className="text-xl text-[var(--dark)] font-medium">
            Your opinion matter to us!
          </h2>
          <p className="text-sm leading-4 text-[var(--gray)] text-center mt-2 my-4">
            If you enjoy the service, would you like to rating us?
          </p>

          {/* rating component */}
          <ReactRating getRatingData={getRatingData} />

          <button
            className="flex items-center justify-center text-[16px] leading-[20px] btn-secondary mt-5 capitalize disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSuccess || ratingData === null}
            onClick={submitRatingHandler}
          >
            give rating
            {isSuccess && <Spin />}
          </button>

          <button
            className="text-[var(--gray-2)] text-sm mt-2 hover:underline"
            onClick={() => setShowModal(false)}
          >
            No, Thanks!
          </button>

          {/* close button */}
          <button
            className="absolute -top-10 right-0 text-white text-4xl"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>
      </Modal>

      <div className="mt-5 sm:mt-8 md:mt-0 mx-2 shadow-md bg-white">
        <div className="hidden xl:flex items-center justify-between gap-1 bg-[var(--primary)] text-white ps-4">
          {/* content here */}
          {content}

          {/* More Categories */}
          <Dropdown title="More Categories" items={data} />
        </div>

        {/* Search category filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5 py-3 xl:py-5 px-2 md:px-5">
          <span className="text-white bg-[var(--secondary)] py-2 px-4 capitalize">
            {categoryName}
          </span>

          {isChatActive === 0 && chatMessageData.length > 0 ? (
            <button
              type="button"
              className="text-white bg-[var(--secondary)] py-2 px-4 capitalize"
              onClick={leaveMessageHandler}
            >
              leave chat
            </button>
          ) : (
            ""
          )}

          {/* <form>
          <div className="flex items-center gap-2 bg-[var(--primary)] p-2 px-4">
            <input
              className="outline-none bg-[var(--primary)] text-white"
              type="text"
              name="search"
              placeholder="Search Category"
              required
            />
            <button type="submit" className="text-white">
              <BsSearch />
            </button>
          </div>
        </form> */}
        </div>

        {/* This is the chat div */}
        {/* h-[180px] */}
        <div
          ref={chatDivRef}
          className="h-[340px] p-[10px_14px] lg:p-[10px_24px] overflow-y-auto border-y"
        >
          {/* conversations  */}
          {chatMessageData?.map((chat) => {
            const { sender_id, id, message, chat_message_type, created_at } =
              chat || {};
            return (
              <div key={id}>
                {/* expert message here */}
                {sender_id !== userData?.id ? (
                  <div className="w-full xl:w-1/2 message mt-5 xl:mt-1">
                    {/* designation */}
                    <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px]">
                      {activityInfo?.expert?.full_name || "expert"}
                    </span>

                    <div className="w-full md:w-[calc(100%-100px)] flex items-center gap-4">
                      {/* user img */}
                      <div className="max-w-[40px] h-10 rounded-full overflow-hidden">
                        <Image
                          src={
                            activityInfo?.expert?.profile_photo_url
                              ? imgPath(activityInfo?.expert?.profile_photo_url)
                              : avt
                          }
                          alt={
                            activityInfo?.expert?.full_name || "expert photo"
                          }
                          width={45}
                          height={45}
                          className="min-w-[40px] h-10 object-cover"
                        />
                      </div>
                      {/* message  */}
                      <div className="w-full px-4 py-2 bg-[var(--slate-1)]">
                        {chat_message_type === "image" && (
                          <div className="w-full">
                            <Image
                              src={message}
                              alt={created_at || "img/created"}
                              width={200}
                              height={200}
                              className="object-fill w-full"
                            />
                          </div>
                        )}
                        {chat_message_type === "text" && (
                          <p className="text-base text-[var(--primary)]">
                            {message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full xl:w-1/2 ms-auto mt-5 xl:mt-2">
                    {/* your message here */}
                    <span className="text-xs text-[var(--primary)] opacity-60 me-[70px] text-right block">
                      {activityInfo?.customer?.name || "you"}
                    </span>
                    <div className="w-full md:w-[calc(100%-100px)] ms-auto text-right flex items-center gap-4">
                      {/* message  */}
                      <div className="w-full px-4 py-2 bg-[var(--slate-1)] mt-1">
                        {chat_message_type === "image" && (
                          <div className="w-full">
                            <Image
                              src={message}
                              alt={created_at || "img/created"}
                              width={200}
                              height={200}
                              className="w-full h-52"
                            />
                          </div>
                        )}
                        {chat_message_type === "text" && (
                          <p className="text-base text-[var(--primary)]">
                            {/* How Can I help you */}
                            {message}
                          </p>
                        )}
                      </div>
                      {/* user img */}
                      <div className="max-w-[40px] h-10 rounded-full overflow-hidden">
                        <Image
                          src={
                            activityInfo?.customer?.image
                              ? imgPath(activityInfo?.customer?.image)
                              : avt
                          }
                          alt={activityInfo?.customer?.name || "profile photo"}
                          width={45}
                          height={45}
                          className="min-w-[40px] h-10 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ask questions input field */}
        <div className="py-3 sm:py-4 px-3 sm:px-6">
          <form
            className="flex items-center justify-around"
            onSubmit={submitHandler}
          >
            <label className="flex cursor-pointer icon-primary">
              <BsFolder />
              <input
                type="file"
                className="hidden"
                onChange={handleImgChange}
                accept=".jpg, .png, .JPG, .PNG, .svg, .SVG, .gif, .GIF"
              />
            </label>
            <input
              className="p-2 outline-0 w-full"
              type="text"
              name="message"
              placeholder="Write your message here...."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
              // readOnly={isChatActive === 1 ? true : false}
              readOnly={
                isChatActive === 0 && chatMessageData.length > 0 ? false : true
              }
            />

            {selectedEmoji ? (
              <Emoji
                unified={selectedEmoji}
                emojiStyle={EmojiStyle.APPLE}
                size={22}
              />
            ) : null}

            <div className="flex items-center justify-end gap-2 md:gap-3 relative">
              {showEmoji && (
                <div className="absolute bottom-16">
                  <EmojiPicker
                    onEmojiClick={onClick}
                    autoFocusSearch={false}
                    emojiStyle={EmojiStyle.NATIVE}
                  />
                </div>
              )}

              <button
                type="button"
                className="icon-primary"
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <BsEmojiSmile />
              </button>
              <button
                type="submit"
                className="icon-primary disabled:cursor-not-allowed disabled:opacity-40"
                // disabled={isChatActive === 1 ? true : false}
                disabled={
                  isChatActive === 0 && chatMessageData.length > 0
                    ? false
                    : true
                }
              >
                <BsSend />
              </button>
            </div>
          </form>
          {/* <form onSubmit={submitHandler}> */}
          {/* <textarea
              className="form-item resize-none"
              rows={3}
              placeholder="Type Your Message Here…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
              readOnly={isChatActive === 1 ? true : false}
            ></textarea> */}
          {/* </div> */}
          {/* <div className="flex flex-wrap items-center justify-end gap-2 mt-5"> */}
          {/* <Link
              href="URL:void(0)"
              className="text-xs text-[var(--primary)] text-hover"
            >
              Motorcycle Mechanics are Online Now
            </Link> */}
          {/* <button
                type={"submit"}
                className="text-base font-medium btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
                disabled={isChatActive === 1 ? true : false}
              >
                Send
              </button>
            </div> */}
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
