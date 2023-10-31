"use client";

import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import Image from "next/image";
import { useState } from "react";
import {
  BsEmojiSmile,
  BsFillStarFill,
  BsFolder,
  BsSearch,
  BsSend,
} from "react-icons/bs";
import avt_s from "/public/images/avt/avt_s.png";

const ConsultantChatMain = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  function onClick(emojiData) {
    setSelectedEmoji(emojiData.unified);
  }

  return (
    <section className="my-5 md:my-10 px-3 2xl:px-0">
      {/* <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row gap-4"> */}
      {/* Side Bar Here */}
      {/* <SideBar /> */}

      <div className="max-w-[1296px] mx-auto bg-white shadow-md">
        <div className="w-full relative">
          {/* Profile info */}
          <div className="flex flex-wrap items-center justify-between border px-2 lg:px-5 py-3">
            <div className="w-3/4 lg:w-1/2 flex items-start sm:items-center gap-2 lg:gap-5 border-r">
              <div className="w-[50px] lg:w-[80px] h-[50px] lg:h-[80px] rounded-full overflow-hidden">
                <Image src={avt_s} alt="avt_s" />
              </div>

              <div className="text-[var(--primary)]">
                <h3 className="text-lg md:text-2xl">Jonathan Smith</h3>
                <p className="text-sm md:text-base">Family Lawyer</p>
                <div className="flex items-center gap-2 text-xs md:text-base">
                  <div className="flex items-center gap-[2px] md:gap-1 text-[var(--secondary)]">
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                  </div>
                  <span>1023 Rating</span>
                </div>
              </div>
            </div>

            <div className="w-1/4 lg:w-1/2 flex items-center justify-end">
              <button
                className="icon-primary"
                onClick={() => setShowSearch(!showSearch)}
              >
                <BsSearch />
              </button>
            </div>
          </div>

          {/* Search chat */}
          <div
            className={`w-full absolute z-[5] ${
              showSearch
                ? "h-10 border border-t-0 shadow-xl overflow-clip"
                : "h-0 overflow-hidden"
            } transition-all duration-300`}
          >
            <input
              className="w-full outline-0 px-3 py-2 text-[var(--primary)]"
              type="text"
              name="search"
              placeholder="Search chat..."
            />
          </div>
        </div>

        {/* conversations  */}
        <div className="h-[320px] md:h-[600px] bg-[var(--slate)] p-[10px_14px] lg:p-[10px_24px] overflow-y-auto chat scrollbar-thick">
          {/* message here */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-full xl:w-1/2 mt-2">
              {/* designation */}
              <p className="flex items-center gap-10 text-xs text-[var(--primary)] opacity-80 ms-[55px]">
                <span>Loren Doe</span>
                <span>01:40 AM</span>
              </p>

              <div className="w-full flex items-start gap-2 sm:gap-[10px] mt-[2px]">
                {/* user img */}
                <Image src={avt_s} alt="profile photo" width={45} height={45} />
                {/* message  */}
                <div className="px-4 sm:px-8 py-2 md:py-4 bg-[var(--slate-1)] rounded-e-full rounded-b-full">
                  <p className="text-sm sm:text-base leading-4 sm:leading-5 text-[var(--primary)]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* answer here */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-full xl:w-1/2 ms-auto mt-2">
              {/* designation */}
              <p className="flex items-center justify-end gap-10 text-xs text-[var(--primary)] opacity-80 me-[55px]">
                <span>Loren Doe</span>
                <span>01:40 AM</span>
              </p>

              <div className="w-full ms-auto text-right flex items-center gap-2 sm:gap-[10px] mt-[2px]">
                {/* message  */}
                <div className="ms-auto px-4 sm:px-8 py-2 md:py-4 bg-[var(--slate-1)] rounded-s-full rounded-b-full">
                  <p className="text-sm sm:text-base leading-4 sm:leading-5 text-[var(--primary)]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                {/* user img */}
                <Image src={avt_s} alt="profile photo" width={45} height={45} />
              </div>
            </div>
          ))}
        </div>

        {/* write message section*/}
        <div className="p-2 md:p-4">
          <form className="flex items-center justify-around">
            <label className="flex cursor-pointer icon-primary">
              <BsFolder />
              <input type="file" className="hidden" />
            </label>
            <input
              className="p-2 outline-0 w-full"
              type="text"
              name="message"
              placeholder="Write your message here...."
              required
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
              <button type="submit" className="icon-primary">
                <BsSend />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default ConsultantChatMain;
