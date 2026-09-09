import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
