import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
