"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const faqData = [
  {
    id: 1,
    question: "Does my subscription automatically renew?",
    answer:
      "At ThemeTags, our mission has always been focused on bringing openness and transparency to the design process. We’ve always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We’re proud to be a part of creating a more open culture and to continue building a product that supports this vision.",
  },
  {
    id: 2,
    question: "Can I cancel my subscription",
    answer:
      "At ThemeTags, our mission has always been focused on bringing openness and transparency to the design process. We’ve always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We’re proud to be a part of creating a more open culture and to continue building a product that supports this vision.",
  },
  {
    id: 3,
    question: "Do I need to renew my license to receive fixes?",
    answer:
      "At ThemeTags, our mission has always been focused on bringing openness and transparency to the design process. We’ve always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We’re proud to be a part of creating a more open culture and to continue building a product that supports this vision.",
  },
  {
    id: 4,
    question: "Can I cancel my subscription",
    answer:
      "At ThemeTags, our mission has always been focused on bringing openness and transparency to the design process. We’ve always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We’re proud to be a part of creating a more open culture and to continue building a product that supports this vision.",
  },
  {
    id: 5,
    question: "What happens if I don’t renew my license?",
    answer:
      "At ThemeTags, our mission has always been focused on bringing openness and transparency to the design process. We’ve always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We’re proud to be a part of creating a more open culture and to continue building a product that supports this vision.",
  },
  {
    id: 6,
    question: "Where can I find the end user license agreement?",
    answer:
      "At ThemeTags, our mission has always been focused on bringing openness and transparency to the design process. We’ve always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We’re proud to be a part of creating a more open culture and to continue building a product that supports this vision.",
  },
];

const FaqMain = () => {
  const [collapsed, setCollapsed] = useState("");

  function toggleCollapse(value) {
    if (collapsed === value) {
      setCollapsed("");
    } else {
      setCollapsed(value);
    }
  }

  return (
    <section className="m-[40px_0px_60px] md:m-[60px_0px_120px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto grid gap-2 md:gap-5">
        {faqData.map(({ id, answer, question }) => (
          <div
            key={id}
            className="py-3 md:py-4 px-4 md:px-6 flex flex-col rounded-lg border"
          >
            <div
              className="w-full cursor-pointer flex items-center justify-between"
              onClick={() => toggleCollapse(`collapse${id}`)}
            >
              {/* Question  */}
              <h3
                className={`text-base md:text-xl font-medium ${
                  collapsed === `collapse${id}`
                    ? "text-[var(--secondary)]"
                    : "text-[var(--primary)]"
                }`}
              >
                {question}
              </h3>

              {/* Icon */}
              <motion.button
                animate={{ rotate: collapsed !== `collapse${id}` ? 0 : 180 }}
                transition={{ duration: 0.5 }}
              >
                <BsChevronDown
                  className={`${
                    collapsed === `collapse${id}`
                      ? "text-[var(--secondary)]"
                      : "text-[var(--primary)]"
                  }`}
                />
              </motion.button>
            </div>
            <motion.div
              className="w-full md:w-4/5 h-0 overflow-hidden"
              animate={{ height: collapsed !== `collapse${id}` ? 0 : "auto" }}
              transition={{ duration: 0.5 }}
            >
              {/* Answer */}
              <p className="text-sm text-[VAR(--gray-2)] mt-3">{answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqMain;
