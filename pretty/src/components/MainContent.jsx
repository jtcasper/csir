import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapContainer = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
);



const MainContent = () => (
  <div style={style}>
    <Switch>
      <Route exact path="/" render={() =>
        <MapContainer
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />}
      />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </div>
);

export default MainContent;



const style = {
  overflow: 'hidden',
  height: '100%'
};