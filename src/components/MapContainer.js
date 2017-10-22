import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { getIssues } from '../util/GetIssues';
import store from '../store';
import axios from 'axios';
import { URL, ISSUE } from '../config/Api';
import FormContainer from "./FormContainer";


export class MapContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showingInfoWindow: false,
        infoWindowContent: "",
        activeMarker: null,
        placeMarker: null,
        selectedPlace: {},
        markers: [],
        lat: {},
        lng: {},
      }
      // binding this to event-handler functions
      this.onActiveMarkerClick = this.onActiveMarkerClick.bind(this);
      this.onPlaceMarkerClick = this.onPlaceMarkerClick.bind(this);
      this.onMapClicked = this.onMapClicked.bind(this);
  }

  onActiveMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      infoWindowContent: <h1>{props.name}</h1>,
      lat: marker.position.lat(),
      lng: marker.position.lng()
    });

  }

  onPlaceMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      infoWindowContent: <FormContainer position={{ lat: marker.position.lat(), lng: marker.position.lng() }} />, 
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    })
  }

  onMapClicked(props, marker, e) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    } else {
      this.setState({
        placeMarker: <Marker name="" position={{ lat: e.latLng.lat(), lng: e.latLng.lng() }} onClick={this.onPlaceMarkerClick}/>,
      })
    }
  }

  

  componentDidMount() {
    axios
    .get(URL + ISSUE, {
        params: {
            lat:35.779,
            lng:-78.6382
        }
    })
    .then( (response) => {
      this.setState({markers:response.data.results})
    })
    .catch(function(error) {
        console.log(error)
    })
  }

  createMarker(marker) {
    return <Marker
              name={marker.name}
              position={{
                lat:marker.lat,
                lng:marker.lng
              }}
              longitude = {this.position.longitude}
              latitude = {this.position.latitude}
              onClick={this.onActiveMarkerClick}/>
  }

  createMarkers(issues) {
    return issues.map((issue) => this.createMarker(issue));
  }

  render() {

    let placeMarker = null
    if (this.state.placeMarker != null){
      console.log(this.state.placeMarker)
      console.log(this.state.placeMarker.props)
      placeMarker = <Marker name={this.state.placeMarker.name} position={{ lat: this.state.placeMarker.props.position.lat, lng: this.state.placeMarker.props.position.lng}} onClick={this.onPlaceMarkerClick}/>
    }
    return (

      <Map google={this.props.google}
          style={style}
          initialCenter={{
          lat: 35.7796,
          lng: -78.6382
          }}
          onClick={this.onMapClicked}>

          {/*Marker with user location*/}
          <Marker onClick={this.onActiveMarkerClick}
                  name={'Current location'} />
          {/*Marker with custom location*/}
          <Marker 
          title={'Cup a Joe Hillsborough'}
          name={'Cup Hillsborough'}
          position={{lat:35.7899851, lng:-78.6774284}}
          onClick={this.onActiveMarkerClick} />
          {/*Marker with custom location*/}
          <Marker 
          title={'Cup a Joe Mission Valley'}
          name={'Cup Mission Valley'}
          position={{lat:35.779591, lng:-78.67595219999998}}
          onClick={this.onActiveMarkerClick} />

          {/* Create markers programmatically from the database */}

          {this.state.markers.map((marker, i) => {
            return (
              <Marker
              name={marker.name}
              position={{
                lat:marker.lat,
                lng:marker.lng
              }}
              onClick={this.onActiveMarkerClick}/>
            )
          })}

          {/* Render a marker at the user's clicked location */}
          {placeMarker}
          {this.state.infoWindowContent}
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>

              <div id="iwcontent">
                {this.state.infoWindowContent}
              </div>
          </InfoWindow>
      </Map>
    );
  }
}
    
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDDdJsVn90d6GjHW_Z6mZiWXlyCfnee5b8')
})(MapContainer)

const style = {
  width: '50%',
  height: '50%',
  position: 'right',
  margin: '0 auto'
}    