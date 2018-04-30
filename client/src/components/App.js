import React, { Component } from 'react';
import logo from '../logo.svg';
import LoginScreen from './LoginScreen';
import Overview from './Overview';
import ProjectView from './ProjectView';
import SetupView from './Setup';
import ListFolder from './FileView'
import '../styles/App.css';
import CreateHistory from 'history/createBrowserHistory';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import NetworkManager from './NetworkManager';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Info from 'material-ui-icons/Info';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';

class App extends Component {

  AppHistory = CreateHistory();
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        auth: false,
        anchorEl: null,
        currentWindow: 0,
        changeWindowHandler: props.changeWindowHandler,
        openDrawer: false,
        showDialog: false
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
      this.setState({ openDrawer: false });
  };

  toggleDrawer = () => {
    this.setState({ openDrawer: true});
  };

  toggleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };


  render() {
    const { value, auth, anchorEl, openDrawer } = this.state;
    const open = Boolean(anchorEl);


    return (
      <div className="App">
        <AppBar position="static" className="App-Appbar">
            <Toolbar>
            {this.state.currentWindow > 0 && (
                <IconButton 
                    onClick={this.toggleDrawer} 
                    color="inherit" aria-label="Menu" 
                    style={{ marginLeft: -12, marginRight: 20,}}
                >
                    <MenuIcon />
                </IconButton>
            )}

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

            <Drawer open={openDrawer} onClose={this.toggleDrawerClose}>
            <div style={{ width: '100%', minWidth: 300 }}>
                <List>
                <ListItem button className="App-drawerListItem"> 
                    <AccountCircle />
                    <ListItemText primary="Profile" /> 
                </ListItem>
                <ListItem button onClick={this.handleLogout}>
                    <ArrowBack />
                    <ListItemText primary="Logout" /> 
                </ListItem>
                <ListItem button onClick={() => {this.setState({showDialog: true, openDrawer: false})}}> 
                    <Info />
                    <ListItemText primary="About" /> 
                </ListItem>
                </List>
            </div>
            </Drawer>
        </AppBar>

        <Dialog open={this.state.showDialog} onClose={() => {this.setState({showDialog: false})}}>
            <DialogTitle>
                About Us
            </DialogTitle>
            <DialogContent>
                Free Artifact Repository Management System (F.A.R.M.S)
                <br/>
                <br/>
                Artifact repositories are tools used at the end of continuous integration systems. 
                The systems currently available are designed to efficiently work with only Java packages.
                We want to develop a system that allows developers to save artifacts. This system will involve 
                a server backend, frontend, and hooks that will allow continuous integration systems to 
                interface with it. This will create a unique ecosystem that will allow developers to use our 
                system anywhere. In addition, our project will be open source and hosted on GitHub.
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {this.setState({showDialog: false})}} color="primary" autoFocus>
                GitHub
                </Button>
            </DialogActions>
        </Dialog>

        { this.state.currentWindow !== 1 && <br/>}

        { this.state.currentWindow === -1 && <SetupView changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 0 && <LoginScreen changeWindowHandler={(value) => {this.AppHistory.push("/overview", { currentWindow : value }); this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 1 && <Overview changeWindowHandler={(value) => {this.AppHistory.push("/projects", { currentWindow : value }); this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 2 && <ProjectView changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
        { this.state.currentWindow === 3 && <ListFolder changeWindowHandler={(value) => {this.setState({currentWindow : value})}} /> }
      </div>
    );
  }
}

export default App;
