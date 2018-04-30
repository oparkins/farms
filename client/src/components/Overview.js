import React, { Component } from 'react';
import CompaniesTab from './overview/1_companies';
import DivisionsTab from './overview/2_divisions';
import ProjectsTab from './overview/3_projects';
import '../styles/Overview.css';
import { Route } from 'react-router-dom';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: props.match
        }
    }

    render () {
        const _self = this;
        return  (
            <div>        
                <Route exact path={this.state.match.url + "/"} component={ ({ match }) => { window.location.href=match.url + "companies/"; return <br/> }} />
                <Route exact path={this.state.match.url + "/companies/"} component={ ({ match }) => { return <CompaniesTab match={match}/> }} />
                <Route exact path={this.state.match.url + "/companies/:company_id/divisions/"} component={ ({ match }) => { return <DivisionsTab match={match}/> }} />
                <Route exact path={this.state.match.url + "/companies/:company_id/divisions/:division_id/projects"} component={ ({ match }) => { return <ProjectsTab match={match}/> }} />
            </div>
        );
    }
}


export default Overview;