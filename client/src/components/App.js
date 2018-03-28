import React, { Component } from 'react';
import logo from '../logo.svg';
import LoginScreen from './LoginScreen';
import Overview from './Overview';
import ProjectView from './ProjectView'; 
import '../styles/App.css';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentWindow: 0,
    }
  }
  render() {
    return (
      <div className="App">
        <AppBar position="static">
        <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
        </Toolbar>
        </AppBar>
        { this.state.currentWindow === 0 && <LoginScreen changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 1 && <Overview changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 2 && <ProjectView changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
      </div>
    );
  }
}

export default App;
