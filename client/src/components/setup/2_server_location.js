import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/setup/2_server_location.css';
import Paper from 'material-ui/Paper';
import Config from '../../config/config';
import {CircularProgress} from 'material-ui/Progress';

class ServerLocationTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callback : props.callback,
            serverValid : true,
            loading: false
        }
    }

    handleChange = (value) => {
        this.state.callback(2);
    };

    checkServerStatus = () => {
        let fetchData = {
            method: 'GET',
            headers: new Headers()
        }
        var currentThis = this;
        console.log("Server: " + Config.ServerAddress + "/companies");
        fetch(Config.ServerAddress + "/companies", fetchData)
            .then(function(data) { //data will be companies
                currentThis.setState({serverValid : true, loading: false});
                currentThis.handleChange();
                return true;
            })
            .catch(function(error) {
                console.log(error)
                currentThis.setState({serverValid : false, loading: false});
                return false;
            });
    }

    buttonHandler = (value) => {
        this.setState({loading : true});
        this.checkServerStatus();
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
                                Server Location
                            </Typography>
                            <TextField
                                id="serverAddress"
                                label="Server Address"
                                margin="normal"
                                placeholder="Server Address"
                                value={Config.ServerAddress}
                                disabled={true}
                            />
                            <br/>
                            <Typography>If the above address is incorrect, change the address located in the 'src/config/config.js' file. Then recompile the project</Typography>
                            <Button variant="raised" color="primary"  onClick={this.buttonHandler}>Check Address</Button>
                            {this.state.loading && <CircularProgress />}
                            {!this.state.serverValid && <Typography>Address Invalid. Please update the address and try again.</Typography>}
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }

}

export default ServerLocationTab;