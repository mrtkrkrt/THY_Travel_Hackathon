import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Pages from "./views/Pages";
import WebXR from "./views/WebXR";

export default function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Pages />}/>
        <Route path="/webxr" element={<WebXR />}/>
        </Routes>
    </Router>
  );
}