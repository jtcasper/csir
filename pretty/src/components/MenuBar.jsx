import React from 'react'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Form } from 'semantic-ui-react'
import logo from '../logo.png'
import { Link } from "react-router-dom";
import Login from './Login';

export default class MenuBar extends React.Component {

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
            </Menu.Menu>
          </Container>
        </Menu>

      </div>
    );
  }
}