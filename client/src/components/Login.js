import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            changeWindowHandler: props.changeWindowHandler
        }
    }
    render() {
        var divStyleFullScreen = {
            paddingRight: window.innerWidth * .40,
            paddingLeft: window.innerWidth * .40,
            paddingTop: window.innerHeight * .10,
        };

        var paperStyleFullScreen = {
            minHeight: window.innerHeight * .25
        };
        return (
            <div>
                <MuiThemeProvider>
                    <div style={divStyleFullScreen} >
                        <Paper elevation={4} style={paperStyleFullScreen}>
                            <br>
                            </br>
                            <br>
                            </br>
                            <div>
                                <TextField
                                    label="Enter your username:"
                                    placeholder="Username"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event, newValue) => this.setState({ username: newValue })}
                                />
                                <br>
                                </br>
                                <br/>
                                <TextField
                                    label="Enter your password:"
                                    placeholder="Password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event, newValue) => this.setState({ password: newValue })}
                                />
                                <br/>
                                <br>
                                </br>
                                <div>
                                    <Button 
                                        variant="raised"
                                        size="large"
                                        onClick={(value) => { this.state.changeWindowHandler(1) }}>
                                        Log In
                                    </Button>
                                </div>
                                <br>
                                </br>
                                <br>
                                </br>
                                Forgot your password? Click here.
                            </div>
                        </Paper>
                        <div>
                        <Paper elevation={4}>
                        </Paper>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Login);