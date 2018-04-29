import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/setup/2_server_location.css';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Checkbox from 'material-ui/Checkbox';
import {
    FormGroup,
    FormControlLabel,
  } from 'material-ui/Form';
import NetworkManager from "../NetworkManager";
import AuthenticationManager from '../AuthenticationManager';

class InitialDataTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callback : props.callback,
            name: "",
            email: "",
            password: "",
            company: "",
            division: "",
            project: "",
            os_types: ["Windows x64", "Windows x86", "Linux x64", "Linux x86", "Mac x64", "Mac x32"],
            version_types: ["Release", "Debug"],
            company_id: null,
            division_id: null,
            project_id: null,
            addUserCompleted: false,
            addOperatingSystemsCompleted: false
        }
    }

    initializeDatabase() {
        this.addUser(this).
        this.addOperatingSystems(this);
        this.state.callback(3);
    }

    addUser(_self) {
        _self = _self || this;
        AuthenticationManager.createAccount(_self.state.email, _self.state.password).then((response) => {
            AuthenticationManager.signIn(_self.state.email, _self.state.password).then((response) => {
                _self.addCompany(_self);
            });           
        }).catch((error) => {
            
        });
    }

    addCompany(_self) {
        _self = _self || this;
        NetworkManager.fetchWithParameters("/companies", "POST", {
            name: _self.state.company
        }).then((response) => {
            response.json().then((data) => {
                _self.setState({company_id: data["id"]});
                _self.addDivision(_self);
            }); 
        }).catch((error) => {
            //TODO: Show an error
        });
    }

    addDivision(_self) {
        _self = _self || this;
        NetworkManager.fetchWithParameters("/companies/" + _self.state.company_id + "/divisions", "POST", {
            name: _self.state.division
        }).then((response) => {
            response.json().then((data) => {
                _self.setState({division_id: data["id"]});
                _self.addProject(_self);
            }); 
        }).catch((error) => {
            //TODO: Show an error
        });
    }

    addProject(_self) {
        _self = _self || this;
        NetworkManager.fetchWithParameters("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects", "POST", {
            name: _self.state.project
        }).then((response) => {
            response.json().then((data) => {
                this.state.project_id = data["id"];
                _self.addVersionTypes(_self);
            }); 
        }).catch((error) => {
            //TODO: Show an error
        });
    }

    addOperatingSystems(_self) {
        _self = _self || this;
        for(var name in _self.state.os_types) {
            NetworkManager.fetchWithParameters("/os_types/", "POST", {
                name: name
            });
        }
        this.setState({addOperatingSystemsCompleted: true});
    }

    addVersionTypes(_self) {
        _self = _self || this;
        for(var name in _self.state.version_types) {
            NetworkManager.fetchWithParameters("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/version_types", "POST", {
                name: name
            });
        }
        this.setState({addUserCompleted: true});
    }

    listVersionTypes() {
        var lists = [];
        for(var name in this.state.version_types) {
            lists.push(
            <FormControlLabel
                key={name+"form_key"}
                control={
                <Checkbox
                    onChange={(event) => {}}
                    value="gilad"
                    key={name+"_key"}
                />
                }
                label={this.state.version_types[name]}
            />);
        }
        return lists;
    }

    listOperatingSystemTypes() {
        var lists = [];
        for(var name in this.state.os_types) {
            lists.push(
                <FormControlLabel
                    key={name+"form_key"}
                    control={
                    <Checkbox
                        onChange={(event) => {}}
                        value="gilad"
                    />
                    }
                    label={this.state.os_types[name]}
                />);
        }
        return lists;
    }
    

    render () {
        const { value } = this.state;
        return  (
            <div>
            <br/>
            <br/>
            <br/>
                <Paper style={{width: '50%', margin: '0 auto'}}>                
                    <Card className="card">
                        <CardContent>
                            <Typography className="title" variant="headline" component="h2">
                                Quien es?
                            </Typography>
                            <br/>
                            <TextField 
                                id="usersName"
                                label="Name"
                                placeholder="John Smith"
                                onChange={(event) => { this.setState({name: event.target.value})}} />
                            <br/>
                            <TextField 
                                required
                                id="email"
                                label="Email Address"
                                placeholder="jsmith@fake.email.com"
                                onChange={(event) => { this.setState({email: event.target.value})}}/>
                            <br/>
                            <TextField 
                                required
                                id="password"
                                label="Password"
                                type="password"
                                onChange={(event) => { this.setState({password: event.target.value})}}/>
                            <br/>
                            <TextField 
                                required
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"/>                            
                        </CardContent>
                    </Card>
                    <br/>
                    <Card className="card">
                        <CardContent>
                            <Typography className="title" variant="headline" component="h2">
                                Whatcha doing?
                            </Typography>
                            <br/>
                            <TextField 
                                id="company"
                                label="Company"
                                onChange={(event) => { this.setState({company: event.target.value})}}/>
                            <br/>
                            <TextField                             
                                id="division"
                                label="Division"
                                onChange={(event) => { this.setState({division: event.target.value})}}/>
                            <br/>
                            <TextField 
                                required
                                id="project"
                                label="Project"
                                onChange={(event) => { this.setState({project: event.target.value})}}/>
                        </CardContent>
                    </Card>
                    <br/>
                    <Card className="card">
                        <CardContent>
                            <Typography className="title" variant="headline" component="h2">
                                Almost there...
                            </Typography>
                            <br/>
                            <FormGroup>
                                { this.listOperatingSystemTypes() }
                            </FormGroup>
                        </CardContent>
                    </Card>
                    <br/>

                    <Card className="card">
                        <CardContent>
                            <Typography className="title" variant="headline" component="h2">Last, but not least...</Typography>
                            <br/>
                            <FormGroup>
                                {
                                    this.listVersionTypes()
                                }
                            </FormGroup>
                            <Button variant="raised" color="primary" onClick={(value) => {this.initializeDatabase()} }> Continue </Button>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }

}

export default InitialDataTab;