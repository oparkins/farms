import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import WorkIcon from 'material-ui-icons/Work';
import NetworkManager from '../NetworkManager';
import Paper from 'material-ui/Paper';
import {isMobile} from 'react-device-detect';


class FileList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      match: props.match,
      company_id: props.match.params.company_id,
      division_id: props.match.params.division_id,
      project_id: props.match.params.project_id,
      version_id: props.match.params.version_id,
      operating_system_id: props.match.params.operating_system_id,
      files: []
    };
    this.getFiles();
  }

  getFiles() {
    var _self = this;
    NetworkManager.fetch("/companies/" + this.state.company_id + "/divisions/" + this.state.division_id + "/projects/" + this.state.project_id + "/versions/" + this.state.version_id + "/operating_systems/" + this.state.operating_system_id + "/filedata", "GET").then((response) => {
      response.json().then((files) => {
        _self.setState({files: files});
      });
    }).catch((error) => {
      console.log("Error Occurred" + error);
    });
  }

  createFileListItem (name, hash) {
   return(
      <ListItem>
          <Avatar>
            <WorkIcon/>
          </Avatar>
        <ListItemText primary={name} secondary={hash} />
      </ListItem>
   );
 }

  getPaperStyle() {
    if(isMobile) {
      return {width: '100%', margin: '0 auto'};
    } else {
      return {width: '50%', margin: '0 auto'}; 
    }
  }

  render() {
    return (
      <div>
        <Paper style={this.getPaperStyle()}>
          <List>
            {this.state.files.map((file) => {
              return this.createFileListItem(file["name"], file["dataHash"]);
            })}
          </List>
        </Paper>
      </div>
    );
  }
}


export default FileList;
