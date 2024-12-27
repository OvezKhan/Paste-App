import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#254552 ",
        width:"800px"
      }}
    >
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
        }}
        
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        style={{
          textDecoration: "none",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
        }}
        
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
