import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {deleteQuery} from "../../actions/profileActions";
import {withRouter, Link} from "react-router-dom";
//this class defines each query and its children in the profile drop down 

class ProfileQueries extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           
           currentProfile: "",
           update: ""
        }
        
        
    }

    deleteQuery(profileData) {
        this.props.deleteQuery(profileData);
        this.props.updateParent(); 
        console.log("yes");
    }

    render() {

        const {displayChildren} = this.state;
        let display; 

        if(displayChildren){

            //method to go assign id values to the name values
            let nameIdArray = [];
            let i = 0; 
            let nameArray = this.props.current1.results;
            let peopleArray = this.props.profile.profile.people;
            
            while(i<nameArray.length){
                let id;
                let i2 = 0;  
                let found = false; 
                while(i2 < peopleArray.length && !found){
                    
                    if(peopleArray[i2].name === nameArray[i]){
                        
                        id = peopleArray[i2].id;
                        found = true; 
                    }
                    i2 = i2 + 1; 
                }
                nameIdArray[i] = {name:nameArray[i], id: id}
                i = i + 1; 
            }
            
            let profileItems = nameIdArray.map(profile => (
                <div>   
                    

                    <Link to={"/profile/" + profile.id}  className = "btn  btn-info mb-2 " onClick ={() => {
                        this.props.updateParent()}} >
                        {profile.name}
                    </Link>
                    
                            
                    
                        
                        
                        
                    
                    
                </div>   
            ))
            
            display = (
                <div>
                    {profileItems}
                </div>
            )
        }
        //console.log(this.props.profile.profile.people[0].queries);
        return (
            <div className = "container" >
                <div className = "ml-2 row">
                    
                    <div className = "btn btn-info mb-2" onClick ={() => {
                        this.setState(prevState => ({
                        displayChildren: !prevState.displayChildren
                        }))}}> {this.props.current1.name}
                        
                    </div>
                    <div className = "btn btn-info mb-2 x" onClick ={() => {
                        
                        const profileData = {
                            query: this.props.current1.name,
                            
                           
                            id: this.props.auth.id
                            
                        }
                        this.deleteQuery(profileData);
                        }}>
                    
                        x
                    </div>
                    <div className = "   ml-3">
                        {display}
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}




ProfileQueries.propTypes = {
    deleteQuery: PropTypes.func,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {deleteQuery})(ProfileQueries);