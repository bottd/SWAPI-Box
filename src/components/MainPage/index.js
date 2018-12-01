import React from "react";
import PropTypes from "prop-types";
import Favorite from "../Favorite";
import CardContainer from "../CardContainer";
import Buttons from "../Buttons";
import "./MainPage.css";

const MainPage = ({
  favoritesCount,
  updateData,
  handleCardClick,
  selectedCategory,
  cardData
}) => {
  return (
    <div className="MainPage">
      <h1 className="mainTitle">$ SWAPi-Box $</h1>
      <Favorite
        favoritesCount={favoritesCount}
      />
      <Buttons selectedCategory={selectedCategory} updateData={updateData} />
      <CardContainer
        selectedCategory={selectedCategory}
        cardData={cardData}
        handleCardClick={handleCardClick}
      />
    </div>
  );
};

MainPage.propTypes = {
  favoritesCount: PropTypes.number.isRequired,
  updateData: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  cardData: PropTypes.array.isRequired
};

export default MainPage;
