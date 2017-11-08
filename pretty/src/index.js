import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import history from "./utils/historyUtils";
import { authLogin } from "./actions/authActions";
import App from './components/App.jsx'

const MOUNT_NODE = document.getElementById('root')
const token = localStorage.getItem("token");

if (token) {
    store.dispatch(authLogin(token));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, MOUNT_NODE)
