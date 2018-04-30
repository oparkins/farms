import React, { Component } from 'react';
import LoginScreen from './LoginScreen';
import Overview from './Overview';
import ProjectView from './ProjectView';
import SetupView from './Setup';
import FileView from './FileView'
import '../styles/App.css';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import NetworkManager from './NetworkManager';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Info from 'material-ui-icons/Info';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Registration from './Registration';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        auth: false,
        anchorEl: null,
        currentWindow: 0,
        changeWindowHandler: props.changeWindowHandler,
        openDrawer: false
    }
  }

  componentDidMount() {
    //Need to determine if the server is setup properly
    var _self = this;
    NetworkManager.isServerValid().then(function(data) {
        _self.setState({currentWindow: 0});
    }).catch(function(error) {
        _self.setState({currentWindow: -1});
    })
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
      this.setState({ openDrawer: false });
      window.location.href = "/login";
  };

  toggleDrawer = () => {
    this.setState({ openDrawer: true});
  };

  toggleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };


  render() {
    const { anchorEl, openDrawer } = this.state;
    const open = Boolean(anchorEl);


    return (
      <div className="App">
        <AppBar position="static" className="App-Appbar">
            <Toolbar>
            {window.location.href.includes("overview") && (
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
            {window.location.href.includes("overview") && (
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
                <ListItem button> 
                    <Info />
                    <ListItemText primary="About" /> 
                </ListItem>
                </List>
            </div>
            </Drawer>
        </AppBar>

        <BrowserRouter>
            <div>   
                <Route exact path="/" component={ ({ match }) => { window.location.href=match.url + "login/"; return <br/> }} />             
                <Route path="/login/" component={ ({ match }) => { return <LoginScreen url={match.url}/> }} />
                <Route path="/setup/" component={ ({ match }) => { return <SetupView url={match.url}/> }} />
                <Route path="/overview/" component={ ({ match }) => { return <Overview match={match}/> }} />
                <Route path="/register/" component={ ({ match }) => { return <Registration url={match.url}/> }} />     
                <Route exact path="/overview/companies/:company_id/divisions/:division_id/projects/:project_id/versions/" component={ ({ match }) => { return <ProjectView match={match}/> }} />       
                <Route exact path="/overview/companies/:company_id/divisions/:division_id/projects/:project_id/versions/:version_id/operating_systems/:operating_system_id/" component={ ({ match }) => { return <FileView match={match}/> }} />
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
