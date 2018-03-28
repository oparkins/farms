import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import Button from 'material-ui/Button';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeWindowHandler: props.changeWindowHandler,
      open : true
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button variant="raised" onClick={(value) => { this.state.changeWindowHandler(1)}} >Back To Projects</Button>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        >
          <ListItem button>
            <ListItemText inset primary="Windows" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit={true}>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Debug 1.2.3" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Release 1.2.3" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Debug 1.2.2" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Release 1.2.2" />
              </ListItem>
              </List>
          </Collapse>
          
          <ListItem button>
            <ListItemText inset primary="Mac" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
            <ListItemText inset primary="Debug 1.2.3" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText inset primary="Release 1.2.3" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText inset primary="Debug 1.2.2" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText inset primary="Release 1.2.2" />
            </ListItem>
              </List>
          </Collapse>
          
          <ListItem button onClick={this.handleClick}>
            <ListItemText inset primary="Linux" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
              <ListItemText inset primary="Debug 1.2.3" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Release 1.2.3" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Debug 1.2.2" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Release 1.2.2" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

ProjectView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectView);
