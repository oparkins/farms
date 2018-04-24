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
    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    setHeightStuff() {
        console.log(window.innerHeight)
        if(window.innerHeight >= 2000) {
            return(window.innerHeight * .15)
        }else if(window.innerHeight >= 1000) {
            return(window.innerHeight * .25)
        } else if (window.innerHeight >= 800) {
            return(window.innerHeight * .35)
        } else if(window.innerHeight >= 700) {
            return(window.innerHeight * .42)
        } else {
            return(window.innerHeight * .55)
        }
    }

    setWidthStuff() {
        if(window.innerWidth >= 3800) { //4K
            return(window.innerWidth * .40)
        } else if (window.innerWidth >= 1800) { //1080p
            return(window.innerWidth * .40)
        } else if (window.innerWidth >= 1200) { //720p
            return(window.innerWidth * .35)
        } else {
            return(window.innerWidth * .30)
        }
    }

    render() {
        console.log(window.innerWidth);
        var divStyleFullScreen = {
            //paddingRight: window.innerWidth * .40,
            //paddingLeft: window.innerWidth * .40,
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
                                        onClick={(value) => { this.state.changeWindowHandler(1) }}>
                                        Log In
                                    </Button>
                                </div>
                                <br></br>
                                <br></br>
                                Forgot your password? Click <Button size="small" onClick={this.handleClick}>here</Button>
                            </div>
                        </Paper>
                        <Snackbar
                            open={this.state.open}
                            onClose={this.handleClose}
                            transition={Fade}
                            SnackbarContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Password Recovery E-Mail Sent</span>}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Login);