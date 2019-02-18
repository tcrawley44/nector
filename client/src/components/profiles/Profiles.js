import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getProfiles,getNetwork} from '../../actions/profileActions';
import ProfileItem from "./ProfileItem";
import AddPerson from "../add-person/AddPerson";
import ProfileInterests from "./ProfileInterests";
import EditPerson from "../edit-person/EditPerson";
import Friends from "./Friends";
import Queries from "./Queries";
import "./ItemStyles.css";
class Profiles extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           
           currentProfile: ""
        
        }
        this.props.getProfiles()
        
    }

    update(){
        this.setState(prevState => ({
            displayNetwork: !prevState.displayNetwork
        }))
    }

    componentDidMount(){
        this.props.getProfiles();
        this.props.getNetwork();
        
    }
  
    render() {
        let box; 
        if(this.props.profile.profile){

        
            if(this.props.profile.profile.people){
            const {profile, network, loading} = this.props.profile;
            console.log(profile, "profile");
            const {displayInfo,displayEdit, displayNetwork, displayMore, displayInterests } = this.state; 
            console.log(profile, "new profiles");
            if(profile.people){
                
                this.state.currentProfile = profile.people[this.props.match.params.id];
                
            }
            
            let info;
            let profileItems;
            let ints; 
            let more;
            let network2; 
            let displayProfile = true; 
            let isUsersAccount; 
            let displayEditButton; 
            let currentPerson;
            

            
            
            if(this.props.match.params.id >= this.props.profile.profile.people.length){
                currentPerson = this.props.location.state.passedPerson;
                this.state.currentProfile = currentPerson;
            }else{
                currentPerson = profile.people[this.props.match.params.id];
            }

            
                if(localStorage.user === this.props.match.params.id){
                    isUsersAccount = true; 
                    
                }else{
                    isUsersAccount = false; 
                }
                console.log(isUsersAccount);

                
                console.log(currentPerson, "currpurr");
                
                console.log(currentPerson.hasOwnProperty('isClaimed'), "has prop");
                if((currentPerson.hasOwnProperty('isClaimed'))&& (currentPerson.isClaimed === "true") ){
                    if(isUsersAccount){
                        displayEditButton = true; 
                        console.log("account match and is claimed");
                    }else{
                        displayEditButton = false; 
                        console.log("account not match and is claimed");
                    }
                }else{
                    displayEditButton = true; 
                    console.log("not claimed");
                }

                let stars; 
                if(currentPerson.hasOwnProperty('stars')){
                    stars = (
                        <p className = "text-light">Stars: {currentPerson.stars} </p>
                    )
                }else{
                    stars = (
                    <p className = "text-light">Stars: 0 </p>
                    )
                }
            
            let editButtonView; 
            if(displayEditButton){
                editButtonView = (
                    <div className = "btn btn-info ml-2" onClick ={() => {
                        this.setState(prevState => ({
                            displayEdit: !prevState.displayEdit
                            
                        }))}}>
                        
                        Edit Profile
                        
                    </div>
                )
            }

            if(displayMore){
                more = (<div className = " mt-2">
                    <ProfileInterests tree2 = {this.state.currentProfile.interests[0]}/>
                </div>)
                
            }
            if(isUsersAccount){
                console.log(network, "network")
                network2 = (
                    /* <div className = "mt-2 ml-2">
                        <Friends current = {this.state.currentProfile.name}/>

                        <Queries current = {this.state.currentProfile.name}/>
                    </div>  */
                    
                    <ProfileInterests updateParent = {this.update} tree2 = {network}/>           
                                    
                )
                
            }
            
            
            
                if(displayEdit){
                    box = (
                        <div>
                            <div className = "btn btn-info w-25" onClick ={() => {
                                this.setState(prevState => ({
                                    displayEdit: !prevState.displayEdit
                                }))}}>
                                
                                Back
                                
                            </div>
                            <EditPerson currName = {this.state.currentProfile.name}/>
                        </div>
                    )
                }else{

                
                    if(displayInfo){
                        info = (
                            <div className = "row">
                                <div className = "col text-light">
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
                                    <h1 className = " display-5 text-center text-light">{this.state.currentProfile.name}</h1>
                                    {stars}
                                    <div className = "btn btn-info  " onClick ={() => {
                                        this.setState(prevState => ({
                                            displayInfo: !prevState.displayInfo
                                        }))}}>
                                        
                                        Basic Info
                                        
                                    </div>
                                    {editButtonView}
                                    
                                

                                    {info}
                                    <div >
                                    
                                        <div className = "btn btn-info mt-2 w-25" onClick ={() => {
                                            this.setState(prevState => ({
                                                displayMore: !prevState.displayMore
                                                
                                            }))}}>
                                            
                                            More
                                            
                                        </div>
                                        {more}
                                    </div>
                                    <div className = "mt-2">
                                    {network2}    
                                    </div>
                                    
                                    
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
                                        <h1 className = " display-4 text-center">List People</h1>
                                                
                                                    
                                                

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
            }else{
                box = (
                    <h1>loading...</h1>
                )
            }
        }else{
            box = (
                <h1>loading...</h1>
            )
        }


        return (
            <div >
                

                        <div className = "listScroll row" >
                            <div className = "col mt-10">
                                {box}
                            </div>

                        </div>

                    
            </div>
        )
    }

}
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    network: PropTypes.object,
    auth: PropTypes.object

}

const mapStateToProps = state => ({
    profile: state.profile,
    network: state.network,
    auth: state.auth
})
export default connect(mapStateToProps, {getProfiles, getNetwork})(Profiles);