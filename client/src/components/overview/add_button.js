import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

// theme settings
const styles = theme => ({
    fab: {
        bottom: 20,
        right: 20,
        position: 'fixed'
    },
});

class AddButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            callback : props.callback
        }
    }
    render () {
        const { value } = this.state;
        const { classes, theme } = this.props;
        return  (
            <div>
                <Button variant="fab" color="primary" aria-label="add" className={classes.fab}>
                    <AddIcon />
                </Button>
            </div>
        );
    }

}

export default AddButton;