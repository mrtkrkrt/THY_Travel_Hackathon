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


export default function App() {
  return (
    <Router>
        <div>
        <AppBarComponent/>
        </div>

        <Routes>
        <Route path="/" element={<Pages />}/>
        <Route path="/webxr" element={<WebXR />}/>
        <Route path="/tourist-attractions" element={<TouristAttractions />}/>
        </Routes>
    </Router>
  );
}