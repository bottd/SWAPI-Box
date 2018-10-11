import React from "react";
import PropTypes from "prop-types";
import "./Buttons.css";
import * as API from "../../helper/helper";

const Buttons = ({ updateData }) => {
  return (
    <div className="Buttons">
      <button
        onClick={() => API.getPeople()
          .then(people => updateData('people',people))}
        >people</button>
      <button onClick={() => API.getPlanets()
        .then(planets => updateData('planets',planets))
      }>planets</button>
      <button onClick={() => API.getVehicles()
        .then(vehicles => updateData('vehicles',vehicles))
      }>vehicles</button>
    </div>
  );
};

Buttons.propTypes = {
  updateData: PropTypes.func.isRequired
};

export default Buttons;
