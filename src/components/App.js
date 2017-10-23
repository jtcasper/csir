import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../style/App.css';
import LandingPage from './LandingPage';
import Dropdown from './Dropdown';
import Login from './Login';
import logo from '../caesar.svg';
import { slide as Menu } from 'react-burger-menu';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();



class App extends Component {
    constructor(props) {
        super(props);


    }



    render () {

        return (

              <div className='whole'>
                  <Menu noOverlay>
                      <a id="home" className="menu-item" href="/">Home</a>
                      <Dropdown name="Login" content={<Login />} />
                      <a id="contact" className="menu-item" href="/contact">My Issues</a>
                      <a id="contact" className="menu-item" href="/contact">Email Officials</a>
                      <a id="contact" className="menu-item" href="/contact">About</a>
                      <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
                  </Menu>
                  <div className="App-header" align='center'>
                    <img src={logo} className="App-logo" alt="logo" />

                    <h2>Welcome to Caesar</h2>
                </div>


                  <div className="App">
                      <LandingPage/>
                  </div>
              </div>



        );
    }



}
const style = {
    margin: 15,



};
export default App;
