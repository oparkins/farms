import React, { Component } from 'react';
import logo from '../logo.svg';
import Loginscreen from './Loginscreen';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Loginscreen/>
      </div>
    );
  }
}

export default App;
