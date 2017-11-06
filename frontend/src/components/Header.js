import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from '../caesar.png';

class Header extends Component {

  render() {
    return (
      <div className='App-header'>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to CSIR</h2>
      </div>
    )
  }
}

export default Header;