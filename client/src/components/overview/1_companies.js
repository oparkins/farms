import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Checkbox from 'material-ui/Checkbox';
import NetworkManager from '../NetworkManager';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
  } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {isMobile} from 'react-device-detect';

class CompaniesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [], 
            callback: props.callback,
            showDialog: false, //Shows the dialog box
            deleteItem: false, //Decide if we are deleting or adding companies
            checkedItems: [], //Holds the id numbers of the checked items
            match: props.match,
            name: "",
            addressLine1: "",
            addressLine2: "",
            addressCity: "",
            addressState: "",
            addressZip: "",
            logo: "",
            phone: "",
            email: ""
        };
        this.getCompanies(this); //Populate the list with companies
    }
    
    /**
     * Handles the change for the checkbox. It will first figure out if the
     * item is in the list or not. If it is, then remove the item from the
     * list. If it is not, add the item to the list. Then, passed on the
     * size of the list, change the add button to the delete button. This
     * logic is to allow users to unselect items if they wish.
     */
    checkboxHandler = (value) => {
        console.log("Handling Check Change...");
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
     * of the company. It will create the list item and return it.
     * The ID number is used as the value that is passed to the
     * checkboxHandler method.
     */
    createListItem = (id, name, self) => {
        var _self = self || this;
        console.log("Creating list item...");
        return (<Link key={name+id+"Link"} to={this.state.match.url + id + "/divisions/"}><ListItem button value={id} key={name + id}>
                    <ListItemText inset primary={name} />
                    <Checkbox
                        key={name + id + "checkbox"}
                        onChange={(event, checked) => {_self.checkboxHandler({id})}}
                        value='checked1'
                    />
                </ListItem></Link>);
    }


    /**
     * Creates and sends the request to add a company to the server.
     * After the request has been returned, it will update the state
     * of the component.
     */
    addCompany = (_self) => {
        var tmpData = {
            name: _self.state.name,
            addressLine1: _self.state.addressLine1,
            addressLine2: _self.state.addressLine2,
            addressCity: _self.state.addressCity,
            addressState: _self.state.addressState,
            addressZip: _self.state.addressZip,
            logo: _self.state.logo,
            phone: _self.state.phone,
            email: _self.state.email
        }
        //TODO: Change the below template to use input values from dialog box
        NetworkManager.post("/companies", "POST", tmpData).then((data) => {
            _self.setState({showDialog: false});
            _self.getCompanies(_self);
        }).catch((error) => { 
            //TODO: Show some banner? Like a snack bar? https://material-ui-next.com/demos/snackbars/
            console.log("Error happened with addCompany(); " + error);
        });

        // TODO: find a better way to reset everything, maybe an array of elements?
        // set everything back to zero
        _self.state.name = ""
        _self.state.addressLine1 = ""
        _self.state.addressLine2 = ""
        _self.state.addressCity = ""
        _self.state.addressState = ""
        _self.state.addressZip = ""
        _self.state.logo = ""
        _self.state.phone = ""
        _self.state.emai = ""


    }

    /**
     * Creates the list of companies. It will create the list 
     * and then update the list once.
     */
    getCompanies = (_self) => {
        if(_self === undefined) {
            _self = this;
        }
        NetworkManager.fetch("/companies", "GET").then((data) => {
            data.json().then(function(data) {
                var tmp = [];
                for(var i = 0; i < data.length; i++) {
                    tmp.push(_self.createListItem(data[i]["id"], data[i]["name"], _self));
                }
                _self.setState({listItems: tmp});
            });   
        }).catch((error) => {
            //TODO: Show an error banner? Make this in app.js?
            console.log("Error happened with getCompanies() " + error);
        });
    }

    /**
     * Creates and sends the request to delete companies. There are two
     * different requests so that when the last request is sent and returned
     * it will then update the companies view.
     */
    deleteCompanies = (_self) => {
        _self = _self || this;
        var i;

        // get reid of dialg immediately: not sure is this should be done because the dialog disappears if it fails
        _self.setState({showDialog: false});
        for(i = 0; i < _self.state.checkedItems.length -1; i++) {
            NetworkManager.fetch("/companies/" + _self.state.checkedItems[i], "DELETE").then(function(data) {
                console.log(data);              
            }).catch(function(error) {
                console.log(error); //TODO: show error?
            });
        }
        NetworkManager.fetch("/companies/" + _self.state.checkedItems[i], "DELETE").then(function(data) {
            _self.setState({deleteItem: false, checkedItems: []});
            _self.getCompanies(_self);
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

    getPaperHeader() {
        if(isMobile) {
            return {width: '100%', margin: '0 auto'};
        } else {
            return {width: '50%', margin: '0 auto'};
        }
    }

    /**
     * Renders the view based on the state of the component.
     */
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
                        label="Company Name *"
                        value={this.state.name}
                        onChange={this.addInfo}
                        margin="normal"
                    />

                    <br></br>
                    <TextField
                        name="addressLine1"
                        label="Primary Address"
                        value={this.state.addressLine1}
                        onChange={this.addInfo}
                        style={{ marginRight: "20px" }}
                    />
                    <TextField
                        name="addressLine2"
                        label="Secondary Address"
                        value={this.state.addressLine2}
                        onChange={this.addInfo}
                        margin="normal"
                    />

                    <br></br>
                    <TextField
                        name="addressCity"
                        label="City"
                        value={this.state.addressCity}
                        onChange={this.addInfo}
                        margin="normal"
                        style={{ marginRight: "20px" }}
                    />
                    <TextField
                        name="addressState"
                        label="State"
                        value={this.state.addressState}
                        onChange={this.addInfo}
                        margin="normal"
                    />
                    <TextField
                        name="addressZip"
                        label="Zip"
                        value={this.state.addressZip}
                        onChange={this.addInfo}
                        margin="normal"
                    />

                    <br></br>
                    <TextField
                        name="phone"
                        label="Phone"
                        margin="normal"
                        value={this.state.phone}
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

                    <br></br>
                    <TextField
                        name="logo"
                        label="Logo Path"
                        value={this.state.logo}
                        onChange={this.addInfo}
                        margin="normal"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.addCompany(this)}} color="primary" autoFocus style={{ marginLeft: "100%"}}>
                    Add
                    </Button>
                </DialogActions>
            </div>
        );
        
        const DeleteDialog = (
            <div>
                <DialogTitle>
                    Delete Company
                </DialogTitle>
                <DialogContent>
                    This will compleetly remove all slected companies. Do you wish to continue?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.setState({showDialog: false})}} color="primary" autoFocus>
                    No
                    </Button>
                    <Button onClick={() => this.deleteCompanies(this)} color="primary" autoFocus>
                    Yes
                    </Button>
                </DialogActions>
            </div>
        );

        

        return  (
            <div>
            <Tabs
                value={0}
                onChange={this.handleChange}
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

export default CompaniesTab;