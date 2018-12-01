import React from "react";
import PropTypes from "prop-types";
import "./Buttons.css";
import * as API from "../../helper/helper";
import { NavLink } from "react-router-dom";

const Buttons = ({ updateData }) => {
  return (
    <div className="Buttons">
      <NavLink
        to="/SWAPI-Box/people"
        className="people"
        onClick={() =>
          API.people().then(people => updateData("people", people))
        }
      >
        people
      </NavLink>
      <NavLink
        to="/SWAPI-Box/planets"
        className="planets"
        onClick={() =>
          API.planets().then(planets => updateData("planets", planets))
        }
      >
        planets
      </NavLink>
      <NavLink
        to="/SWAPI-Box/vehicles"
        className="vehicles"
        onClick={() =>
          API.vehicles().then(vehicles => updateData("vehicles", vehicles))
        }
      >
        vehicles
      </NavLink>
    </div>
  );
};

Buttons.propTypes = {
  updateData: PropTypes.func.isRequired,
};

export default Buttons;
