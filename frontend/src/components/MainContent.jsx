import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MapContainer from "./MapContainer";



const MainContent = () => (
  <div style={style}>
    <Switch>
      <Route exact path="/" component={MapContainer} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </div>
);

const style = {
  overflow: 'hidden',
  height: '100%'
};

export default MainContent;



