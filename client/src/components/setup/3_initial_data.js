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
            company_id: nil,
            division_id: nil,
            project_id: nil
        }
    }

    componentDidMount() {
        this.initializeDatabase();
    }

    handleChange = (value) => {
        //this.state.callback(3);
    };

    initializeDatabase() {
        this.addUser();
    }

    addUser() {
        AuthenticationManager.createAccount(this.state.email, this.state.password);
    }

    addCompany() {
        NetworkManager.fetchWithParameters("/companies", "POST", {
            name: this.state.company
        }).then((response) => {
            addDivision();
        }).catch((error) => {
            //TODO: Show an error
        });
    }

    addDivision() {

    }

    addProject() {
        
    }

    

    addOperationSystems() {

    }

    addVersionTypes() {

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
                                onChange={(event) => { this.setState({company: event.target.value})}}/>
                            <br/>
                            <TextField 
                                required
                                id="project"
                                label="Project"
                                onChange={(event) => { this.setState({company: event.target.value})}}/>
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
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.gilad}
                                        onChange={this.handleChange('gilad')}
                                        value="gilad"
                                    />
                                    }
                                    label="Windows x64"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.jason}
                                        onChange={this.handleChange('jason')}
                                        value="jason"
                                    />
                                    }
                                    label="Windows x86"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.antoine}
                                        onChange={this.handleChange('antoine')}
                                        value="antoine"
                                    />
                                    }
                                    label="Linux x64"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.antoine}
                                        onChange={this.handleChange('antoine')}
                                        value="antoine"
                                    />
                                    }
                                    label="Linux x86"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.antoine}
                                        onChange={this.handleChange('antoine')}
                                        value="antoine"
                                    />
                                    }
                                    label="MacOS"
                                />
                            </FormGroup>
                        </CardContent>
                    </Card>
                    <br/>

                    <Card className="card">
                        <CardContent>
                            <Typography className="title" variant="headline" component="h2">
z                            </Typography>
                            <br/>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.gilad}
                                        onChange={this.handleChange('gilad')}
                                        value="gilad"
                                    />
                                    }
                                    label="Release"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.jason}
                                        onChange={this.handleChange('jason')}
                                        value="jason"
                                    />
                                    }
                                    label="Debug"
                                />                
                            </FormGroup>

                            <Button variant="raised" color="primary"> Continue </Button>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }

}

export default InitialDataTab;