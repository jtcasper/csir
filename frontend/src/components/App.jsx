import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../style/App.css';
import MenuBar from './MenuBar';
import MainContent from './MainContent';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

    render() {
        return (
            <div style={style}>
                <MenuBar />
                <MainContent />
            </div>
        );
    }
}

const style = {
    flex: 1
};

export default App;
