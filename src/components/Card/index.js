import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { favorited: this.props.cardData.favorited };
  }

  handleClick = () => {
    const { favorited } = this.state;
    this.props.cardData.favorited = !favorited;
    this.setState(
      { favorited: !favorited },
      this.props.handleCardClick(this.props.cardData, this.state.favorited)
    );
  };

  render() {
    const { favorited } = this.state;
    const { cardData } = this.props;
    let { name } = cardData;
    if (name.length > 20) {
      name = name.slice(0, 20) + "...";
    }

    const listItems = Object.keys(cardData).map((value, index) => {
      if (value === "name" || value === "favorited") return;
      if (cardData[value].length) {
        return (
          <li key={name + index}>
            <span className="category">{value}</span>
            {`: ${cardData[value]}`}
          </li>
        );
      }
    });
    return (
      <div className="Card">
        <h2 className="name">
          {name}
          <span
            className={"favoriteIcon" + (favorited ? " favorited" : "")}
            onClick={this.handleClick}
          >
            {favorited ? "#" : "$"}
          </span>
        </h2>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

Card.propTypes = {
  handleCardClick: PropTypes.func.isRequired
};

export default Card;
