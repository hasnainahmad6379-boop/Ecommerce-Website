import React from "react";
import "./BreadCrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const BreadCrum = ({ product }) => {
  return (
    <div className="breadcrum">
      HOME
      <img src={arrow_icon} alt="Arrow" />
      SHOP
      <img src={arrow_icon} alt="Arrow" />
      {product.category}
      <img src={arrow_icon} alt="Arrow" />
      {product.name}
    </div>
  );
};

export default BreadCrum;
