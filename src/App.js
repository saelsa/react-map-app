import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import * as data from "./places.json";
import "./App.css";

export class App extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: []
  };

  componentDidMount = () => {
    this.setState({ places: data });
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
    console.log(data);
    return (
      <Map
        style={{ height: "100%", width: "100%" }}
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
            onClick={this.onMarkerClick}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.windowHasClosed}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBTh7US3x2HTpBTzY1KVB_FV3S6D81OEk4"
})(App);
