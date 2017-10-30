import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Loginscreen from './Loginscreen';

class LandingPage extends Component {
    render(){
        return(
            <div className="LandingPage">
                
                <div className="LandingPage-header">
                    <br />
                    <br />
                </div>
                <MapContainer />

            </div>
        )
    }
}

export default LandingPage;