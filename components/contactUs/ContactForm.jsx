import Spin from "@/ui/spin/Spin";
import axios from "axios";
import { useState } from "react";

const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  // input form data
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const HandleContactForm = async (e) => {
    e.preventDefault();

    setIsSuccess(true);

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/customer/submit-contact-query`,
        data: {
          name: inputData.name,
          email: inputData.email,
          message: inputData.message,
        },
      });

      if (res.status === 200) {
        // remove the error message
        setError("");

        // set input data empty
        setInputData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      // set error message
      setError(error.response.data.message);
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <div className="bg-[var(--slate-2)] py-[30px] md:py-10 px-5 md:px-[30px]">
      <h3 className="text-2xl md:text-4xl left-7 md:leading-[42px] text-[var(--primary)] font-medium">
        Ready to get started?
      </h3>
      <form
        className="grid gap-3 sm:gap-5 mt-5 md:mt-10"
        onSubmit={HandleContactForm}
      >
        <input
          className="form-item"
          type="text"
          name="name"
          placeholder="Enter Name"
          required
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
          value={inputData.name}
        />
        <input
          className="form-item"
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          onChange={(e) =>
            setInputData({ ...inputData, email: e.target.value })
          }
          value={inputData.email}
        />

        <textarea
          className="form-item"
          rows={4}
          placeholder="Message"
          onChange={(e) =>
            setInputData({ ...inputData, message: e.target.value })
          }
          value={inputData.message}
        />

        {error && (
          <div className="-mt-5 leading-4">
            <span className="text-xs text-red-500">{error}</span>
          </div>
        )}

        <div className="inline-flex items-center justify-start mt-2 md:mt-5">
          <button
            type="submit"
            className="text-[16px] leading-[20px] btn-secondary disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSuccess}
          >
            Send Message
            {isSuccess && <Spin />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
