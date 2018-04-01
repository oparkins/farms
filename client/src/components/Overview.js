import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';

import CompaniesTab from './overview/1_companies';
import DivisionsTab from './overview/2_divisions';
import ProjectsTab from './overview/3_projects';
import '../styles/Overview.css';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : true,
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
    
    render () {
        const { value } = this.state;

        return  (
            <div>
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Tabs value={value} onChange={this.handleChange} style={{width: '50%', margin: '0 auto'}} >
                                <Tab label="Companies"/>
                                <Tab label="Divisions"/>
                                <Tab label="Projects"/>
                            </Tabs>
                        </Toolbar>
                    </AppBar>
                    {value === 0 && <CompaniesTab callback={this.changeTab}/>}
                    {value === 1 && <DivisionsTab callback={this.changeTab}/>}
                    {value === 2 && <ProjectsTab callback={this.changeTab} changeWindowHandler={this.state.changeWindowHandler}/>}
                    <Button variant="raised" onClick={(value) => this.state.changeWindowHandler(0)}>Logout</Button>
                </Dialog>
            </div>
        );

    }
}

//export default Overview;
export default Overview;