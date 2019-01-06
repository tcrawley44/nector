import React, { Component } from 'react'
import SearchPeople from "../search-people/SearchPeople";

class Queries extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
           currentProfile: ""
        
        }
        
        
    }
    render() {
        const {displayGroups, displaySearch} = this.state; 
        let display; 
        let display2; 
        if(displaySearch){
            display2 = (
                <SearchPeople />
            )
        
        }else{
            if(displayGroups){
                display = (
                    <div>
                        <div className = "btn btn-info mt-2 ml-4" onClick ={() => {
                            this.setState(prevState => ({
                                displaySearch: !prevState.displaySearch
                                
                            }))}}>
                            
                            New Query
                        
                        </div>  
                        
                    </div>
                )
            }

            if(!displaySearch){
                display2 = (
                    <div>
    
                    
                        <div className = "btn btn-info mt-2 ml-2" onClick ={() => {
                            this.setState(prevState => ({
                                displayGroups: !prevState.displayGroups
                                
                            }))}}>
                            
                            Queries
                        
                        </div>   
                        {display}
                    </div>
                )
            }
            
        }
        
        return (
            <div>
                    
                {display2}               
                    
            </div>
        )
    }
}

export default Queries; 