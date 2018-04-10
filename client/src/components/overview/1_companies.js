import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Checkbox from 'material-ui/Checkbox';
import NetworkManager from '../NetworkManager';
import Dialog, {DialogTitle} from 'material-ui/Dialog';

class CompaniesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [], 
            callback: props.callback,
            showAddDialog: false
        }
        this.getCompanies(this);
    }

    handleChange = (value) => {
        //this.state.callback();
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    createListItem = (id, name) => {
        console.log("Creating list item...");
        return (<ListItem button value={id}>
                    <ListItemText inset primary={name} />
                    <Checkbox
                        onChange={this.handleChange('checked1')}
                        value="checked1"
                    />
                </ListItem>);
    }

    addCompany = (value) => {
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
        var thisRef = this;
        NetworkManager.post("/companies", "POST", tmpData).then((data) => {
            thisRef.setState({showAddDialog: false});
            thisRef.getCompanies(thisRef);
            console.log("Success");
        }).catch((error) => { 
            //Show some banner? Like a snack bar?
            console.log("Error happened with addCompany(); " + error);
        });

    }

    getCompanies = (reference) => {
        if(reference === undefined) {
            reference = this;
        }
        
        console.log("Getting Companies");
        NetworkManager.fetch("/companies", "GET").then((data) => {
            data.json().then(function(data) {
                var i;
                var tmp = [];
                for(i = 0; i < data.length; i++) {
                    tmp.push(reference.createListItem(data[i]["id"], data[i]["name"]))  
                }
                reference.setState({listItems: tmp});
            });   
        }).catch((error) => {
            //Show an error banner? Make this in app.js?
            console.log("Error happened with getCompanies() " + error);
        });
    }

    render () {
        const { value } = this.state;

        return  (
            <div>
            <Paper style={{width: '50%', margin: '0 auto'}}>
                <List component="nav">
                <ListItem button>
                    <ListItemText inset primary="Item 1" />
                    <Checkbox
                        checked={this.state.checked1}
                        onChange={this.handleChange('checked1')}
                        value="checked1"
                    />
                </ListItem>
                <ListItem button>
                    <ListItemText inset primary="Item 2" />
                    <Checkbox
                        checked={this.state.checked2}
                        onChange={this.handleChange('checked2')}
                        value="checked2"
                    />
                </ListItem>
                {this.state.listItems}
                </List>
                <Button onClick={(value) => {this.setState({showAddDialog : true})}} variant="fab" color='primary' aria-label="add" style={{bottom: 20, right: 20, position: 'fixed'}}>
                    <AddIcon/>
                </Button>
                <Dialog open={this.state.showAddDialog}><Button onClick={this.addCompany}>Add Test Data</Button> </Dialog>
            </Paper>
            </div>
        );
    }
}

export default CompaniesTab;