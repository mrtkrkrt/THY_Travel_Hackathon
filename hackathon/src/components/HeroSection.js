import React from "react";
import Slider from "react-slick";
import HavaDurumu from "./HavaDurumu";
import "../style/Havadurumu.css";

export default function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider  ">
      <Slider {...settings}>
        <div className="weather-bg">
          <HavaDurumu />
        </div>
        <div>2</div>
        <div>
          <h3>3</h3>
        </div>
      </Slider>
    </div>
  );
}
