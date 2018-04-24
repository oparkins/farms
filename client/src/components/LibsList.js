import React, { Component } from 'react';
//import Tabs, { Tab } from 'material-ui/Tabs';
// import CompaniesTab from './overview/1_companies';
// import DivisionsTab from './overview/2_divisions';
// import ProjectsTab from './overview/3_projects';
// import '../styles/Overview.css';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';
import Paper from 'material-ui/Paper';


class LibsList extends Component {
  createLibsListItem (name) {
   return(
      <ListItem>
          <Avatar>
            <WorkIcon/>
          </Avatar>
        <ListItemText primary={name} secondary="Today" />
      </ListItem>
   );
 }

  render() {
    return (
      <div>
        <Paper style={{width: '50%', margin: '0 auto'}}>
          <List>
            {this.createLibsListItem("alib")}
            {this.createLibsListItem("blib")}
            {this.createLibsListItem("clib")}
          </List>
        </Paper>
      </div>
    );
  }
}


export default LibsList;
