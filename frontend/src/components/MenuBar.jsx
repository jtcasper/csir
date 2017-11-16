import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../caesar.png';
import { Header, Container, Menu } from 'semantic-ui-react'
import { logout } from '../util/Auth';
import store from '../store';

class MenuBar extends Component {

  render() {
    return (
      <div>
        <Container>
          <Header image={logo} content="CSIR" subheader="Crowd-Sourced Infrastructure Review" size='large' />
          </Container>

        <Menu stackable inverted>
          <Container>
          <Menu.Item><Link className="nav-link" to="/">Home</Link></Menu.Item>
          <Menu.Item disabled>View Issues</Menu.Item>


          <Menu.Menu position='right'>
            <Menu.Item><Link className="nav-link" to="/login">Login</Link></Menu.Item>
            <Menu.Item><Link className="nav-link" to="/register">Register</Link></Menu.Item>
            <Menu.Item onClick={() => {logout();}}>Log Out</Menu.Item>
          </Menu.Menu>
          </Container>
        </Menu>

      </div>
    )
  }
}

export default MenuBar;