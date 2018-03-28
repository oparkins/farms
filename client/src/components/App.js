import React, { Component } from 'react';
import logo from '../logo.svg';
import Loginscreen from './Loginscreen';
import Overview from './Overview';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Overview/>
      </div>
    );
  }
}

export default App;
