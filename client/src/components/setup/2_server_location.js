import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/setup/2_server_location.css';
import Paper from 'material-ui/Paper';

class ServerLocationTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callback : props.callback
        }
    }

    handleChange = (value) => {
        this.state.callback(2);
      };

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
                            />
                            <br/>
                            <Button variant="raised" color="primary"  onClick={this.handleChange}>Check Address</Button>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }

}

export default ServerLocationTab;