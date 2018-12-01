import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./Favorite.css";

class Favorite extends Component {
  render() {
    const { favoritesCount } = this.props;
    return (
      <div className="Favorites">
        <NavLink
          to={`/SWAPI-Box/favorites`}
          className="favoritesBtn"
        >
          <span className="favoritesIcon">#</span> Favorites: {favoritesCount}
        </NavLink>
      </div>
    );
  }
}

Favorite.propTypes = {
  favoritesCount: PropTypes.number.isRequired,
};

export default Favorite;
