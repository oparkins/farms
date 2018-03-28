import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/setup/2_server_location.css';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

class InitialDataTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callback : props.callback
        }
    }

    handleChange = (value) => {
        this.state.callback(3);
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
                                Setting Up Database
                            </Typography>
                            <br/>
                            <CircularProgress/>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }

}

export default InitialDataTab;