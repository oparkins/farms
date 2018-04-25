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

function getItems() {
     var json =  {
      "list": [{ "id": 1,
                 "title": "Version 1.2 JSON",
                 "items": [{
                            "id": 1,
                            "name": "Android",
                            "subitems": [{
                              "id": 1,
                              "name": "Nougat"
                            },
                             {
                              "id": 2,
                              "name": "Lollipop"
                            }]
                          },
                          {
                            "id": 2,
                            "name": "Chrome",
                            "subitems": [{
                              "id": 1,
                              "name": "Iphone 6"
                            },
                             {
                              "id": 2,
                              "name": "Iphone 10"
                            }]
                          }
                        ]},
              { "id": 2,
                 "title": "Mac JSON",
                 "items": [{
                            "id": 1,
                            "name": "Mac"
                          },
                          {
                            "id": 2,
                            "name": "Iphone",
                            "subitems": [{
                              "id": 1,
                              "name": "Iphone 6"
                            },
                             {
                              "id": 2,
                              "name": "Iphone 10",
                              "subitems": [{
                              "id": 1,
                              "name": "Iphone 6"
                            },
                             {
                              "id": 2,
                              "name": "Iphone 10"
                            }]
                            }]
                          }
                        ]},
              { "id": 3,
                            "title": "Linux JSON",
                            "items": [{
                              "id": 1,
                              "name": "Eats",
                              "subitems": [{
                              "id": 1,
                              "name": "Iphone 6"
                            },
                             {
                              "id": 2,
                              "name": "Iphone 10"
                            }]
                            },
                             {
                              "id": 2,
                              "name": "Freight",
                              "subitems": [{
                              "id": 1,
                              "name": "Iphone 6"
                            },
                             {
                              "id": 2,
                              "name": "Iphone 10"
                                }]
                            }]
                          }
                        ]};
  return json;
}

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeWindowHandler: props.changeWindowHandler,
      open : false, //closed initially
      company_id : 1,
      division_id : 1,
      project_id : 1,
      items: new Array()
    }
    this.getJSONData();
  }
  
    getVersions() {
        var data = [];
        var _self = this;
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/versions", "GET").then((versions_list) => { 
            versions_list.json().then((versions) => {
                for(var version_id in versions) {     
                    console.log("Doing Version: " + version_id);
                    _self.setState({items: _self.state.items.push(_self.getVersionTypes(versions[version_id], _self))});
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
    
    getOperationSystems(version, _self) {
        
        _self = _self || this;
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.project_id + "/versions/" + version['id'] + "/operating_systems/").then(function(operating_systems_list) {
                        operating_systems_list.json().then((operating_systems) => {
                            var os_array = [];
                            for(var os_id in operating_systems) {
                                
                                var os = operating_systems[os_id];
                                os_array.push(_self.getOperatingSystemType(os));
                                console.log(os_array);
                            }
                            console.log(os_array);
                            return {id : version['id'], name : version['buildDate'], os : os_array };
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

   

   render() {
    const items = getItems();
 
     return (
        <div>
        <p> {this.state.items} </p>
            <Paper style={{width: '50%', margin: '0 auto'}}>
                <Button variant="raised" onClick={(value) => { this.state.changeWindowHandler(1)}} >Back To Projects</Button>
                {items.list.map((list) => {
                return (
                    <List key={list.id} subheader={<ListSubheader>{list.title}</ListSubheader>}>
                        {list.items.map((item) => {
                            return ( 
                                <div key={item.id}>
                                    <ListItem button key={item.id}>
                                        <ListItemText primary={item.name} />
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
