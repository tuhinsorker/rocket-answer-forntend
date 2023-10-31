// CheckoutForm.js
import useApiCall from "@/hooks/useApiCall";
import { disconnectSocket, getSocket, initiateSocket } from "@/utils/socket";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spin from "../spin/Spin";

const CheckoutForm = ({ categoryId, categoryName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // fetch Data hook
  const { data: userData, isLoading, fetchData } = useApiCall();

  // get cookies
  const token = Cookies.get("token");

  const conversation = localStorage.getItem("conversation");

  const buyPageHandler = async (data) => {
    const socket = getSocket();

    try {
      setIsSuccess(true);

      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/buyPackage`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          category_id: categoryId,
          payment_method_id: 2,
          payment_details: data,
        },
      });

      console.log("Response", res);

      if (res.status === 200) {
        const res = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL_SOCKET}/create_activity`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            title: `Looking for good ${categoryName}`,
            description: `Looking for good ${categoryName}`,
            // questions: conversation,
            expert_category_id: categoryId,
            // expert_sub_category_id: 2,
            customer_id: userData.id,
            // price: 1500,
          },
        });

        console.log("response...........", res);

        // activity id set to local storage
        localStorage.setItem("activity_id", res.data.data);

        socket.emit("activity_created", {
          title: `Looking for good ${categoryName}`,
          description: `Looking for good ${categoryName}`,
          topic: `category_${categoryId}`,
          category_id: categoryId,
          user_type: "customer",
          user_id: userData.id,
        });

        // redirect to dashboard
        router.push(
          `/dashboard/board?category_name=${categoryName.toLowerCase()}&activity_id=${
            res.data.data
          }`
        );
      }
    } catch (error) {
      console.error("There was an error processing the payment", error.message);
      console.log(error);

      setError(error.response.data.message);

      // fail message 😢
      toast.error(error.response.data.message);
    } finally {
      setIsSuccess(false);
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable your form submission button to avoid errors.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Use Stripe.js to create a token
      const { token } = await stripe.createToken(cardElement);

      // Handle the token (send it to your backend for payment processing)
      if (token) {
        buyPageHandler(token);
        console.log("Token:", token);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

  // socket connection here
  useEffect(() => {
    initiateSocket();

    const socket = getSocket();

    socket.on("connect", () => {
      console.log("connected to socket", "socket id = " + socket.id);

      socket.emit("get_online_experts", {
        user_id: 68,
        user_type: "customer",
        category_id: categoryId,
        socket_id: socket.id,
      });
    });

    socket.on("online_experts", (message) => {
      console.log("total online experts", message);
    });

    return () => {
      disconnectSocket();
    };
  }, [categoryId]);

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      {!isLoading && (
        <button
          type="submit"
          className="flex items-center justify-center w-full text-[16px] leading-[20px] btn-secondary disabled:opacity-70 disabled:cursor-not-allowed mt-[30px]"
          disabled={isSuccess}
        >
          Next
          {isSuccess && <Spin />}
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
