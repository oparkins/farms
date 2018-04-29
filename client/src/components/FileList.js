import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';
import Paper from 'material-ui/Paper';



class FileList extends Component {
  createFileListItem (name) {
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
            {this.createFileListItem("aname")}
            {this.createFileListItem("bname")}
            {this.createFileListItem("cname")}
          </List>
        </Paper>
      </div>
    );
  }
}


export default FileList;
