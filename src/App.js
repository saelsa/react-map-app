import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import * as data from "./places.json";
import "./App.css";
import { Filter } from './components/Filter';
import {unsplashKey} from './constants/Index';

export class App extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},

    places: [],
    marker: [],

  };

  componentDidMount = () => {
   
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

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    this.toggleBounce(marker);
  }
  
    onMarkerCreated = (marker) => {
      if (marker !== null) {
         this.setState(prevState => ({
          marker: [...prevState.marker, marker]
        }))
      }
  }

  // onListClicked = (place) => {
  //   const selectedMarker = this.state.marker.filter(marker =>
  //     marker.props.name === place.name);
  //     // console.log(selectedMarker);
  //     new selectedMarker.props.google.maps.event.trigger(selectedMarker.marker, 'click' );
  // }

  onListClicked = (place) => {
    for (const createdMarker of this.state.marker) {
      if (createdMarker.props.name === place.name) {
        new createdMarker.props.google.maps.event.trigger( createdMarker.marker, 'click' );
      }
    }
  }

  //first all marker animations are reset to null, then the animation of the 
  //selected marker is set
  toggleBounce = (marker) => {
      for (const otherMarker of this.state.marker) {
        if (otherMarker.marker.getAnimation() !== null) {
          otherMarker.marker.setAnimation(null);
        }
      }
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    }
  }

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
    console.log(this.state.activeMarker);
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
            id={place.name}
            title={place.name}
            name={place.name}
            position={place.position}
            country={place.country}
            img={place.img}
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
        onClick={this.onListClicked}
      
      >
      </Filter>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBTh7US3x2HTpBTzY1KVB_FV3S6D81OEk4"
})(App);
