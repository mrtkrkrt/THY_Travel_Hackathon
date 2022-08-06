import React from "react";
import { FaMapMarkedAlt, FaHamburger, FaHeadset, FaTaxi } from "react-icons/fa";
import { GiDirectionSigns, GiAirplaneDeparture } from "react-icons/gi";
import { MdAirplaneTicket } from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import "../../style/Card.style.css";

function ticket() {
  return (
    <main className="main-card">
      <div className="card">
        <div className="card-img">
          <MdAirplaneTicket className="card-icon" />
        </div>
        <div className="card-descp">BİLET AL</div>
      </div>
    </main>
  );
}

export default ticket;
