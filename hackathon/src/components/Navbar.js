import React from "react";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom"

// CSS for Navbar:
import "../style/Navbar.style.css";

function Navbar() {
  const nav = useNavigate()

  return (
    <>
      <nav className="navbar">
      <IconButton onClick={(e) => {nav("/")}}>
        <img
          src="https://ucarecdn.com/82cc8d42-272c-42b8-a82d-62551992dd8e/"
          className="navbar-img"
        />
        <p className="navbar-text">TURKISH AIRLINES - YAPAYZOİD</p>
      </IconButton>
      </nav>
    </>
  );
}

export default Navbar;
