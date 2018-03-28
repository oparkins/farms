import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';

import DivisionsTab from './overview/1_divisions';
import '../styles/Overview.css';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : true,
            value: 0
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
                        <Tabs value={value} onChange={this.handleChange} style={{width: '46%', margin: '0 auto'}} >
                            <Tab label="Divisions"/>
                            <Tab label="Projects"/>
                            <Tab label="Versions"/>
                        </Tabs>
                    </Toolbar>
                    </AppBar>
                    {value === 0 && <DivisionsTab callback={this.chengeTab}/>}
                </Dialog>
            </div>
        );

    }
}

//export default Overview;
export default Overview;