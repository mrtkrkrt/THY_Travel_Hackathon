import React from "react";
import { FaMapMarkedAlt, FaHamburger, FaHeadset, FaTaxi } from "react-icons/fa";
import { GiDirectionSigns, GiAirplaneDeparture } from "react-icons/gi";
import { MdLocalHotel } from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import "../../style/Card.style.css";

function livesupport() {
  return (
    <main className="main-card">
      <div className="card">
        <div className="card-img">
          <FaHeadset className="card-icon" />
        </div>
        <div className="card-descp">CANLI DESTEK</div>
      </div>
    </main>
  );
}

export default livesupport;
