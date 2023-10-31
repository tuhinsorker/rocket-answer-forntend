import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const PayPayment = ({
  children,
  email,
  price,
  categoryId,
  paymentMethodsData,
}) => {
  const router = useRouter();
  const [success, setSuccess] = useState("");

  // get cookies
  const token = Cookies.get("token");

  const handlePayment = useCallback(() => {
    // Implement any additional actions before initiating the payment
    // (e.g., validating the amount, checking user information, etc.)
    paypal
      .Buttons({
        fundingSource: paypal.FUNDING.PAYPAL,
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price || 10,
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            // Handle successful payment
            // console.log("Payment completed:", details);

            // Implement any actions you need after the payment is successful
            if ((details.status = "COMPLETED")) {
              // setSuccess(details.status);
              buyPageHandler(details);
              console.log("Payment completed:", details);
            }
          });
        },
        onError: (error) => {
          // Handle payment errors
          console.error("Payment error:", error);
          // Implement any actions you need for failed payments
        },
      })
      .render("#paypal-button-container");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  // const handleSignUp = async () => {
  //   try {
  //     const res = await axios({
  //       method: "post",
  //       url: `${process.env.NEXT_PUBLIC_BASE_URL}/customer_register`,
  //       data: {
  //         email: email,
  //         password: "password",
  //         password_confirmation: "password",
  //       },
  //     });

  //     if (res.status === 200) {
  //       const res = await axios({
  //         method: "post",
  //         url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
  //         data: {
  //           email: email,
  //           password: "password",
  //         },
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (res.data.code === 200) {
  //         Cookies.set("token", res.data.data.access_token, { expires: 1 });

  //         router.push("/dashboard");
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response.data) {
  //       router.push("/");
  //     }
  //   }
  // };

  const buyPageHandler = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/buyPackage`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          category_id: categoryId,
          payment_method_id: 1,
          payment_details: data,
        },
      });

      // redirect to dashboard
      // router.push("/membership");

      //login successful message 😊
      toast.success(res.data.message);
    } catch (error) {
      console.error("There was an error processing the payment", error.message);

      console.log(error);

      // fail message 😢
      toast.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   if (success) {
  //     handleSignUp();
  //   }
  // }, [success]);

  useEffect(() => {
    const { client_id } = paymentMethodsData?.find(
      (paymentMethod) => paymentMethod.name === "Paypal"
    );

    // Load the PayPal SDK script after the component mounts
    const script = document.createElement("script");
    // AfSuAXGVEVyE-q_jJ17hXYdmQ9_dqXfpSEvd8d1CrXqKoePWInKvRwBcYLxMJ2mVxM8NSekZIfMX_p-T
    script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}`;
    script.async = true;
    script.onload = handlePayment;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [handlePayment, paymentMethodsData]);

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      {children}
    </>
  );
};

export default PayPayment;
