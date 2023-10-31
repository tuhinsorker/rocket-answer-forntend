import { NextResponse } from "next/server";

import stripe from "stripe";

const stripeSecretKey =
  "sk_test_51NaYARSGbsaK8rABEStdJ5FliggkfAIKDNs9zMp4PEaD1EKkh3XH4yhQg750IbzxTQMFZ05tHqFAWig6zJli9Pvu006RItgUa9";
const stripeInstance = new stripe(stripeSecretKey);

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json({
      status: 405,
      error: {
        message: "Method not allowed .............",
      },
    });
  }

  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      description: "Payment intent",
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },

      amount: 10, // Amount in cents
      currency: "usd",
      // payment_method_types: ["card"],
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      status: 200,
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: { message: "server error" },
    });
  }
}
