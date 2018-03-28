import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login';
import Button from 'material-ui/Button';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginscreen: [],
            loginmessage: '',
            buttonLabel: 'Register',
            isLogin: true,
            changeWindowHandler : props.changeWindowHandler
        }
    }

    componentWillMount() {
        var loginscreen = [];
        loginscreen.push(<Login changeWindowHandler={this.state.changeWindowHandler} parentContext={this} appContext={this.props.parentContext} />);
        var loginmessage = "";
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        })
    }
    render() {
        return (
            <div className="loginscreen">
                {this.state.loginscreen}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default LoginScreen;