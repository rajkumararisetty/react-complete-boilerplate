import React from 'react';
import AppStylesScss from './App.scss';
import AppStylesCss from './App.css';
import Logo from './logo.gif';

class App extends React.Component {
  render() {
    return (
      <div className={AppStylesScss.app}>
        <img alt="header" src={Logo} className="app-header" />
        <p className={AppStylesCss.welcomeMessage}>Welcome to react(ive)-started-kit</p>
      </div>
    );
  }
}

export default App;
