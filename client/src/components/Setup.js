import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import '../styles/Setup.css';

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : true
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };

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
                        <Tab label="Setup Task One" />
                        <Tab label="Setup Task Two" />
                        <Tab label="Setup Task Three"/>
                    </Tabs>
                </AppBar>
                {value === 0 && <p>Tab1</p>}
                {value === 1 && <p>Tab2</p>}
                {value === 2 && <p>Tab3</p>}
            </Dialog>
        );
    }

}

export default Setup;