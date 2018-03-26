import React, { Component } from 'react';
import logo from '../logo.svg';
import Loginscreen from './Loginscreen';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/components/App.js</code> and save to reload.
        </p>
        <Loginscreen/>
      </div>
    );
  }
}

export default App;
