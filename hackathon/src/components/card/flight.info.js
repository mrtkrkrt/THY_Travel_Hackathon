import React from "react";
import { FaMapMarkedAlt, FaHamburger, FaHeadset, FaTaxi } from "react-icons/fa";
import { GiDirectionSigns, GiAirplaneDeparture } from "react-icons/gi";
import { MdLocalHotel } from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import "../../style/Card.style.css";

function flight() {
  return (
    <main>
      <div className="card">
        <div className="card-img">
          <GiAirplaneDeparture className="card-icon" />
        </div>
        <div className="card-descp">UÇUŞ BİLGİLERİ</div>
      </div>
    </main>
  );
}

export default flight;
