import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import CompaniesTab from './overview/1_companies';
import DivisionsTab from './overview/2_divisions';
import ProjectsTab from './overview/3_projects';
import Menu, { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import '../styles/Overview.css';

const styles = {
    root: {
      width: '100%',
    },
    flex: {
      flex: 3,
    },
  
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };


class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : true,
            anchorEl: null,
            auth: true,
            value: 0,
            changeWindowHandler: props.changeWindowHandler
        }

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    changeTab = (value) => {
        this.setState({value: value});
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    render () {
        const { value, auth, anchorEl } = this.state;
        const { classes } = this.props;
        const open = Boolean(anchorEl);

        return  (
            <div className={classes.root}>
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose}>
                    <AppBar position="static" >
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu" style={{ marginLeft: -12, marginRight: 20,}}>
                                <MenuIcon />
                            </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            F.A.R.M.S
                        </Typography>

                        {auth && (
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
                                <MenuItem onClick={(value) => this.state.changeWindowHandler(0)}>Logout</MenuItem>
                                </Menu>
                            </div>
                            )}
                        </Toolbar>

                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            centered
                            >
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                        </Tabs>
                    </AppBar>

                    {value === 0 && <CompaniesTab callback={this.changeTab}/>}
                    {value === 1 && <DivisionsTab callback={this.changeTab}/>}
                    {value === 2 && <ProjectsTab callback={this.changeTab} changeWindowHandler={this.state.changeWindowHandler}/>}
                </Dialog>
            </div>
        );

    }
}


Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
//export default Overview;
export default withStyles(styles)(Overview);