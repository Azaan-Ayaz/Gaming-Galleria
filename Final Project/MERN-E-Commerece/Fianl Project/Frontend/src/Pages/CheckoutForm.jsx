import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
const CheckoutForm = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, easing: "ease-out-back", offset: 120 });
  }, []);

  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url: "http://localhost:5173/last",
      },
      //  Swal.fire({
      //     title: 'Payment Successful!',
      //     text: 'Thank you for booking your tour with us.',
      //     icon: 'success',
      //   })
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
  };

  return (
    <div className="bg-cover flex justify-center  items-center text-center  h-[36%]">
      <div className="w-[30vw]  h-[60vh] flex p-4 justify-center items-center text-center border-2 mb-5 rounded-lg bg-white">
        {" "}
        <form className="w-[25vw]  " onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-16 text-[#415161]  ">
            CheckOut
          </h1>

          <PaymentElement />
          <button
            disabled={!stripe}
            className="bg-orange-500 flex gap-5 px-4 p-2 rounded-md text-white mt-4 text-lg"
          >
            Pay{"                                   "}$
          </button>

          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
