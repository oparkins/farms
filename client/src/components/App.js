import React, { Component } from 'react';
import logo from '../logo.svg';
import LoginScreen from './LoginScreen';
import Overview from './Overview';
import ProjectView from './ProjectView'; 
import SetupView from './Setup';
import '../styles/App.css';
import CreateHistory from 'history/createBrowserHistory';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import NetworkManager from './NetworkManager';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

class App extends Component {

  AppHistory = CreateHistory();
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        auth: false,
        anchorEl: null,
        currentWindow: 0,
        changeWindowHandler: props.changeWindowHandler
    }
  }

  componentDidMount() {
    //Need to determine if the server is setup properly
    console.log("Checking for valid server...");
    var thisWindow = this;
    NetworkManager.isServerValid().then(function(data) {
      var contentType = data.headers.get("FARMS-SETUP");
      if(contentType && contentType.indexOf("no") !== -1) {
        thisWindow.setState({currentWindow: -1});
        console.log("Server has not been setup yet!");
      }  else {
          if(data.status !== 401) {
            thisWindow.setState({currentWindow: 1});
          } else {
            thisWindow.setState({currentWindow: 0});
          }        
        console.log("Server Found");
      }
    }).catch(function(error) {
      thisWindow.setState({currentWindow: -1});
      console.log("Server Not Found");
    })
    
    this.AppHistory.listen((location, action) => {
        console.log(action, location.pathname, location.state)
        console.log("History Length: " + this.AppHistory.length);
        if(action === "POP") {
            this.setState({ currentWindow: location.state["currentWindow"] });
        }
    })
    this.AppHistory.push("/login", { currentWindow : 0 });
  }

  handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
      this.setState({ anchorEl: null });
  };
  
  handleLogout = () => {
      this.setState({ anchorEl: null });
      this.setState({ auth: false });
      this.setState({ value: 0 });
      this.setState({ currentWindow: 0 });
  };
  
  render() {
    const { value, auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);


    return (
      <div className="App">
        <AppBar position="static" className="App-Appbar">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu" style={{ marginLeft: -12, marginRight: 20,}}>
                    <MenuIcon />
                </IconButton>
            <Typography variant="title" color="inherit" className="appbarFlex">
                F.A.R.M.S
            </Typography>
            {this.state.currentWindow > 0 && (
                <div>
                    <IconButton
                    onClick={this.handleMenu}
                    color="inherit"
                    style={{marginRight: -16,  marginLeft: 'auto', }}
                    >
                    <AccountCircle />
                    </IconButton>

                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                    >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={ this.handleLogout }>Logout</MenuItem>
                    </Menu>
                </div>
                )}
            </Toolbar>

        </AppBar>
        { this.state.currentWindow === -1 && <SetupView changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 0 && <LoginScreen changeWindowHandler={(value) => {this.AppHistory.push("/overview", { currentWindow : value }); this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 1 && <Overview changeWindowHandler={(value) => {this.AppHistory.push("/projects", { currentWindow : value }); this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 2 && <ProjectView changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
      </div>
    );
  }
}

export default App;
