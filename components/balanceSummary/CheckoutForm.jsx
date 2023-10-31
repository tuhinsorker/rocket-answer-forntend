import Spin from "@/ui/spin/Spin";
import { successAlert } from "@/utils/alerts";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const CheckoutForm = ({ setShowModal, setAction }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  //get the token from the cookie
  const token = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProcessing(true);

    const { paymentMethod } = await stripe.createPaymentMethod({
      card: elements.getElement(CardNumberElement),
      type: "card",
    });

    //  Handles the addition of a payment method using Stripe.
    if (paymentMethod) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_URL}/general/add_stripe_methods`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            pm_id: paymentMethod.id,
          },
        });

        if (data.code === 200) {
          /**
           * Display a `successAlert` message.
           *
           * @param {string} title - The title of the success alert.
           * @param {string} text - The text to display in the success alert.
           */
          successAlert("Good job!", "Payment Method Add successful!");

          setAction(data);

          // console.log(data);
          setShowModal(false);
        }
      } catch (error) {
        setProcessing(false);
        console.error("error", error.message);
      } finally {
        setProcessing(false);
      }
    } else {
      setProcessing(false);
      setError("Invalid credentials!");
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: "system-ui",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#60600",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const cardHandleChange = (event) => {
    const { error } = event;
    setError(error ? error.message : "");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-5 lg:mt-[30px]">
      <div className="w-full col-span-6 mb-4">
        <label className="block mb-2 text-sm font-normal text-gray-900">
          Card Number <span className="text-primary-100">*</span>
        </label>
        <CardNumberElement
          className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50"
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>

      <div className="flex w-full col-span-6 gap-3 mb-2">
        <div className="w-full">
          <label className="block mb-2 text-sm font-normal text-gray-900">
            Expiration <span className="text-primary-100">*</span>
          </label>
          <CardExpiryElement
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50"
            options={cardStyle}
            onChange={cardHandleChange}
          />
        </div>
        <div className="w-full">
          <label className="block mb-2 text-sm font-normal text-gray-900">
            CVC <span className="text-primary-100">*</span>
          </label>
          <CardCvcElement
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50"
            options={cardStyle}
            onChange={cardHandleChange}
          />
        </div>
      </div>

      <div className="row mb-2">
        <button
          type="submit"
          className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary disabled:opacity-70 disabled:cursor-not-allowed mt-[30px]"
          disabled={processing}
        >
          Save
          {processing && <Spin />}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
