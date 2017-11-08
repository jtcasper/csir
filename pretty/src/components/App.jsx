import React from 'react';
import MenuBar from './MenuBar';
import MainContent from './MainContent';
import { Notifs } from 'redux-notifications';

export default class App extends React.Component {
  render() {
    return (
      <div style={style} className='container'>
        <Notifs />
        <MenuBar />
        <MainContent />
      </div>
    );
  }
}

const style = {
  flex: 1,
  height: '1000px'
};