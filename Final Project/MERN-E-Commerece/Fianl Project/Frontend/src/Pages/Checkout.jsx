import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const initStripe = async () => {
  const res = await axios.get("http://localhost:8080/publishable-key");
  const publishableKey = await res.data.publishable_key;

  return loadStripe(publishableKey);
};
const Checkout = () => {
  const stripePromise = initStripe();

  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });
  useEffect(() => {
    async function createPaymentIntent() {
      await axios
        .post("http://localhost:8080/create-payment-intent", {})
        .then((res) => {
          console.log(res.data);
          setClientSecretSettings({
            clientSecret: res.data.client_secret,
            loading: false,
          });
        })
        .catch((e) => console.log(e));
    }
    createPaymentIntent();
  }, []);
  return (
    <div>
      <div>
        {clientSecretSettings.loading ? (
          <h1>Loading ...</h1>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecretSettings.clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
