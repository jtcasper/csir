import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { getIssues } from '../util/GetIssues';
import store from '../store';
import axios from 'axios';
import { URL, ISSUE } from '../config/Api';
import FormContainer from "./FormContainer";
import CommentArea from './CommentArea';
import IssueContainer from './IssueContainer'
// Project resources
import grey from '../resources/grey.png';
import blue from '../resources/blue.png';
import purple from '../resources/purple.png';
import green from '../resources/green.png';
import { Modal, Container } from 'semantic-ui-react'

var projectData = require('../resources/data.json');


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      infoWindowContent: "",
      commentContent: "",
      activeMarker: null,
      placeMarker: null,
      selectedPlace: {},
      markers: [],
      lat: {},
      lng: {},
      id: {},
      showInfo: false
    }
    // binding this to event-handler functions
    this.onActiveMarkerClick = this.onActiveMarkerClick.bind(this);
    this.onPlaceMarkerClick = this.onPlaceMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  toggleVisibility = () => this.setState({ showInfo: !this.state.showInfo })


  onActiveMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: false,
      infoWindowContent:
        <div>
          <div><IssueContainer title={props.name} description={props.desc} id={props.id} /></div>
        </div>,
      lat: marker.position.lat(),
      lng: marker.position.lng(),
      showInfo: true
    });

  }

  onPlaceMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: false,
      infoWindowContent: <FormContainer position={{ lat: marker.position.lat(), lng: marker.position.lng() }} />,
      lat: marker.position.lat(),
      lng: marker.position.lng(),
      showInfo: false
    })
  }

  onMapClicked(props, marker, e) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        commentContent: "",
        activeMarker: null
      })
    } else {
      this.setState({
        placeMarker: <Marker name="" position={{ lat: e.latLng.lat(), lng: e.latLng.lng() }} onClick={this.onPlaceMarkerClick} />,
      })
    }
  }



  componentDidMount() {
    axios
      .get(URL + ISSUE, {
        params: {
          lat: 35.779,
          lng: -78.6382
        }
      })
      .then((response) => {
        this.setState({ markers: response.data.results })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  createMarker(marker) {
    return <Marker
      name={marker.name}
      position={{
        lat: marker.lat,
        lng: marker.lng
      }}
      longitude={this.position.longitude}
      latitude={this.position.latitude}
      onClick={this.onActiveMarkerClick} />
  }

  createMarkers(issues) {
    return issues.map((issue) => this.createMarker(issue));
  }

  // Determines icon to use based on the funding status of a project
  selectIcon = (status) => {
    let icon;
    if (status === 'Design')
      icon = grey
    else if (status === 'Partially funded')
      icon = purple
    else if (status === 'Funded')
      icon = blue
    else if (status === 'Construction')
      icon = green
    return icon
  }

  render() {
    let placeMarker = null
    if (this.state.placeMarker != null) {
      console.log(this.state.placeMarker)
      console.log(this.state.placeMarker.props)
      placeMarker = <Marker name={this.state.placeMarker.name} position={{ lat: this.state.placeMarker.props.position.lat, lng: this.state.placeMarker.props.position.lng }} onClick={this.onPlaceMarkerClick} />
    }
    return (
      <div>
        <Map google={this.props.google}
          style={style}
          initialCenter={{
            lat: 35.7796,
            lng: -78.6382
          }}
          onClick={this.onMapClicked}>

          {/* Create markers programmatically from the database */}

          {this.state.markers.map((marker, i) => {
            return (
              <Marker
                name={marker.name}
                position={{
                  lat: marker.lat,
                  lng: marker.lng
                }}
                importance={marker.importance}
                desc={marker.desc}
                id={marker.id}
                onClick={this.onActiveMarkerClick} />
            )
          })}

          {/* Create markers programmatically from the GeoJSON of current raleigh projects */}
          {projectData.map((endpoint, i) => {
            let project = endpoint.map((project, j) => {
              return (
                <Marker
                  name={project.features[0].properties.ProjectNam}
                  position={{
                    lat: project.features[0].geometry.coordinates[1],
                    lng: project.features[0].geometry.coordinates[0]
                  }}
                  icon={this.selectIcon(project.features[0].properties.FundingSta)}
                  onClick={this.onActiveMarkerClick} />
              )
            })
            return project
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

        <Modal open={this.state.showInfo} onClose={() => this.setState({ showInfo: false })} >
          <Modal.Header>View an Issue</Modal.Header>
          <Modal.Content>
            {this.state.infoWindowContent}
          </Modal.Content>
        </ Modal>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDDdJsVn90d6GjHW_Z6mZiWXlyCfnee5b8')
})(MapContainer)

const style = {
  width: '100%',
  height: '75%',
  position: 'right',
  margin: '0 auto'
}    