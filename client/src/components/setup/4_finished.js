import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/setup/2_server_location.css';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

class FinalTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callback : props.callback
        }
    }

    handleChange = (value) => {
        //this.state.callback();
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
                                Finished
                            </Typography>
                            <br/>
                            <Button variant="raised" color="primary"  onClick={this.handleChange}>Start Using FARMS</Button>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }

}

export default FinalTab;