import useApiCall from "@/hooks/useApiCall";
import { successAlert } from "@/utils/alerts";
import { getSocket } from "@/utils/socket";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spin from "../ui/spin/Spin";

const options = {
  mode: "payment",
  amount: 9,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const Stripe = ({ paymentMethodsData, categoryId, price, categoryName }) => {
  const { client_id } = paymentMethodsData?.find(
    (paymentMethod) => paymentMethod.name === "Strip"
  );

  const stripePromise = loadStripe(client_id);

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        publicKey={client_id}
        price={price}
        categoryId={categoryId}
        categoryName={categoryName}
      ></CheckoutForm>
    </Elements>
  );
};

export default Stripe;

const CheckoutForm = ({ publicKey, categoryId, price, categoryName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { data: userData, isLoading, fetchData } = useApiCall();

  //get the token from the cookie
  const token = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!error) {
      setProcessing(true);
    }

    // create a new payment Method object
    const { paymentMethod } = await stripe.createPaymentMethod({
      card: elements.getElement(CardNumberElement),
      type: "card",
    });

    // create stripe token
    const stripeToken = await stripe.createToken(
      elements.getElement(CardNumberElement)
    );

    // console.log(stripeToken);

    if (stripeToken.token) {
      buyPageHandler(stripeToken.token.id, paymentMethod);
    } else {
      setProcessing(false);
      toast.error("Stripe server is not respond properly");
    }
  };

  // buy package handling
  const buyPageHandler = async (stripeToken, paymentMethod) => {
    const socket = getSocket();

    // get the conversation
    const conversations = localStorage.getItem("conversation");

    setProcessing(true);

    try {
      // setIsSuccess(true);

      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/buyPackage`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          category_id: categoryId,
          payment_method_id: 2,
          token: stripeToken,
        },
      });

      if (res.data.code == 200) {
        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Payment", "Payment successful!");

        // create a new activity
        const activityResponse = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL_SOCKET}/create_activity`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            title: `Looking for good ${categoryName}`,
            description: `Looking for good ${categoryName}`,
            // questions: conversation,
            question_answers: conversations,
            expert_category_id: categoryId,
            // expert_sub_category_id: 2,
            customer_id: userData?.id,
            // price: 1500,
          },
        });

        // activity id set to local storage
        localStorage.setItem("activity_id", activityResponse.data.data);

        // activity emit options
        const option = {
          title: `Looking for good ${categoryName}`,
          description: `Looking for good ${categoryName}`,
          topic: `category_${categoryId}`,
          category_id: categoryId,
          user_type: "customer",
          user_id: userData?.id,
        };

        // Create activity emit
        socket.emit("activity_created", option);

        // remove connection from the local storage
        localStorage.removeItem("conversation");

        // redirect to the category
        router.push(
          `/category/${categoryName.toLowerCase()}?categoryId=${categoryId}&activity_id=${
            activityResponse.data.data
          }`
        );
      } else {
        setProcessing(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setProcessing(false);

      // toast message
      toast.error(error.response.data.message);

      // set error message
      setError(error.response.data.message);

      console.log(error);

      // logo error message
      console.error("error", error.message);
    } finally {
      setProcessing(false);
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

  // get profile data
  useEffect(() => {
    fetchData({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      <form onSubmit={handleSubmit} className="mt-5 lg:mt-[30px]">
        <div className="w-full col-span-6 mb-4">
          <label className="block mb-2 text-sm font-normal text-gray-900">
            Card Number <span className="text-primary-100">*</span>
          </label>
          <CardNumberElement
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 focus:ring ring-primary-100 focus:border-primary-100"
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
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300"
              options={cardStyle}
              onChange={cardHandleChange}
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-normal text-gray-900">
              CVC <span className="text-primary-100">*</span>
            </label>
            <CardCvcElement
              className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300 focus:border-primary-100"
              options={cardStyle}
              onChange={cardHandleChange}
            />
          </div>
        </div>

        {error && (
          <div className="-mt-2 leading-4">
            <span className="text-xs text-red-500">{error}</span>
          </div>
        )}

        <div className="row mb-2">
          <button
            type="submit"
            className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary disabled:opacity-70 disabled:cursor-not-allowed mt-[30px]"
            disabled={processing}
          >
            Pay ${price}
            {processing && <Spin />}
          </button>
        </div>
      </form>
    </>
  );
};
