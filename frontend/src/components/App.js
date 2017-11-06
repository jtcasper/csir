import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../style/App.css';
import LandingPage from './LandingPage';
import Dropdown from './Dropdown';
import Login from './Login';
import Register from './Register'
import logo from '../caesar.png';
import { slide as Menu } from 'react-burger-menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
                      <Dropdown name="Register" content={<Register />} />
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