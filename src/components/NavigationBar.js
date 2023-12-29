import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav>
      <ul className="navigation_list">
        <li>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/flashcards" activeclassname="active">
            Flashcards
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeclassname="active">
            Contact Me
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
