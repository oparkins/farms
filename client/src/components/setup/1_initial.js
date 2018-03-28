import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import '../../styles/setup/1_initial.css';
import Paper from 'material-ui/Paper';

class InitialTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callback : props.callback
        }
    }

    handleChange = (value) => {
        this.state.callback(1);
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
                                Welcome!
                            </Typography>
                            <p> Let's get started </p>
                            <Button variant="raised" color="primary"  onClick={this.handleChange}>Get Started</Button>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        );
    }

}

export default InitialTab;