import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AppBarComponent from "./components/AppBarComponent";
import Pages from "./views/Pages";
import TouristAttractions from "./views/TouristAttractions";
import WebXR from "./views/WebXR";

//Components
import Navigate from "./components/card/navigate.card";
import Navbar from "./components/Navbar";
import FlightInfo from "./views/FlightInfo";
import BuyTicket from "./views/BuyTicket";

export default function App() {
  return (
    <>
      <Router>
      <Navbar />
        {/* <div>
        <AppBarComponent/>
        </div> */}

        <Routes>
        <Route path="/" element={<Pages />}/>
        <Route path="/webxr" element={<WebXR />}/>
        <Route path="/tourist-attractions" element={<TouristAttractions />}/>
        <Route path="/flight-info" element={<FlightInfo />}/>
        <Route path="/ticket" element={<BuyTicket />}/>
        </Routes>
      </Router>
    </>
  );
}
