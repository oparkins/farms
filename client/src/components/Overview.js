import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import CompaniesTab from './overview/1_companies';
import DivisionsTab from './overview/2_divisions';
import ProjectsTab from './overview/3_projects';
import '../styles/Overview.css';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            changeWindowHandler: props.changeWindowHandler,
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
        const _self = this;
        return  (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    centered
                    className="Overview-TabBar"
                    >
                    <Tab label="Companies" />
                    <Tab label="Divisions" />
                    <Tab label="Projects" />
                </Tabs>
                <br/>
                {value === 0 && <CompaniesTab callback={this.changeTab}/>}
                {value === 1 && <DivisionsTab callback={this.changeTab}/>}
                {value === 2 && <ProjectsTab callback={this.changeTab} changeWindowHandler={this.state.changeWindowHandler}/>}
            </div>
        );
    }
}


export default Overview;