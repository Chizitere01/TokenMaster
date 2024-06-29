import React from "react";
import { MoonPayBuyWidget } from "@moonpay/moonpay-react";

const Home = () => {
  return (
    <MoonPayBuyWidget
      variant="overlay"
      baseCurrencyCode="usd"
      baseCurrencyAmount="100"
      defaultCurrencyCode="eth"
      onLogin={async () => console.log("Customer logged in!")}
      visible
    />
  );
};

export default Home;
