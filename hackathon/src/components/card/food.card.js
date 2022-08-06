import React from "react";
import { FaMapMarkedAlt, FaHamburger, FaHeadset, FaTaxi } from "react-icons/fa";
import { GiDirectionSigns, GiAirplaneDeparture } from "react-icons/gi";
import { MdLocalHotel } from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import "../../style/Card.style.css";

function food() {
  return (
    <main className="main-card">
      <div className="card">
        <div className="card-img">
          <FaHamburger className="card-icon" />
        </div>
        <div className="card-descp">YEMEK MEKANLARI</div>
      </div>
    </main>
  );
}

export default food;
