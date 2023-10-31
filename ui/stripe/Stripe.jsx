import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { loadStripe } from "@stripe/stripe-js";

const Stripe = ({ publicKey, categoryId, price, categoryName }) => {
  const stripePromise = loadStripe(publicKey);

  return (
    <Elements
      stripe={stripePromise}
      options={{ amount: price * 1 || 1, mode: "payment", currency: "usd" }}
    >
      <CheckoutForm categoryId={categoryId} categoryName={categoryName} />
    </Elements>
  );
};

export default Stripe;
