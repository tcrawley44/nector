import React, { Component } from 'react'
import "./HomeStyles.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddPerson from "../add-person/AddPerson";
import Profiles from "../profiles/Profiles";
import EditPerson from "../edit-person/EditPerson";
import SearchPeople from "../search-people/SearchPeople"
class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           
           
        
        }
        
        
    }
    
  
    render() {
        const {displayEditPerson, displayProfiles, displaySearch} = this.state; 
        
        let box; 

        if(displayEditPerson){
            box = (
                <div>
                    
                    <button className = "btn btn-dark listButton bn-info" onClick ={() => {
                        this.setState(prevState => ({
                            displayEditPerson: !prevState.displayEditPerson
                        }))}}>
                        
                        Back
                    </button>
                    <AddPerson />
                </div>
            )
        }
        
        if(displayProfiles){
            box = (
                <div>
                    
                    <button className = "btn btn-dark listButton bn-info" onClick ={() => {
                        this.setState(prevState => ({
                            displayProfiles: !prevState.displayProfiles
                        }))}}>
                        
                        Back
                    </button>
                    <Profiles />
                </div>
            )
        }

        if(displaySearch){
            box = (
                <div>
                    
                    <button className = "btn btn-dark listButton bn-info" onClick ={() => {
                        this.setState(prevState => ({
                            displaySearch: !prevState.displaySearch
                        }))}}>
                        
                        Back
                    </button>
                    <SearchPeople />
                </div>
            )
        }

        if(!displayEditPerson && !displayProfiles && !displaySearch){
            box = (
                <div >
                    <h1 className = " display-4 text-center">Nector</h1>
                                        
                    
                        <div className = "row butts align-items-center">
                        
                            <div className = "col-4"> </div>                
                            <div className = "col-4 align-items-center">
                                
                                <button className = "btn btn-dark listButton bn-info" onClick ={() => {
                                    this.setState(prevState => ({
                                        displayEditPerson: !prevState.displayEditPerson
                                    }))}}>
                                    
                                    Add Person
                                </button>
                                <button className = "btn btn-dark listButton bn-info" onClick ={() => {
                                    this.setState(prevState => ({
                                        displayProfiles: !prevState.displayProfiles
                                    }))}}>
                                    
                                    List People
                                </button>
                                <button className = "btn btn-dark listButton bn-info" onClick ={() => {
                                    this.setState(prevState => ({
                                        displaySearch: !prevState.displaySearch
                                    }))}}>
                                    
                                    Search People
                                </button>
                                
                            </div>
                        </div>   
                    
                </div> 
            )               
        }

        return (
            <div className = "hold bg-dark">
                <div className = "row">
                    <div className = "col-4">
                        {/* <div className = "addPerson" >
                            <Dashboard />
                        </div> */}
                    
                    </div> 

                    <div className = "col-4 ">
                        
                        <div className = "profileContainer container">
                            {box}
                            
                            
                                

                            

                        </div>

                    </div>

                    
                </div>
            </div>
        )
  }
}


export default Home; 