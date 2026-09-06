import React from "react";
import "./Hero.css";
import hand from "../assets/hand_icon.png";
import arrow_icon from "../assets/arrow.png";
import hero_image from "../assets/hero_image.png";
const Hero = () => {
  return (
    <div className="Hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="">
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand} alt="" />
          </div>
          <p>Collections</p>
          <p>for Everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collections</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
