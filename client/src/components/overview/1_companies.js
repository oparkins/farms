import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Checkbox from 'material-ui/Checkbox';
import NetworkManager from '../NetworkManager';
import Dialog, {DialogTitle} from 'material-ui/Dialog';

class CompaniesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [], 
            callback: props.callback,
            showDialog: false, //Shows the dialog box
            deleteItem: false, //Decide if we are deleting or adding companies
            checkedItems: [] //Holds the id numbers of the checked items
        }
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
        return (<ListItem button value={id} key={name + id}>
                    <ListItemText inset primary={name} />
                    <Checkbox
                        key={name + id + "checkbox"}
                        onChange={(event, checked) => {_self.checkboxHandler({id})}}
                        value='checked1'
                    />
                </ListItem>);
    }


    /**
     * Creates and sends the request to add a company to the server.
     * After the request has been returned, it will update the state
     * of the component.
     */
    addCompany = (_self) => {
        //TODO: Change the below template to use input values from dialog box
        var tmpData = { 
            name: "Sandia National Laboratories",
            addressLine1: "The",
            addressLine2: "Data",
            addressCity: "Never",
            addressState: "Lies",
            addressZip: "Am",
            logo: "I",
            phone: "Right",
            email: "contactus@sandia.gov"
        };
        NetworkManager.fetchWithParameters("/companies", "POST", tmpData).then((data) => {
            _self.setState({showDialog: false});
            _self.getCompanies(_self);
        }).catch((error) => { 
            //TODO: Show some banner? Like a snack bar? https://material-ui-next.com/demos/snackbars/
            console.log("Error happened with addCompany(); " + error);
        });

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
        for(i = 0; i < _self.state.checkedItems.length -1; i++) {
            NetworkManager.fetch("/companies/" + _self.state.checkedItems[i], "DELETE").then(function(data) {
                console.log(data);              
            }).catch(function(error) {
                console.log(error); //TODO: show error?
            });
        }
        NetworkManager.fetch("/companies/" + _self.state.checkedItems[i], "DELETE").then(function(data) {
            _self.setState({showDialog: false, deleteItem: false, checkedItems: []});
            _self.getCompanies(_self);
        }).catch(function(error) {
            console.log(error);//TODO: show error?
        });
    }

    /**
     * Handles the floating action button click. Depending
     * on if we are deleting or adding, it will act accordingly.
     */
    buttonHandler = () => {
        this.setState({showDialog : true});
        if(this.state.deleteItem) {
            this.deleteCompanies(this);
        } else {
            this.addCompany(this);
        }
    }

    /**
     * Renders the view based on the state of the component.
     */
    render () {
        const { value } = this.state;

        return  (
            <div>
            <Paper style={{width: '50%', margin: '0 auto'}}>
                <List component="nav">
                {this.state.listItems}
                </List>
                <Button onClick={(value) => {this.setState({showDialog : true})}} variant="fab" color='primary' aria-label="add" style={{bottom: 20, right: 20, position: 'fixed'}}>
                    { this.state.deleteItem ? <DeleteIcon/> : <AddIcon/>}
                </Button>
                <Dialog open={this.state.showDialog}>
                    <Button onClick={this.buttonHandler}>
                        Add Test Data (TODO: Make this a real form for users)
                    </Button> 
                </Dialog>
            </Paper>
            </div>
        );
    }
}

export default CompaniesTab;