import React, { Component } from 'react';
import FileList from './fileview/FileList';
import LibsList from './fileview/LibsList';
import List, { ListSubheader } from 'material-ui/List';

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
