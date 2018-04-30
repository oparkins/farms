import React, { Component } from 'react';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import NetworkManager from './NetworkManager';
import {isMobile} from 'react-device-detect';
import { Link } from 'react-router-dom';


class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: props.match,
      company_id: props.match.params.company_id,
      division_id: props.match.params.division_id,
      project_id: props.match.params.project_id,
      items: [],
      os_array: [],
      requested_os_ids: []
    }
    this.getVersions();
  }
  
    getVersions() {
        var _self = this;
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/versions", "GET").then((versions_list) => { 
            versions_list.json().then((versions) => {
                _self.setState({items: versions});
            });            
        }).catch(function(error){
            console.log(" Versions Error " + error);
        });
    }
    
    getVersionTypes(version, _self) {
        _self = _self || this;
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/version_types/" + version['version_type_id']).then(function(version_type){                     
                    return _self.getOperationSystems(version, _self);
                }).catch(function(error){
                       console.log(" Versions Error " + error);
                });
    }
    
    getOperatingSystems(version, _self) {
        
        _self = _self || this;
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/versions/" + version['id'] + "/operating_systems/").then(function(operating_systems_list) {
                        operating_systems_list.json().then((operating_systems) => {
                            
                            _self.state.os_array.push({id : version['id'], name : version['buildDate'], os : operating_systems });
                            _self.setState({os_array: _self.state.os_array});
                        });
                    })
    }
    
    getOperatingSystemType(os) {
        NetworkManager.fetch("/os_types/" + os['os_type_id']).then(function(operating_systems_type) {  
            operating_systems_type.json().then((os_type) => {
                var os_item = {id : os['id'], name : os_type['name']};
                return os_item;
            });
                
        }).catch(function(error){
            console.log(" Versions Error " + error);
        });
    }

   get_os_array_item(version) {
        for(var os_array_id in this.state.os_array) {
            var os = this.state.os_array[os_array_id];
            if(os.id === version.id) {
                return os.os;
            }
        }
        for(var id in this.state.state) {
            if(id === version.id) {
                return [];
            }
        }
        this.state.requested_os_ids.push(version.id);
        this.getOperatingSystems(version, this);
        return [];
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
            <br/>
            <Paper style={this.getPaperStyle()}>
                {this.state.items && this.state.items.map((list) => { // Maps the Versions (Release, debug, and version_id)
                return (
                    <List key={list.id} subheader={<ListSubheader>{"Version: " + list.buildDate + " " + list.version_type.name}</ListSubheader>}>
                        {this.get_os_array_item(list).map((item) => { // Maps the operating systems under each version
                            return ( 
                                <div key={item.id}>
                                    <Link to={this.state.match.url + list.id + "/operating_systems/" + item.id + "/"}><ListItem button key={item.id}>
                                        <ListItemText primary={item.os_type.name} />
                                    </ListItem></Link>
                                </div>                            
                            )
                                                
                          })}
                        
                    </List>
                )
                })}
            </Paper>
        </div>
     );
   }
}


export default ProjectView;
