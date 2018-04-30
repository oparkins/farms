import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import InitialTab from './setup/1_initial';
import ServerLocationTab from './setup/2_server_location';
import InitialDataTab from './setup/3_initial_data';
import FinalTab from './setup/4_finished';
import '../styles/Setup.css';

class Setup extends Component {
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
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
            >
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Welcome" />
                        <Tab label="Server Location" />
                        <Tab label="Initial Data"/>
                        <Tab label="Finished"/>
                    </Tabs>
                </AppBar>
                {value === 1 && <ServerLocationTab callback={this.changeTab} /> }
                {value === 0 && <InitialTab callback={this.changeTab} /> }
                {value === 2 && <InitialDataTab callback={this.changeTab} /> }
                {value === 3 && <FinalTab callback={(value) => {this.state.changeWindowHandler(0); }}/> }
            </Dialog>
        );
    }

}

export default Setup;