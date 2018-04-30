import React, { Component } from 'react';
import FileList from './fileview/FileList';
import LibsList from './fileview/LibsList';
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
  constructor(props) {
    super(props);
    this.state = {
      match: props.match
    };
  }

  render() {
    return (
      <div>
        <List subheader={<ListSubheader style={style}>Files List</ListSubheader>}>
          <FileList match={this.state.match}/>
        </List>
        <List subheader={<ListSubheader style={style}>Libraries List</ListSubheader>}>
          <LibsList match={this.state.match}/>
        </List>
      </div>
    );
  }
}


export default FileView;
