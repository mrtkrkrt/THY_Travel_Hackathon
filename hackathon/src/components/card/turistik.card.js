import React from "react";
import { FaMapMarkedAlt, FaHamburger, FaHeadset, FaTaxi } from "react-icons/fa";
import { GiDirectionSigns, GiAirplaneDeparture } from "react-icons/gi";
import { MdLocalHotel } from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import "../../style/Card.style.css";

function turistik() {
  return (
    <main className="main-card">
      <div className="card">
        <div className="card-img">
          <GiDirectionSigns className="card-icon" />
        </div>
        <div className="card-descp">TURİSTİK YERLER</div>
      </div>
    </main>
  );
}

export default turistik;
