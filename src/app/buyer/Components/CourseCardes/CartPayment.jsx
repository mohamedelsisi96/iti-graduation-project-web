"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CartPayment({ courses, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    debugger;

    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    const totalAmount = courses.reduce(
      (sum, course) => sum + parseInt(course?.data?.price),
      0
    );

    // Create a PaymentIntent on the server
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const { clientSecret, error: backendError } = await response.json();

    if (backendError) {
      setError(backendError);
      setLoading(false);
      return;
    }

    // Confirm the payment on the client
    const { error: stripeError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (stripeError) {
      setError(stripeError.message);
    } else {
      // Payment successful
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="mt-7">
      <CardElement />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="mt-4 flex rounded-md h-12 w-70 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300 p-2"
      >
        {loading ? "Processing..." : "Pay for All Courses"}
      </button>
    </div>
  );
}
