import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import * as data from "./places.json";
import "./App.css";
import { Filter } from './Filter';

const unsplashKey = "4281660249cb5a66f365bf7611e9760a224d689a23bcc0efad2cee76d8149bc4";

export class App extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: [],
  };

  componentDidMount = () => {
   
    //code for testing
    // let places = data.map(place => {
    //   place.img = "https://source.unsplash.com/user/erondu/1600x900";
    //   return place;
    // })

    //code for production
    let places = data.map(place => {
      fetch(`https://api.unsplash.com/photos/random/?query=${place.country},forest,hiking&orientation=landscape&client_id=${unsplashKey}`)
        .then(res => res.json())
        .then(imgs => {
          place.img = imgs.urls.small;
         })
        .catch(err => {
          console.log('Error happened during fetching!', err);
        });
        return place;
      });

      this.setState({places});

  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  windowHasClosed = () =>
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });

  render() {
    return (
      <div>
        <div className="map-container">
        <Map
        className="Map"
        style={{ height: "100%", width: "75%" }}
        initialCenter={{
          lat: 54.5259614,
          lng: 15.2551187
        }}
        zoom={4}
        google={this.props.google}
        onClick={this.onMapClicked}
      >
        {this.state.places.map(place => (
          <Marker
            key={place.name}
            title={place.name}
            name={place.name}
            position={place.position}
            country={place.country}
            img={place.img}
            onClick={this.onMarkerClick}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.windowHasClosed}
          maxWidth="200"
        >
          <div className="infowindow-content">
            <h3>{this.state.selectedPlace.name}</h3>
            <p>{this.state.selectedPlace.country}</p>
              <img src={this.state.selectedPlace.img} alt=""/>
          </div>
        </InfoWindow>
      </Map>

        </div>
    
      <Filter
        style={{ height: "100vh", width: "25vw" }}
        places={this.state.places}
      
      >
      </Filter>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBTh7US3x2HTpBTzY1KVB_FV3S6D81OEk4"
})(App);
