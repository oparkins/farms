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
import Divider from 'material-ui/Divider';
import NetworkManager from './NetworkManager';


const styles = theme => ({
  root: {
    width: '100%',
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
      open : false, //closed initially
      company_id : 1,
      division_id : 1,
      project_id : 1,
      items: new Array(),
      os_array: new Array(),
      state: new Array()
    }
    this.getVersions();
  }
  
    getVersions() {
        var data = [];
        var _self = this;
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/versions", "GET").then((versions_list) => { 
            versions_list.json().then((versions) => {
                for(var version_id in versions) {     
                    _self.setState({items: versions});
                }
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
        console.log(version);
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/versions/" + version['id'] + "/operating_systems/").then(function(operating_systems_list) {
                        operating_systems_list.json().then((operating_systems) => {
                            
                            _self.state.os_array.push({id : version['id'], name : version['buildDate'], os : operating_systems });
                            console.log(_self.state.os_array);
                            _self.setState({os_array: _self.state.os_array});
                        });
                    })
    }
    
    getOperatingSystemType(os) {
        console.log("OS: " + os);
        NetworkManager.fetch("/os_types/" + os['os_type_id']).then(function(operating_systems_type) {  
            operating_systems_type.json().then((os_type) => {
                var os_item = {id : os['id'], name : os_type['name']};
                console.log("OS_ITEM: " + os_item);
                console.log(os_item);
                return os_item;
            });
                
        }).catch(function(error){
            console.log(" Versions Error " + error);
        });
    }
  
    getJSONData() {
        this.getVersions();
    }
  
   handleClick = (e) => {
     this.setState({ [e]: !this.state[e] });
   };

   get_os_array_item(version) {
        for(var os_array_id in this.state.os_array) {
            var os = this.state.os_array[os_array_id];
            console.log("OS:")
            console.log(os);
            console.log("ID: " + os.id + " Version ID: " + version.id)
            if(os.id == version.id) {
                console.log("Returning found:");
                console.log(os.os);
                return os.os;
            }
        }
        console.log("checking previous states")
        for(var id in this.state.state) {
            console.log("ID: " + id + " Version ID: " + version.id)
            if(id == version.id) {
                console.log("Found one already");
                return new Array();
            }
        }
        this.state.state.push(version.id);
        this.getOperatingSystems(version, this);
        return new Array();
   }
   

   render() {
 
     return (
        <div>
            <Paper style={{width: '50%', margin: '0 auto'}}>
                <Button variant="raised" onClick={(value) => { this.state.changeWindowHandler(1)}} >Back To Projects</Button>
                {this.state.items.map((list) => { // Maps the Versions (Release, debug, and version_id)
                return (
                    <List key={list.id} subheader={<ListSubheader>{"Version: " + list.buildDate + " " + list.version_type.name}</ListSubheader>}>
                        {console.log(this.get_os_array_item(list))}
                        {this.get_os_array_item(list).map((item) => { // Maps the operating systems under each version
                            return ( 
                                <div key={item.id}>
                                    <ListItem button key={item.id}>
                                        <ListItemText primary={item.os_type.name} />
                                    </ListItem>
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

ProjectView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectView);
