"use client";

import useApiCall from "@/hooks/useApiCall";
import ConversationLoad from "@/ui/conversationLoad/ConversationLoad";
import LargeDropdown from "@/ui/largeDropdown/LargeDropdown";
import Modal from "@/ui/modal/Modal";
import ReactRating from "@/ui/rating/ReactRating";
import Spin from "@/ui/spin/Spin";
import imgPath from "@/utils/imgPath";
import { disconnectSocket, getSocket, initiateSocket } from "@/utils/socket";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import lawer_avt from "/public/images/avt/avt.jpg";

const ChatBox = () => {
  const router = useRouter();
  // active chat box for mobile devices state handlers
  const [mobileActive, setMobileActive] = useState(false);
  // comment animation handling state
  const [commentAnimation, setCommentAnimation] = useState(true);
  // index count state
  const [ansIndexCount, setAnsIndexCount] = useState(0);
  // text input field state
  const [inputText, setInputText] = useState("");
  // conversation state
  const [conversation, setConversation] = useState([
    { q: null, a: "How are you?" },
  ]);
  // online experts
  const [onlineExperts, setOnlineExperts] = useState(0);

  // Is Chat Active
  const [isChatActive, setIsChatActive] = useState(null);
  const [chatMessageData, setChatMessageData] = useState([]);
  // const [predefineMessage, setPredefineMessage] = useState([]);

  //rating modal dialog
  const [ratingData, setRatingData] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [isSuccessRating, setIsSuccessRating] = useState(false);
  const [activityClosedData, setActivityClosedData] = useState({});
  const [expertData, setExpertData] = useState({});

  // predefine messages from api
  const { data, fetchData } = useApiCall();
  // user data from api
  const { data: userData, fetchData: fetchUserData } = useApiCall();
  // pre define questions API
  const { data: predefinedQuestions, fetchData: fetchPredefinedQuestions } =
    useApiCall();
  // activityInfo data from api
  const {
    data: activityInfo,
    fetchData: fetchActivityInfo,
    isLoading: isActivityInfoLoading,
  } = useApiCall();

  // @TODO: new
  // get cookies
  const token = Cookies.get("token");

  // get the chat div
  const chatDivRef = useRef(null);

  // get the category name
  const { categoryName } = useParams();

  // get the search params
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const activityId = searchParams.get("activity_id");

  const categoryById = data?.find(
    (itm) => itm.category_id * 1 === categoryId * 1
  );

  // const answers = JSON.parse(categoryById?.phrase);
  // const arrayOfAnswer = Object.values(categoryById?.phrase || {});
  const arrayOfAnswer = [
    categoryById?.answer_one,
    categoryById?.answer_two,
    categoryById?.answer_three,
    categoryById?.answer_four,
    categoryById?.answer_five,
  ];

  // get rating data callback function
  const getRatingData = (rating) => {
    setRatingData(rating);
  };

  // submit rating data
  const submitRatingHandler = async () => {
    setIsSuccessRating(true);

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/general/close-activity-by-customer`,
        data: {
          conversation_id: activityId * 1,
          // rating: `${ratingData ? ratingData : 0}`,
          rating: ratingData,
          review_text: "Please",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setShowModal(false);
        router.replace("/");
        // console.log("Rating response", res);
      }
    } catch (error) {
      setIsSuccessRating(false);
      console.error("There was an error", error);

      console.log(error);
    } finally {
      setIsSuccessRating(false);
    }
  };

  // send messages handler
  const submitHandler = (e) => {
    e.preventDefault();

    // comment animation set to true
    setCommentAnimation(true);

    // increment the index count
    setAnsIndexCount((prev) => prev + 1);

    setConversation((prev) => {
      return [...prev, { q: inputText, a: arrayOfAnswer[ansIndexCount] }];
    });

    setInputText("");
  };

  // check media queries for mobile
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  // handle chat box onclick
  const handleChatBox = () => {
    if (isMobile && !mobileActive) {
      setMobileActive(true);
    }
  };

  // message send request
  const submitMessageHandler = (e) => {
    e.preventDefault();

    const socket = getSocket();

    const data = {
      text: inputText,
      activity_id: activityId * 1,
      sender_id: userData?.id,
      user_type: "customer",
      // user_type_id: userData?.customer?.id,
      user_type_id: userData?.id,
      socket_id: socket.id,
      chat_message_type: "text",
      receiver_id: activityInfo?.expert?.id,
      receiver_device_token: "zkbiaR8bI-2u_cAFAAAD",
      user_name: activityInfo?.customer?.name,
      receiver_name: activityInfo?.expert?.full_name,
    };

    socket.emit("message_sent_gp", data);

    setInputText("");
  };

  // redirect timer to the url
  const redirectTimer = useCallback(() => {
    const delayTime = 10000;

    const timer = setTimeout(() => {
      router.replace(
        `/pay-for-consultancy?category_name=${categoryName}&category_id=${categoryId}`
      );
    }, delayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [categoryId, categoryName, router]);

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
      // console.log("getIsChatActive..........", data);
      setIsChatActive(data.is_close);
    } catch (error) {
      console.error("There is an error occurred", error);
    }
  }, [activityId, token]);

  // get Is Chat Active
  useEffect(() => {
    if (activityId) {
      getIsChatActive();
    }
  }, [getIsChatActive, activityId]);

  //  @TODO: store the conversation in local storage and redirect timer handler
  useEffect(() => {
    // store the conversation in local storage
    if (conversation?.length === data?.length) {
      const jsonString = JSON.stringify(conversation);
      localStorage.setItem("conversation", jsonString);

      // redirect to after
      redirectTimer();
    }

    // get conversation from localStorage
    // const get = localStorage.getItem("conversation");
    // setPredefineMessage(JSON.parse(get));
  }, [arrayOfAnswer.length, conversation, data?.length, redirectTimer]);

  // if with > 767px then this useEffect will work
  useEffect(() => {
    if (!isMobile) {
      setMobileActive(false);
    }
  }, [isMobile]);

  // chat Div scroll to bottom
  useEffect(() => {
    if (chatDivRef.current) {
      const { scrollHeight } = chatDivRef.current;
      chatDivRef.current.scrollTop = scrollHeight;
    }
  }, [commentAnimation, chatMessageData, activityInfo]);

  // handle body overflows none
  useEffect(() => {
    const body = document.body;

    if (mobileActive) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [mobileActive]);

  // comment animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCommentAnimation(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [ansIndexCount]);

  // fetch the pre define answers from the API
  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/predefinedAnswer`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // socket connection here
  // useEffect(() => {
  //   initiateSocket();

  //   const socket = getSocket();

  //   socket.on("connect", () => {
  //     console.log("connected to socket", "socket id = " + socket.id);

  //     socket.emit("get_online_experts", {
  //       user_id: 68,
  //       user_type: "customer",
  //       category_id: categoryId,
  //       socket_id: socket.id,
  //     });
  //   });

  //   socket.on("online_experts", (message) => {
  //     console.log("total online experts", message);
  //     setOnlineExperts(message);
  //   });

  //   return () => {
  //     disconnectSocket();
  //   };
  // }, [categoryId]);
  useEffect(() => {
    initiateSocket();

    const socket = getSocket();

    if (userData !== null) {
      socket.on("connect", () => {
        console.log("connected to socket", "socket id = " + socket.id);

        socket.emit("online", {
          user_id: userData?.id,
          socket_id: socket?.id,
          last_seen: new Date(),
          device_token: "zkbiaR8bI-2u_cAFAAAD",
        });

        socket.emit("activity_joined", {
          activity_id: activityId * 1,
          status: "join",
          user_id: userData?.id,
          user_type: "customer",
          // customer_id: userData?.customer?.id,
          customer_id: userData?.id,
          socket_id: socket.id,
        });

        // console.log(userData?.id);
        socket.emit("get_online_experts", {
          user_id: userData?.id,
          user_type: "customer",
          category_id: categoryId,
          socket_id: socket.id,
        });
      });
    }

    // online experts
    socket.on("online_experts", (message) => {
      console.log("total online experts", message);
      setOnlineExperts(message);
    });

    socket.on("disconnect", (message) => {
      console.log("Disconnected from the server.", message);
      // io.emit('disconnect', message);
    });

    socket.on("sessions", (message) => {
      // console.log("sessions", message);
    });

    socket.on("activity_closed_by_expert", (message) => {
      console.log("activity_closed_by_expert", message);
      setActivityClosedData(message);
    });

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
  }, [activityId, categoryId, userData]);

  // @TODO: new
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

  // get pre-define questions
  useEffect(() => {
    if (activityId) {
      fetchPredefinedQuestions({
        url: `${process.env.NEXT_PUBLIC_URL}/general/conversation-details?conversation_id=${activityId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, activityId]);

  // fetch user info with active id
  useEffect(() => {
    if (chatMessageData.length > 0) {
      fetchActivityInfo(
        `${process.env.NEXT_PUBLIC_URL}/general/user-info?conversation_id=${activityId}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId, chatMessageData.length]);

  // fetch expert data by id
  const fetchExpertData = useCallback(async () => {
    try {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/expertCategories?category_id=${categoryId}`
      );

      if (data.code === 200) {
        setExpertData(data);
      }
    } catch (error) {
      console.error("There was an error with this api", error);
    }
  }, [categoryId]);

  // fetch expert data by id
  useEffect(() => {
    fetchExpertData();
  }, [fetchExpertData]);

  return (
    <>
      {/* Rating modal here */}
      {isChatActive === null ? (
        ""
      ) : (
        <Modal
          // isChatActive === 0
          showModal={
            activityId * 1 === activityClosedData?.activity_id
              ? showModal
              : false
          }
        >
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
              disabled={isSuccessRating || ratingData === null}
              onClick={submitRatingHandler}
            >
              give rating
              {isSuccessRating && <Spin />}
            </button>

            <button
              className="text-[var(--gray-2)] text-sm mt-2 hover:underline"
              // onClick={() => {
              //   router.replace("/");
              //   setShowModal(false);
              // }}
              onClick={submitRatingHandler}
            >
              No, Thanks!
            </button>

            {/* close button */}
            <button
              className="absolute -top-10 right-0 text-white text-4xl"
              // onClick={() => {
              //   router.replace("/");
              //   setShowModal(false);
              // }}
              onClick={submitRatingHandler}
            >
              &times;
            </button>
          </div>
        </Modal>
      )}

      <div
        className={`mt-8 md:mt-0 w-full md:max-w-[480px] ${
          mobileActive &&
          "fixed top-0 left-0 w-screen h-screen bg-[var(--slate-2)] z-50 !mt-0"
        }`}
        onClick={handleChatBox}
      >
        <div className="hidden md:inline-flex items-center gap-1 bg-[var(--primary)] text-white">
          <span className="py-3 px-6 capitalize">
            {categoryName.split("_").join(" ")}
          </span>

          {/* More Dropdown Menu Here */}
          <LargeDropdown />
        </div>

        <div className="flex items-center gap-3 md:gap-5 bg-[var(--primary)] px-2 md:px-5 py-1 md:py-2">
          {/* profile image */}
          <div className="w-16 h-16 overflow-hidden">
            {/* <Image src={lawer_avt} alt="Lawyer img" height={60} width={60} /> */}
            <Image
              src={
                activityInfo?.expert?.profile_photo_url
                  ? imgPath(activityInfo?.expert?.profile_photo_url)
                  : lawer_avt
              }
              alt={activityInfo?.expert?.full_name || "expert photo"}
              width={60}
              height={60}
              className="min-w-[60px] h-[60] object-cover"
            />
          </div>

          {/* profile summery */}
          <div className="text-white">
            <p className="text-sm">
              {activityInfo?.expert?.full_name || "Expert"}

              {!activityInfo?.expert?.full_name && (
                <>
                  <span className="capitalize">
                    {" "}
                    , {categoryName.split("_").join(" ")}{" "}
                  </span>
                  Assist
                </>
              )}
            </p>
            <p className="text-sm my-1">
              {expertData?.customer_satisfied} satisfied customers
            </p>
          </div>

          {/* chat box close button */}
          {mobileActive && (
            <button
              type="button"
              className="text-white self-start absolute top-2 right-2"
              onClick={() => setMobileActive(false)}
            >
              <BsXLg className="text-2xl" />
            </button>
          )}
        </div>

        {/* This is the chat div */}
        <div
          ref={chatDivRef}
          className={`h-[140px] md:h-[200px] ${
            mobileActive && "!h-[calc(100%-255px)]"
          } bg-white p-[10px_14px] lg:p-[10px_24px] overflow-y-auto flex flex-col`}
        >
          <div className="mt-auto md:mt-0">
            {/* conversations  */}
            {activityId ? (
              <Fragment>
                {/* {predefineMessage?.map((itm, i) => ( */}
                {JSON.parse(
                  predefinedQuestions
                    ? predefinedQuestions?.conversation?.question_answers
                    : "[]"
                )?.map((itm, i) => (
                  <div key={i} className="flex flex-col-reverse">
                    {/* message here */}
                    <div className="message">
                      {/* designation */}
                      <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px] capitalize">
                        {activityInfo?.expert?.full_name || "expert"}
                      </span>

                      <div className="w-full sm:w-[calc(100%-100px)] flex items-center gap-4">
                        {/* user img */}
                        <div className="w-[50px] max-w-[40px] h-10">
                          <Image
                            src={
                              activityInfo?.expert?.profile_photo_url
                                ? imgPath(
                                    activityInfo?.expert?.profile_photo_url
                                  )
                                : lawer_avt
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
                          <p className="text-base text-[var(--primary)]">
                            {itm.a} {/* last answer with link */}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* answer here */}
                    {itm.q && (
                      <div className="w-full sm:w-[calc(100%-100px)] ms-auto text-right mb-1">
                        <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px]">
                          you
                        </span>
                        {/* message  */}
                        <div className="w-full px-4 py-2 bg-[var(--slate-1)]">
                          <p className="text-base text-[var(--primary)]">
                            {itm.q}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {chatMessageData?.map((chat) => {
                  const {
                    sender_id,
                    id,
                    message,
                    chat_message_type,
                    created_at,
                  } = chat || {};

                  return (
                    <div key={id} className="flex flex-col-reverse">
                      {/* answer here */}
                      {sender_id == userData?.id ? (
                        <div className="w-full sm:w-[calc(100%-100px)] ms-auto text-right mb-1">
                          <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px]">
                            you
                          </span>
                          {/* message  */}
                          <div className="w-full px-4 py-2 bg-[var(--slate-1)]">
                            {chat_message_type === "text" && (
                              <p className="text-base text-[var(--primary)]">
                                {message}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="message">
                          {/* message here */}
                          {/* designation */}
                          <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px] capitalize">
                            {activityInfo?.expert?.full_name || "expert"}
                          </span>

                          <div className="w-full sm:w-[calc(100%-100px)] flex items-center gap-4">
                            {/* user img */}
                            <div className="max-w-[40px] h-10">
                              <Image
                                src={
                                  activityInfo?.expert?.profile_photo_url
                                    ? imgPath(
                                        activityInfo?.expert?.profile_photo_url
                                      )
                                    : lawer_avt
                                }
                                alt={
                                  activityInfo?.expert?.full_name ||
                                  "expert photo"
                                }
                                width={45}
                                height={45}
                                className="min-w-[40px] h-10 object-cover"
                              />
                            </div>
                            {/* message  */}
                            <div className="w-full px-4 py-2 bg-[var(--slate-1)]">
                              {chat_message_type === "text" && (
                                <p className="text-base text-[var(--primary)]">
                                  {message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ) : (
              conversation.map((itm, i) => (
                <div key={i} className="flex flex-col-reverse">
                  {/* message here */}
                  <div className="message">
                    {/* designation */}
                    <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px] capitalize">
                      Loren Doe , {categoryName.split("_").join(" ")} Assist
                    </span>

                    <div className="w-full sm:w-[calc(100%-100px)] flex items-center gap-4">
                      {/* user img */}
                      <div className="max-w-[40px] h-10 overflow-hidden">
                        <Image
                          src={lawer_avt}
                          alt="profile photo"
                          width={50}
                          height={50}
                          className="min-w-[40px] h-10 object-cover"
                        />
                      </div>
                      {/* message  */}
                      <div className="w-full px-4 py-2 bg-[var(--slate-1)]">
                        {commentAnimation && i === conversation.length - 1 ? (
                          <ConversationLoad />
                        ) : (
                          <p className="text-base text-[var(--primary)]">
                            {itm.a} {/* last answer with link */}
                            {arrayOfAnswer.length === i && (
                              <Link
                                href={`/pay-for-consultancy?category_name=${categoryName}&category_id=${categoryId}`}
                                className="underline text-[var(--secondary)]"
                              >
                                click here
                              </Link>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* answer here */}
                  {itm.q && (
                    <div className="w-full sm:w-[calc(100%-100px)] ms-auto text-right mb-1">
                      <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px]">
                        you
                      </span>
                      {/* message  */}
                      <div className="w-full px-4 py-2 bg-[var(--slate-1)]">
                        <p className="text-base text-[var(--primary)]">
                          {itm.q}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* ask questions input field */}
        <div className="bg-[var(--slate-2)] py-3 sm:py-4 px-3 sm:px-6">
          {activityId ? (
            <form onSubmit={submitMessageHandler}>
              {chatMessageData.length <= 0 && (
                <span className="text-xs text-[var(--secondary)] font-semibold">
                  One of our expert will join soon, please wait..
                </span>
              )}

              {isChatActive === 0 && (
                <div className="flex items-center justify-between px-2 lg:px-6 py-3 lg:py-5 bg-white shadow-xl border border-[var(--secondary)]">
                  <input
                    type="text"
                    className="w-full border-none outline-0 focus:outline-none focus:outline-0 focus:border-none"
                    // rows={2}
                    placeholder="Type your legal question here……."
                    onChange={(e) => setInputText(e.target.value)}
                    value={inputText}
                    readOnly={chatMessageData.length <= 0}
                  />

                  <button
                    type="submit"
                    className="text-base font-medium btn-secondary disabled:cursor-not-allowed disabled:opacity-40 block sm:hidden"
                    disabled={
                      inputText.length === 0 ||
                      commentAnimation ||
                      conversation.length === arrayOfAnswer.length + 1
                    }
                  >
                    Chat
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between mt-0 sm:mt-5">
                <p
                  // href="URL:void(0)"
                  className="text-xs text-[var(--primary)]"
                >
                  {onlineExperts} {categoryName.split("_").join(" ")} are online
                  now
                </p>

                {isChatActive === 0 && (
                  <button
                    type="submit"
                    className="text-base font-medium btn-secondary disabled:cursor-not-allowed disabled:opacity-40 hidden sm:block"
                    disabled={
                      inputText.length === 0 ||
                      commentAnimation ||
                      conversation.length === arrayOfAnswer.length + 1
                    }
                  >
                    Chat
                  </button>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="flex items-center justify-between px-2 lg:px-6 py-3 lg:py-5 bg-white shadow-xl border border-[var(--secondary)]">
                <input
                  type="text"
                  className="w-full border-none outline-0 focus:outline-none focus:outline-0 focus:border-none"
                  // rows={2}
                  placeholder="Type your legal question here……."
                  onChange={(e) => setInputText(e.target.value)}
                  value={inputText}
                  readOnly={conversation.length === arrayOfAnswer.length + 1}
                />

                <button
                  type="submit"
                  className="text-base font-medium btn-secondary disabled:cursor-not-allowed disabled:opacity-40 block sm:hidden"
                  disabled={
                    inputText.length === 0 ||
                    commentAnimation ||
                    conversation.length === arrayOfAnswer.length + 1
                  }
                >
                  Chat
                </button>
              </div>
              <div className="flex items-center justify-between mt-0 sm:mt-5">
                <p
                  // href="URL:void(0)"
                  className="text-xs text-[var(--primary)]"
                >
                  {onlineExperts} {categoryName.split("_").join(" ")} are online
                  now
                </p>
                <button
                  type="submit"
                  className="text-base font-medium btn-secondary disabled:cursor-not-allowed disabled:opacity-40 hidden sm:block"
                  disabled={
                    inputText.length === 0 ||
                    commentAnimation ||
                    conversation.length === arrayOfAnswer.length + 1
                  }
                >
                  Chat
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
