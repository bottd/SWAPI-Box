import React, { Component } from "react";
import * as API from "../../helper/helper";
import MainPage from "../MainPage";
import SideScroll from "../SideScroll";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: window.location.pathname.split("/")[1],
      episodeData: {},
      vehicles: [],
      people: [],
      planets: [],
      favorites: []
    };
  }

  componentDidMount() {
    const { selected } = this.state;
    this.getEpisodeData();
    if (selected.length) {
      this.loadCards(selected);
    }
  }

  loadCards = async category => {
    let cardData;
    if (category === "favorites") {
      cardData = JSON.parse(localStorage.getItem("favorites"));
    } else {
      cardData = await API[category]();
    }
    await this.setState({ cardData });
  };

  toggleFavorites = () => {
    let { selected, favorites } = this.state;
    console.log("asdf");
    if (this.state.selected) {
      this.updateData(selected, favorites);
    }
  };

  async getEpisodeData() {
    const episodeData = await API.randomEpisode();
    this.setState({ episodeData });
    setTimeout(() => {
      this.getEpisodeData();
    }, 60000);
  }

  updateData = (key, value) => {
    const { favorites } = this.state;
    const names = favorites.map(card => card.name);
    const filteredCards = value.filter(card => {
      return !names.includes(card.name);
    });
    value = [...favorites, ...filteredCards];
    this.setState({ [key]: value, selected: key });
  };

  handleCardClick = (card, favorited) => {
    let { selected, favorites } = this.state;
    let updatedFavorites = favorites;
    let updateArray;

    if (!favorited) {
      updateArray = [card, ...favorites];
    } else {
      updateArray = favorites.filter(favorite => {
        return favorite.name !== card.name;
      });
    }
    updatedFavorites = updateArray;
    this.setState({ favorites: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  render() {
    const { episodeData, favorites, selected } = this.state;
    const bundledAppFunctions = {
      toggleFavorites: this.toggleFavorites,
      updateData: this.updateData,
      handleCardClick: this.handleCardClick
    };
    let selectedData = [];
    let favoritesCount = 0;

    if (selected) {
      selectedData = this.state[selected];
      favoritesCount = favorites.length;
    }
    return (
      <div className="App">
        <SideScroll className="hide" episodeData={episodeData} />
        <Route
          exact
          path="/(planets|people|vehicles|favorites|)"
          render={({ match }) => {
            const pathUsed = match.url.split("/")[1];
            return (
              <MainPage
                pathUsed={pathUsed}
                {...bundledAppFunctions}
                selectedCategory={selected}
                cardData={selectedData || []}
                favoritesCount={favoritesCount}
              />
            );
          }}
        />
        {/* <Route
          path="/(planets|people|vehicles)/favorites"
          render={({ match }) => {
            const pathUsed = match.url.split("/")[1];
            selectedData = favorites[pathUsed];
            favoritesCount = favorites[pathUsed].length;
            return (
              <MainPage
                pathUsed={pathUsed}
                {...bundledAppFunctions}
                selectedCategory={selected}
                cardData={selectedData}
                favoritesCount={favoritesCount}
              />
            );
          }}
        /> */}
      </div>
    );
  }
}

export default App;
