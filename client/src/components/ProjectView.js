import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

function getItems() {
     var json =  {
      "list": [{ "id": 1,
                 "title": "Windows",
                 "items": [{
                            "id": 1,
                            "name": "Version 1.2.3",
                            "subitems": [{
                              "id": 1,
                              "name": "Debug 1.2.3"
                            },
                             {
                              "id": 2,
                              "name": "Production 1.2.3"
                            }]
                          },
                          {
                            "id": 2,
                            "name": "Version 1.2.2"
                            }
                        ]
          
        }]
         
    };
  return json;
}

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeWindowHandler: props.changeWindowHandler,
      open1 : false, //closed initially
      open2 : false, //closed initially
      open3 : false //closed initially
    }
  }
  
//   handleClick = (e) => {
//     this.setState({ [e]: !this.state[e] });
//   };

  handleClick1 = () => {
    this.setState({ open1: !this.state.open1 });
  };
  
  handleClick2 = () => {
    this.setState({ open2: !this.state.open2 });
  };
  
    handleClick3 = () => {
    this.setState({ open3: !this.state.open3 });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Paper style={{width: '50%', margin: '0 auto'}}>
            <Button variant="raised" onClick={(value) => { this.state.changeWindowHandler(1)}} >Back To Projects</Button>
            <List
            component="nav"
            subheader={<ListSubheader component="div">Project Name Here</ListSubheader>}
            >
            <ListItem button onClick={this.handleClick1}>
                <ListItemText inset primary="Windows" />
                {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open1} timeout="auto" unmountOnExit={true}>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                    <ListItemText inset primary="Debug 1.2.3" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                    <ListItemText inset primary="Release 1.2.3" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                    <ListItemText inset primary="Debug 1.2.2" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                    <ListItemText inset primary="Release 1.2.2" />
                </ListItem>
                </List>
            </Collapse>

            <ListItem button onClick={this.handleClick2}>
                <ListItemText inset primary="Mac" />
                {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                <ListItemText inset primary="Debug 1.2.3" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                <ListItemText inset primary="Release 1.2.3" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                <ListItemText inset primary="Debug 1.2.2" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                <ListItemText inset primary="Release 1.2.2" />
                </ListItem>
                </List>
            </Collapse>

            <ListItem button onClick={this.handleClick3}>
                <ListItemText inset primary="Linux" />
                {this.state.open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                <ListItemText inset primary="Debug 1.2.3" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                    <ListItemText inset primary="Release 1.2.3" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                    <ListItemText inset primary="Debug 1.2.2" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(event) => {this.state.changeWindowHandler(3)}}>
                    <ListItemText inset primary="Release 1.2.2" />
                </ListItem>
                </List>
            </Collapse>
            </List>
        </Paper>
      </div>
    );
  }
}

ProjectView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectView);
