import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import {ErrorBoundary} from "./components/ErrorBoundary";

import { unsplashKey } from "./constants/Index";
import * as data from "./resources/places.json";
import mapStyles from "./resources/mapStyles.json";
import markerIcon from "./resources/boots.png";
import "./App.css";

window.gm_authFailure = () => { 
  const mapContainer = document.querySelector('#map-container');
  mapContainer.innerHTML = '';
  mapContainer.innerHTML = `<div style="padding:20px; border:1px solid red"><h2>Error message</h2><p>Sorry, but there was an unexpected error while loading Google Maps. Please refer to the console for more information or try to refresh the page.  </p></div>`;
;}

export class App extends Component {
  state = {
    showingInfoWindow: false, //whether and Infowindow is open
    activeMarker: {}, //stores the active marker
    selectedPlace: {}, //stores the selected place

    isMenuOpen: false, //keeps track whether the sidebar is open
    unsplashErr: null, //stores the error of the Unsplash API

    places: [], //array of all places
    filteredPlaces: [], //array of places to be shown on the map
    uniqueCountries: [], //array of unique countries
    marker: [] //array of all created markers
  };

  //After component mounts, images are fetched from the Unsplash API
  //for each from the data file. The list of places is then updated
  //with the image data
  componentDidMount = () => {
    let places = data.map(place => {
      fetch(
        `https://api.unsplash.com/photos/random/?query=${
          place.country
        },forest,hiking&orientation=landscape&client_id=${unsplashKey}`
      )
        .then(res => res.json())
        .then(imgs => {
          place.img = imgs.urls.small;
          this.setState({ unsplashErr: null})
        })
        .catch(err => {
          console.log("Error happened during fetching!", err);
          this.setState({ unsplashErr: err });
        });
      return place;
    });
    this.setState({ places, filteredPlaces: places });
  };

  //if a country is provided as filter criteria, the list of places
  //is filtered. Otherwise the whole list of places is put in state
  filterPlaces = country => {
    if (country === "all") {
      this.setState({ filteredPlaces: this.state.places });
    } else {
      let filteredPlaces = this.state.places.filter(
        place => place.country === country
      );
      this.setState({ filteredPlaces });
    }
  };

  //when a marker is clicked, the marker is activated
  //and the infowindow shown
  //any already animated markers are toggled and the
  //active marker animated
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    this.toggleBounceAll();
    this.toggleBounce(marker);
  };

  //for each created Marker component the marker
  //is pushed into the marker array
  onMarkerCreated = marker => {
    if (marker !== null) {
      this.setState(prevState => ({
        marker: [...prevState.marker, marker]
      }));
    }
  };

  //when clicking on a place in the menu, a click event
  //is triggered for the matching marker
  //the menu is closed
  onListClick = place => {
    for (const createdMarker of this.state.marker) {
      if (createdMarker.props.name === place.name) {
        new createdMarker.props.google.maps.event.trigger(
          createdMarker.marker,
          "click"
        );
      }
    }
    this.closeMenu();
  };

  //stop the animation of all markers
  toggleBounceAll = () => {
    for (const marker of this.state.marker) {
      if (marker.marker.getAnimation() !== null) {
        marker.marker.setAnimation(null);
      }
    }
  };

  //animate the selected marker
  toggleBounce = marker => {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    }
  };

  //opens the sidebar menu
  openMenu = () => {
    if (!this.state.isMenuOpen) {
      this.setState({ isMenuOpen: true });
    }
  };

  //closes the sidebar menu
  closeMenu = () => {
    if (this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false });
    }
  };

  //when clicking on the map the state variables regarding
  //active marker/infowindow are reset and markers animation toggled
  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
    this.toggleBounceAll();
  };

  //when closing the infowindow the state variables regarding
  //active marker/infowindow are reset and markers animation toggled
  windowHasClosed = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
    this.toggleBounceAll();
  };

  render() {
    return (
      <div className="App" style={{ width: "100%" }}>
        <Header openMenu={this.openMenu} />
        <Sidebar
          style={{ height: "100vh", width: "25vw" }}
          places={this.state.places}
          filteredPlaces={this.state.filteredPlaces}
          onListClick={this.onListClick}
          filterPlaces={this.filterPlaces}
          showAllPlaces={this.showAllPlaces}
          isMenuOpen={this.state.isMenuOpen}
          closeMenu={this.closeMenu}
          openMenu={this.openMenu}
        />
        <div id="map-container">
          <ErrorBoundary>
          <Map
            className="Map"
            styles={mapStyles}
            initialCenter={{
              lat: 54.5259614,
              lng: 15.2551187
            }}
            zoom={4}
            google={this.props.google}
            onClick={this.onMapClicked}
            role="application" 
            aria-label="map"
          >
            {this.state.filteredPlaces.map(place => (
              <Marker
                className="Marker"
                key={place.name}
                id={place.name}
                title={place.name}
                name={place.name}
                position={place.position}
                country={place.country}
                img={place.img}
                icon={markerIcon}
                tabIndex="0"
                aria-label={`Marker for ${place.name}`}
                onBlur={this.onMapClicked}
                onClick={this.onMarkerClick}
                onMarkerCreated={this.onMarkerCreated}
                ref={this.onMarkerCreated}
                animation={null}
              />
            ))}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.windowHasClosed}
              maxWidth="200"
              tabIndex="0"
              aria-label="Infowindow"
            >
              <div className="infowindow-content">
                <h3>{this.state.selectedPlace.name}</h3>
                <p>{this.state.selectedPlace.country}</p>

                <img
                  src={this.state.selectedPlace.img}
                  alt={this.state.selectedPlace.name}
                />
                {!this.state.unsplashErr && (
                  <p>
                    Source:<a href={this.state.selectedPlace.img} target="_blank" rel="nofollow noopener">Unsplash</a>
                  </p>
                )}
                {this.state.unsplashErr && (
                  <p>
                    Sorry, there was an error while loading the image. Please
                    try again later.
                  </p>
                )}
              </div>
            </InfoWindow>
          </Map>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBTh7US3x2HTpBTzY1KVB_FV3S6D81OEk4"
})(App);
