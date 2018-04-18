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
import AuthenticationManager from './AuthenticationManager';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});
//const { classes } = props;

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
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Paper elevation={4}>
                            <div>
                                <TextField
                                    label="Enter your Username"
                                    floatingLabelText="Username"
                                    onChange={(event, newValue) => this.setState({ username: newValue })}
                                />
                                <br />
                                <TextField
                                    type="password"
                                    label="Enter your Password"
                                    floatingLabelText="Password"
                                    onChange={(event, newValue) => this.setState({ password: newValue })}
                                />
                                <br />
                                <Button variant="raised" onClick={(value) => { var _self = this; AuthenticationManager.signIn("farms@farms.fake.email", "Bob123456").then(function (data) {
                                    _self.state.changeWindowHandler(1) 
                                }).catch(function (error) {
                                    console.log(error)
                                    alert("login failed");
                                })}}>
                                    Log In
                        </Button>
                            </div>
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Login);