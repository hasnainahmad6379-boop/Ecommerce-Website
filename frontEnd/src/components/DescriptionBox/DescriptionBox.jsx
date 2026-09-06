import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform that allows customers to
          browse, compare, and purchase products over the internet. It provides
          a convenient way for businesses to showcase their products and reach
          customers beyond physical locations. Customers can view product
          details, prices, images, and reviews before making a purchase.
          E-commerce websites also provide features such as shopping carts,
          secure payments, order tracking, and user accounts. They save
          customers time by allowing them to shop from anywhere and at any time.
          For businesses, e-commerce helps reduce operating costs and provides
          opportunities to reach a wider audience. Overall, e-commerce has made
          online shopping faster, easier, and more accessible.
        </p>
        <p>
          E-commerce websites allow businesses to sell products online while
          giving customers a simple and convenient way to shop from anywhere.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
