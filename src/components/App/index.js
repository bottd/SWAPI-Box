import React, {Component} from 'react';
import * as API from '../../helper/helper';
import MainPage from '../MainPage';
import SideScroll from '../SideScroll';
import {Switch, Redirect, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      episodeData: {},
      vehicles: [],
      people: [],
      planets: [],
      favorites: [],
    };
  }

  componentDidMount() {
    const selected = window.location.pathname.split('/')[2] || '';
    this.getEpisodeData();
    if (selected.length) {
      this.loadCards(selected);
    }
  }

  loadCards = async category => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    await this.setState({favorites});
    if (category !== 'favorites') {
      const cardData = await API[category]();
      this.updateData(category, cardData);
    }
  };

  async getEpisodeData() {
    const episodeData = await API.randomEpisode();
    this.setState({episodeData});
    setTimeout(() => {
      this.getEpisodeData();
    }, 60000);
  }

  updateData = (key, value) => {
    const {favorites} = this.state;
    const names = favorites.map(card => card.name);
    const filteredCards = value.filter(card => {
      return !names.includes(card.name);
    });
    value = [...favorites, ...filteredCards];
    this.setState({[key]: value});
  };

  handleCardClick = (card, favorited) => {
    let {favorites} = this.state;
    let updatedFavorites = favorites;
    let updateArray;

    !favorited
      ? (updateArray = [card, ...favorites])
      : (updateArray = favorites.filter(
          favorite => favorite.name !== card.name,
        ));
    updatedFavorites = updateArray;
    this.setState({favorites: updatedFavorites});
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  render() {
    const {episodeData, favorites} = this.state;
    return (
      <div className="App">
        <SideScroll className="hide" episodeData={episodeData} />
        <Switch>
          <Route
            exact
            path="/SWAPI-Box/(people|planets|vehicles|favorites|)"
            render={({match}) => {
              const path = match.url.split('/')[2];
              return (
                <MainPage
                  updateData={this.updateData}
                  handleCardClick={this.handleCardClick}
                  selectedCategory={path}
                  cardData={this.state[path] || []}
                  favoritesCount={favorites.length}
                />
              );
            }}
          />
        <Redirect to="/SWAPI-Box/" />
        </Switch>
      </div>
    );
  }
}

export default App;
