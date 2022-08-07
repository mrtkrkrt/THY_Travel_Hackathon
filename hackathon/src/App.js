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
import WebXR2 from "./views/WebXR2";

//Components
import Navigate from "./components/card/navigate.card";
import Navbar from "./components/Navbar";
import FlightInfo from "./views/FlightInfo";
import BuyTicket from "./views/BuyTicket";
import Accomodations from "./views/Accomodations";
import Foods from "./views/Foods";


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
        <Route path="/webxr2/:id" element={<WebXR2 />}/>
        <Route path="/tourist-attractions" element={<TouristAttractions />}/>
        <Route path="/flight-info" element={<FlightInfo />}/>
        <Route path="/ticket" element={<BuyTicket />}/>
        <Route path="/hotel" element={<Accomodations />}/>
        <Route path="/food" element={<Foods />}/>
        </Routes>
      </Router>
    </>
  );
}
