import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Checkbox from 'material-ui/Checkbox';
import Zoom from 'material-ui/transitions/Zoom';

class ProjectsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked1: false,
            checked2: false,
            changeWindowHandler: props.changeWindowHandler,
            callback : props.callback
        }
    }

    changeWindow = (value) => {
        this.state.changeWindowHandler(2);
    }

    handleChange = (value) => {
       //this.state.callback()
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render () {
        const { value } = this.state;

        return  (
            <div>
            <Paper style={{width: '50%', margin: '0 auto'}}>
                <List component="nav">
                <ListItem button={true} onClick={this.changeWindow}>
                    <ListItemText inset primary="Item 1" />
                    <Checkbox
                        checked={this.state.checked1}
                        onChange={this.handleChange('checked1')}
                        value="checked1"
                    />
                </ListItem>
                <ListItem button={true} onClick={this.changeWindow}>
                    <ListItemText inset primary="Item 2" />
                    <Checkbox
                        checked={this.state.checked2}
                        onChange={this.handleChange('checked2')}
                        value="checked2"
                    />
                </ListItem>
                </List>

                <Button variant="fab" color='primary' aria-label="add" style={{bottom: 20, right: 20, position: 'fixed'}}>
                    <AddIcon/>
                </Button>

            </Paper>
            </div>
        );
    }
}

export default ProjectsTab;