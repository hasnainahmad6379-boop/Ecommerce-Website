import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import Popular from "../components/popular/Popular.jsx";
import Offers from "../components/Offers/Offers.jsx";
import NewCollections from "../components/newCollections/NewCollections.jsx";
import NewsLetter from "../components/newsLetter/NewsLetter.jsx";

const shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default shop;
