import React, { Component } from 'react';
import logo from '../logo.svg';
import LoginScreen from './LoginScreen';
import Overview from './Overview';
import ProjectView from './ProjectView'; 
import SetupView from './Setup';
import '../styles/App.css';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import NetworkManager from './NetworkManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentWindow: 0,
    }
  }

  componentDidMount() {
    //Need to determine if the server is setup properly
    console.log("Checking for valid server...");
    var thisWindow = this;
    NetworkManager.isServerValid().then(function(data) {
      thisWindow.setState({currentWindow: 0});
      console.log("Server Found");
    }).catch(function(error) {
      thisWindow.setState({currentWindow: -1});
      console.log("Server Not Found");
    })
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
        { this.state.currentWindow === -1 && <SetupView changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 0 && <LoginScreen changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 1 && <Overview changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 2 && <ProjectView changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
      </div>
    );
  }
}

export default App;
