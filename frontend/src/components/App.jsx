import React, { Component } from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../style/App.css';
import MenuBar from './MenuBar';
import MainContent from './MainContent';
import store from '../store';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

    render() {
        return (
            <Provider store={store} >
                <div style={style}>
                    <MenuBar />
                    <MainContent />
                </div>
            </Provider>
        );
    }
}

const style = {
    flex: 1
};

export default App;
