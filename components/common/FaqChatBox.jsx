import useApiCall from "@/hooks/useApiCall";
import ConversationLoad from "@/ui/conversationLoad/ConversationLoad";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import lawer_avt from "/public/images/avt/lawer_avt.png";

const FaqChatBox = () => {
  const [mobileActive, setMobileActive] = useState(false);
  const [commentAnimation, setCommentAnimation] = useState(true);
  const { data, error, fetchData, isLoading } = useApiCall();

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

  // if with > 767px then this useEffect will work
  useEffect(() => {
    if (!isMobile) {
      setMobileActive(false);
    }
  }, [isMobile]);

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
  }, []);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/predefinedAnswer`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`mt-8 md:mt-0 w-full sm:max-w-[480px] ${
        mobileActive &&
        "fixed top-0 left-0 w-screen h-screen bg-[var(--slate-2)] z-50 !mt-0"
      }`}
      onClick={handleChatBox}
    >
      <div className="flex items-center gap-3 md:gap-5 bg-[var(--primary)] px-2 md:px-5 py-1 md:py-2">
        {/* profile image */}
        <div className="w-16 h-16 overflow-hidden">
          <Image src={lawer_avt} alt="Lawyer img" height={60} width={60} />
        </div>

        {/* profile summery */}
        <div className="text-white">
          <p className="text-sm">Loren Doe</p>
          <p className="text-sm my-1">2,592 satisfied customers</p>
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
        className={`h-[140px] ${
          mobileActive && "h-[calc(100%-235px)]"
        } bg-white p-[10px_14px] lg:p-[10px_24px] overflow-y-auto`}
      >
        {/* conversations  */}

        {/* message here */}
        {[...Array(1)].map((_, i) => (
          <div key={i} className="message">
            {/* designation */}
            <span className="text-xs text-[var(--primary)] opacity-60 ms-[60px] capitalize">
              Loren Doe Assist
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
                {commentAnimation ? (
                  <ConversationLoad />
                ) : (
                  <p className="text-base text-[var(--primary)]">
                    How Can I help you
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* answer here */}
        <div className="w-full sm:w-[calc(100%-100px)] ms-auto text-right mt-1">
          {/* <span className="text-xs text-[var(--primary)] opacity-60 ms-[70px]">
        Loren Doe , Lawyer Assist
      </span> */}
          {/* message  */}
          {/* <div className="w-full px-4 py-2 bg-[var(--slate-1)]">
        <p className="text-base text-[var(--primary)]">
          How Can I help you
        </p>
      </div> */}
        </div>
      </div>

      {/* ask questions input field */}
      <div className="bg-[var(--slate-2)] py-3 sm:py-4 px-3 sm:px-6">
        <form>
          <div className="flex items-center justify-between px-2 lg:px-6 py-1 lg:py-3 bg-white shadow-xl border border-[var(--secondary)]">
            <textarea
              className="w-full border-none outline-0 resize-none"
              rows={2}
              placeholder="Type your legal question here……."
            ></textarea>
          </div>
          <div className="flex items-center justify-between mt-5">
            <Link href="#" className="text-xs text-[var(--primary)] text-hover">
              2 are online now
            </Link>
            <Link
              href="/pay-for-consultancy"
              className="text-base font-medium btn-secondary"
            >
              Start Chat
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaqChatBox;
