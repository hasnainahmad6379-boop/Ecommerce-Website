import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({
              currency: "usd",
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements
          key={clientSecret}
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
