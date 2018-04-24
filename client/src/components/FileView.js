import React, { Component } from 'react';
import FileList from './FileList';
import LibsList from './LibsList';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';
import Paper from 'material-ui/Paper';

const style = {
  fontSize: 30
};

class FileView extends Component {

  render() {
    return (
      <div>
        <List subheader={<ListSubheader style={style}>Files List</ListSubheader>}>
          <FileList/>
        </List>
        <List subheader={<ListSubheader style={style}>Libraries List</ListSubheader>}>
          <LibsList/>
        </List>
      </div>
    );
  }
}


export default FileView;
