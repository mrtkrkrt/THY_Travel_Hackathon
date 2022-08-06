import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import NavCard from "../components/card/navigate.card";
import "../style/Pages.style.css";

//cards
import Turist from "../components/card/turistik.card";
import FlightInfo from "../components/card/flight.info";
import Food from "../components/card/food.card.js";
import Hotel from "../components/card/hotel.card.js";
import Ticket from "../components/card/ticket.card.js";
import LiveSupport from "../components/card/livesupport.card.js";
import Transportation from "../components/card/transportation.card.js";
import HeroSection from "../components/HeroSection";

export default function Pages() {
  return (
    <div className="main">
      {" "}
      <HeroSection />
      <div className="deneme">
        {" "}
        {/* <Link to="/webxr">WebXr Sayfası</Link> */}
        <main className="main-card">
          {" "}
          <Link to="/webxr">
            <NavCard />
          </Link>
          <Link to="/tourist-attractions">
            <Turist />
          </Link>
          <Link to="flight-info">
            <FlightInfo />
          </Link>
          <Link to="/food">
            <Food />
          </Link>
          <Link to="/hotel">
            <Hotel />
          </Link>
          <Link to="/ticket">
            <Ticket />
          </Link>
          <Link to="/livesupport">
            <LiveSupport />
          </Link>
          <Link to="/transportation">
            <Transportation />
          </Link>
        </main>
      </div>
    </div>
  );
}