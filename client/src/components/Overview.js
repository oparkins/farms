import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import CompaniesTab from './overview/1_companies';
import DivisionsTab from './overview/2_divisions';
import ProjectsTab from './overview/3_projects';
import '../styles/Overview.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            match: props.match
        }
    }

    changeTab = (value) => {
        this.setState({value: value});
    }

    render () {
        const { value } = this.state;
        const _self = this;
        return  (
            <div>        
                <Route exact path={this.state.match.url + "/"} component={ ({ match }) => { window.location.href=match.url + "companies/"; }} />
                <Route exact path={this.state.match.url + "/companies/"} component={ ({ match }) => { return <CompaniesTab match={match}/> }} />
                <Route exact path={this.state.match.url + "/companies/:company_id/divisions/"} component={ ({ match }) => { return <DivisionsTab match={match}/> }} />
                <Route exact path={this.state.match.url + "/companies/:company_id/divisions/:division_id/projects"} component={ ({ match }) => { return <ProjectsTab match={match}/> }} />
            </div>
        );
    }
}


export default Overview;