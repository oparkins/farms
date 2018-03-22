import React, { Component } from 'react';
//import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

// floating icon 
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

// list
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

//import '../styles/Overview.css';

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 360,
        position: 'relative',
        minHeight: 200,
        backgroundColor: theme.palette.background.paper,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
      },
});

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Overview extends Component {
    constructor(props) {
        super(props);

        // not sure what this is yest vvvv
        this.state = {
            open : true
        }

        // start on first tab
        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    

    render () {
        const { value } = this.state;
        const { classes, theme } = this.props;

        return  (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} centered >
                        <Tab label="Overview" />
                        <Tab label="Projects" />
                        <Tab label="Versions"/>
                    </Tabs>
                </AppBar>

                {value === 0 && <TabContainer>{this.InsetList()}</TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}

                <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
                </Button>


            </div>
        );
    }

    TabContainer() {
        const { children, dir } = this.props;
      
        return (
          <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
          </Typography>
        );
    }


    InsetList() {
        const { classes, theme } = this.props;
        return (
        <div className={classes.root}>
            <List component="nav">
            <ListItem button>
                <ListItemText inset primary="Item 1" />
            </ListItem>
            <ListItem button>
                <ListItemText inset primary="Item 2" />
            </ListItem>
            </List>
        </div>
        );
    }


}

//export default Overview;
export default withStyles(styles)(Overview);