import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getProfiles} from '../../actions/profileActions';
import ProfileItem from "./ProfileItem";
import AddPerson from "../add-person/AddPerson";
import ProfileInterests from "./ProfileInterests";
import EditPerson from "../edit-person/EditPerson";

class Profiles extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           
           currentProfile: ""
        
        }
        
        
    }
    componentDidMount(){
        this.props.getProfiles();
        
    }
  
    render() {
        const {profile, loading} = this.props.profile;
        const {displayProfile,displayInfo,displayEdit, displayInterests} = this.state; 
        console.log(profile, "new profiles");
        let box; 
        let info;
        let profileItems;
        let ints; 

        

        if(displayEdit){
            box = (
                <EditPerson />
            )
        }else{

        
            if(displayInfo){
                info = (
                    <div className = "row">
                        <div className = "col">
                            <h4> {this.state.currentProfile.sex}</h4>
                            <h4> {this.state.currentProfile.age}</h4>
                            <h4> {this.state.currentProfile.city}, {this.state.currentProfile.state}</h4>
                        </div>
                    </div>
                )
            }
            if (profile === null || loading) {
                profileItems = "loading";
            }else{
                if(displayProfile){
                    box = (
                        <div>
                            <h1 className = " display-4 text-center">{this.state.currentProfile.name}</h1>
                            <div className = "btn btn-info" onClick ={() => {
                                this.setState(prevState => ({
                                    displayInfo: !prevState.displayInfo
                                }))}}>
                                
                                Basic Info
                                
                            </div>
                            <div className = "btn btn-info ml-2" onClick ={() => {
                                this.setState(prevState => ({
                                    displayEdit: !prevState.displayEdit
                                    
                                }))}}>
                                
                                Edit Person
                                
                            </div>
                            
                        

                            {info}
                            <div className = "ml-2 mt-2">
                                <ProfileInterests tree2 = {this.state.currentProfile.interests[0]}/>
                            </div>
                            {ints}
                        </div>
                        
                    )
                }else{

                    let newProfile = profile.people;
                    if(newProfile.length > 0){
                        //console.log(profile[0]);
                        profileItems = newProfile.map(profile => (
                            
                            <div className = "btn personButton btn-info" onClick ={() => {
                                this.setState(prevState => ({
                                    displayProfile: !prevState.displayProfile
                                    
                                }))
                                this.setState(prevState => ({
                                    currentProfile: profile
                                
                                }))
                                    
                                }}>
                                
                                {profile.name}
                                
                            </div>
                            /* <ProfileItem key = {profile._id} profile = {profile} /> */
                        ))
                        box = (
                            <div>
                                <h1 className = " display-4 text-center">My People</h1>
                                        
                                            
                                        

                                <div className = "profiles">
                                    
                                    <div className = "container">
                                        <div className = "row">
                                            <div className = "col-md-4">
                                                
                                                {profileItems}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    }else{
                        profileItems = <h4>no profiles found...</h4>
                    }
                }
            }
        }
        return (
            <div >
                

                        <div className = "listScroll" >
                            {box}
                            

                        </div>

                    
            </div>
        )
  }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfiles})(Profiles);