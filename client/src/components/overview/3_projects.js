import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui-icons/Delete';
import Tabs, { Tab } from 'material-ui/Tabs';
import NetworkManager from '../NetworkManager';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
  } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {isMobile} from 'react-device-detect';
import { Link } from 'react-router-dom';
import Redirect from 'react-router/Redirect';

class ProjectsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeWindowHandler: props.changeWindowHandler,
            callback : props.callback,

            listItems: [], 
            showDialog: false, //Shows the dialog box
            deleteItem: false, //Decide if we are deleting or adding companies
            checkedItems: [], //Holds the id numbers of the checked items
            match: props.match,
            company_id: props.match.params.company_id,
            division_id: props.match.params.division_id,
            
            name: "",
            projectLead: "",
            email: "",

        };
        this.getProjects(this); //Populate the list with companies
    }

    /**
     * Handles the change for the checkbox. It will first figure out if the
     * item is in the list or not. If it is, then remove the item from the
     * list. If it is not, add the item to the list. Then, passed on the
     * size of the list, change the add button to the delete button. This
     * logic is to allow users to unselect items if they wish.
     */
    checkboxHandler = (value) => {
        var id = value["id"];
        var index =this.state.checkedItems.indexOf(id); 
        
        //Add or remove?
        if(index > -1) {
            this.state.checkedItems.splice(index, 1);
        } else {
            this.state.checkedItems.push(id);
        }

        //Are we still planning on deleting?
        if(this.state.checkedItems.length > 0) {
            this.setState({deleteItem : true});
        } else {
            this.setState({deleteItem : false});
        }
    };

    /**
     * Creates a template list item. It takes the id and the name
     * of the project. It will create the list item and return it.
     * The ID number is used as the value that is passed to the
     * checkboxHandler method.
     */
    createListItem = (id, name, self) => {
        var _self = self || this;
        return (<Link key={name+id+"link"} to={this.state.match.url + id + "/versions/"}><ListItem button value={id} key={name + id}>
                    <ListItemText inset primary={name} />
                    <Checkbox
                        key={name + id + "checkbox"}
                        onChange={(event, checked) => {_self.checkboxHandler({id})}}
                        value='checked1'
                    />
                </ListItem></Link>
                );
    }


    /**
     * Creates and sends the request to add a project to the server.
     * After the request has been returned, it will update the state
     * of the component.
     */
    addProject = (_self) => {
        var tmpData = {
            name: _self.state.name,
            projectLead: _self.state.projectLead,
            email: _self.state.email
        }
        //TODO: Change the below template to use input values from dialog box
        NetworkManager.post("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects", "POST", tmpData).then((data) => {
            _self.setState({showDialog: false});
            _self.getProjects(_self);
        }).catch((error) => { 
            //TODO: Show some banner? Like a snack bar? https://material-ui-next.com/demos/snackbars/
            console.log("Error happened with addProject(); " + error);
        });

        // TODO: find a better way to reset everything, maybe an array of elements?
        // set everything back to zero
        _self.state.name = ""
        _self.state.projectLead = ""
        _self.state.email = ""

    }
    
    /**
     * Creates the list of project. It will create the list 
     * and then update the list once.
     */
    getProjects = (_self) => {
        if(_self === undefined) {
            _self = this;
        }
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects", "GET").then((data) => {
            data.json().then(function(data) {
                var tmp = [];
                for(var i = 0; i < data.length; i++) {
                    tmp.push(_self.createListItem(data[i]["id"], data[i]["name"], _self));
                }
                _self.setState({listItems: tmp});
            });   
        }).catch((error) => {
            //TODO: Show an error banner? Make this in app.js?
            console.log("Error happened with getProjects() " + error);
        });
    }

    /**
     * Creates and sends the request to delete project. There are two
     * different requests so that when the last request is sent and returned
     * it will then update the projects view.
     */
    deleteProjects = (_self) => {
        _self = _self || this;
        var i;

        // get reid of dialg immediately: not sure is this should be done because the dialog disappears if it fails
        _self.setState({showDialog: false});
        for(i = 0; i < _self.state.checkedItems.length -1; i++) {
            NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.checkedItems[i], "DELETE").then(function(data) {
                console.log(data);              
            }).catch(function(error) {
                console.log(error); //TODO: show error?
            });
        }
        NetworkManager.fetch("/companies/" + _self.state.company_id + "/divisions/" + _self.state.division_id + "/projects/" + _self.state.checkedItems[i], "DELETE").then(function(data) {
            _self.setState({deleteItem: false, checkedItems: []});
            _self.getProjects(_self);
        }).catch(function(error) {
            console.log(error);//TODO: show error?
        });
    }

    addInfo = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    closeDialog = () => {
        this.setState({showDialog: false});
    }



    changeWindow = (value) => {
        this.state.changeWindowHandler(2);
    }

    handleChange = (value) => {
       //this.state.callback()
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    getPaperHeader() {
        if(isMobile) {
            return {width: '100%', margin: '0 auto'};
        } else {
            return {width: '50%', margin: '0 auto'};
        }
    }

    changeTab(event, value) {
        if(value === 0) {
            this.setState({redirect: <Redirect to="/overview/companies/"/>});
        } else if(value === 1) {
            this.setState({redirect: <Redirect to={"/overview/companies/" + this.state.company_id + "/divisions/"}/>});
        }
    }

    render () {        
        const AddDialog = (
            <div>
                
                <DialogTitle>
                    Add Company
                </DialogTitle>
                <DialogContent>
                    Add a company to your list. Enter in the fallowing information.
                    <TextField
                        name="name"
                        label="Project Name *"
                        value={this.state.name}
                        onChange={this.addInfo}
                        margin="normal"
                    />

                    <br></br>
                    <TextField
                        name="projectLead"
                        label="Project Lead"
                        value={this.state.projectLead}
                        onChange={this.addInfo}
                        style={{ marginRight: "20px" }}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.addInfo}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.addProject(this)}} color="primary" autoFocus style={{ marginLeft: "100%"}}>
                    Add
                    </Button>
                </DialogActions>
            </div>
        );
        
        const DeleteDialog = (
            <div>
                <DialogTitle>
                    Delete Project
                </DialogTitle>
                <DialogContent>
                    This will compleetly remove all slected projects. Do you wish to continue?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.setState({showDialog: false})}} color="primary" autoFocus>
                    No
                    </Button>
                    <Button onClick={() => this.deleteProjects(this)} color="primary" autoFocus>
                    Yes
                    </Button>
                </DialogActions>
            </div>
        );


        return  (
            <div>
                {this.state.redirect}
                <Tabs
                    value={2}
                    onChange={(event, value) => this.changeTab(event, value)}
                    centered
                    className="Overview-TabBar"
                    >
                    <Tab label="Companies" />
                    <Tab label="Divisions" />
                    <Tab label="Projects" />
                </Tabs>
                <br/>
                <Paper style={this.getPaperHeader()}>
                    <List component="nav">
                    {this.state.listItems}
                    </List>

                    <Button onClick={() => {this.setState({showDialog : true})}} variant="fab" color='primary' aria-label="add" style={{bottom: 20, right: 20, position: 'fixed'}}>
                        { this.state.deleteItem ? <DeleteIcon/>: <AddIcon/>}
                    </Button>

                    <Dialog open={this.state.showDialog} onClose={() => {this.setState({showDialog: false})}}>
                        { this.state.deleteItem ? DeleteDialog : AddDialog}
                    </Dialog>
                </Paper>
            </div>
        );
    }
}

export default ProjectsTab;