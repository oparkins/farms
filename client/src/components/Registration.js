import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';

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

    setHeightStuff() {
        console.log(window.innerHeight)
        if (window.innerHeight >= 2000) {
            return (window.innerHeight * .14)
        } else if (window.innerHeight >= 1000) {
            return (window.innerHeight * .25)
        } else if (window.innerHeight >= 800) {
            return (window.innerHeight * .35)
        } else if (window.innerHeight >= 700) {
            return (window.innerHeight * .42)
        } else {
            return (window.innerHeight * .55)
        }
    }

    setWidthStuff() {
        if (window.innerWidth >= 3800) { //4K
            return (window.innerWidth * .45)
        } else if (window.innerWidth >= 1800) { //1080p
            return (window.innerWidth * .40)
        } else if (window.innerWidth >= 1200) { //720p
            return (window.innerWidth * .35)
        } else {
            return (window.innerWidth * .30)
        }
    }

    render() {
        console.log(window.innerWidth);
        var divStyleFullScreen = {
            paddingRight: this.setWidthStuff(),
            paddingLeft: this.setWidthStuff(),
            paddingTop: window.innerHeight * .10,
        };
        var paperStyleFullScreen = {
            minHeight: this.setHeightStuff(),
        };
        return (
            <div>
                <MuiThemeProvider>
                    <div style={divStyleFullScreen} >
                        <Paper elevation={4} style={paperStyleFullScreen}>
                            <br></br>
                            <br></br>
                            <div>
                                <TextField
                                    label="Enter your username:"
                                    placeholder="Username"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event, newValue) => this.setState({ username: newValue })}
                                />
                                <br></br>
                                <br />
                                <TextField
                                    label="Enter your password:"
                                    placeholder="Password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event, newValue) => this.setState({ password: newValue })}
                                />
                                <br />
                                <br></br>
                                <div>
                                    <Button
                                        variant="raised"
                                        size="large"
                                        //THIS ON CLICK NEEDS TO CALL THE BACK END
                                        onClick={(value) => { this.state.changeWindowHandler(0) }}>
                                        Register
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;