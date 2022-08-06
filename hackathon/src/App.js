import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pages from "./views/Pages";
import WebXR from "./views/WebXR";

//Components
import Navigate from "./components/card/navigate.card";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="/webxr" element={<WebXR />} />
        </Routes>
      </Router>
    </>
  );
}
