import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';

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
        var divStyleFullScreen = {
            paddingRight: this.setWidthStuff(),
            paddingLeft: this.setWidthStuff(),
            paddingTop: window.innerHeight * .10,
        };
        var divStyleSecondaryPaper = {
            paddingRight: this.setWidthStuff(),
            paddingLeft: this.setWidthStuff(),
            //paddingTop: window.innerHeight * .10,
        };

        var paperStyleFullScreen = {
            minHeight: this.setHeightStuff(),
        };
        var paperStyleSecondary = {
            minHeight: this.setHeightStuff() - 225,
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
                    <br></br>
                    <div style={divStyleSecondaryPaper} >
                        <Paper elevation={4} style={paperStyleSecondary}>
                            <br></br>
                            New to FARMS? Register <Button size="small" onClick={(value) => { this.state.changeWindowHandler(4) }}>here</Button>
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;