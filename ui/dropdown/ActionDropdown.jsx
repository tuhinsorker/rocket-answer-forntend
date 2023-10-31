import { successAlert } from "@/utils/alerts";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Fragment, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Spin from "../spin/Spin";

const ActionDropdown = ({ pm_id, setAction }) => {
  const [processing, setProcessing] = useState(false);
  const [isSetDefault, setIsSetDefault] = useState(false);

  //get the token from the cookie
  const token = Cookies.get("token");

  // delete  payment method function
  const handleDeletePaymentMethod = async () => {
    setProcessing(true);

    //  Handles the addition of a payment method using Stripe.
    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/general/delete_stripe_payment_method`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          pm_id,
        },
      });

      if (data.code === 200) {
        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Payment Method successful!");

        setAction(data);

        // console.log(data);
      }
    } catch (error) {
      setProcessing(false);
      console.error("error", error.message);
    } finally {
      setProcessing(false);
    }
  };

  // set default payment method function
  const handleDefaultPaymentMethod = async () => {
    setIsSetDefault(true);

    //  Handles the addition of a payment method using Stripe.
    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/general/update_stripe_payment_methods`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          pm_id,
        },
      });

      if (data.code === 200) {
        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Payment method set as default successful!");

        setAction(data);
      }
    } catch (error) {
      setIsSetDefault(false);
      console.error("error", error.message);
    } finally {
      setIsSetDefault(false);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <BsThreeDotsVertical />
      </Menu.Button>

      <Transition as={Fragment}>
        {/* dropdown-items */}
        <Menu.Items className="absolute right-0 md:left-0 text-white py-2 rounded-md shadow-2xl profile-dropdown">
          <Menu.Item>
            <button
              className="w-full text-left px-4 py-1 font-medium flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleDeletePaymentMethod}
              disabled={processing}
            >
              Delete
              {processing && <Spin />}
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="w-full text-left px-4 py-1 font-medium flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleDefaultPaymentMethod}
              disabled={isSetDefault}
            >
              Set As Default
              {isSetDefault && <Spin />}
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ActionDropdown;
