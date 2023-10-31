"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPal = () => {
  return (
    <>
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, tempora!
      </h2>
      <PayPalScriptProvider
        options={{
          clientId:
            "AfSuAXGVEVyE-q_jJ17hXYdmQ9_dqXfpSEvd8d1CrXqKoePWInKvRwBcYLxMJ2mVxM8NSekZIfMX_p-T",
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          fundingSource="paypal"
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PayPal;
