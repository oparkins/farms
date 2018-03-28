import React from 'react';
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

class NestedList extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        >
          <ListItem button>
            <ListItemText inset primary="Windows" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Win10 1.3.9" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Win8.1 0.4.4" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Win7 1.4.3" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Win7 1.4.2" />
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
                <ListItemText inset primary="High Sierra 0.2.8" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Snow Leopard 3.1.4" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Yosemite 1.4.3" />
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
                <ListItemText inset primary="Fedora 1.4.5" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Fedora 1.4.4" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Fedora 1.4.3" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Ubuntu 4.0.2" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Ubuntu 3.2.0" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Arch 1.2.6" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
