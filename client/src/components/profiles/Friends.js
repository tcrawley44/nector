import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import "../add-person/AddPersonStyles.css";
import "./ItemStyles.css";
import {addFriendGroup,getFriendGroups} from "../../actions/profileActions";
import GroupItem from "./GroupItem";
class Friends extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
           
           friendGroupName: "",
           userName: this.props.current
        
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.props.test();
        const data = {
            userName: this.state.userName
        }
        this.props.getFriendGroups(data);
        
    }
    
    componentDidMount(){
        
       
        
        
    }
    
       
    onSubmit(e){
        e.preventDefault();

        const data = {
            friendGroupName: this.state.friendGroupName  ,
            userName: this.props.current 
        }
        
            
        //console.log(data.name, this.state.parentName );
        
        this.props.addFriendGroup(data);
    }

    

    onChange(e) {
        
            this.setState({[e.target.name]: e.target.value});
        
    }

    
    
   

    render() {
        const {groups} = this.props.profile;
        const { displayGroups, displayFriends} = this.state; 
        //console.log(groups[0]);
        let groups2; 
        let friends; 
        console.log(groups);
        if(displayGroups && (groups !== "")){

            let groupItems = groups.map(groupItem => (
                <div>           
                    
                    
                    <GroupItem item = {groupItem}  />
                </div>   
                /* <ProfileItem key = {profile._id} profile = {profile} /> */
            ))
            groups2 = (
                <div>
                    <div className = "ml-4">

                        {groupItems}
                    </div>
                    
                    <form  className ="newChild mt-1 ml-4" onSubmit = {this.onSubmit}>
                        <div className = "row derp"> 
                            <input
                    
                                className = "form-control squish2 form-control-lg" 
                                placeholder="new group"
                                name="friendGroupName"
                                value = {this.state.friendGroupName}
                                onChange = {this.onChange}
                                autoComplete = "off"
                            />             
                                      
                                
                               
                            <input type = "submit" value= "+" className = "btn btn-info butt"/>
                        </div>
                    </form> 
                </div>
            )
        }
        return(
            <div>
                <div className = "btn btn-info ml-2" onClick ={() => {
                    this.setState(prevState => ({
                        displayGroups: !prevState.displayGroups
                        
                    }))}}>
                    
                    Friends
                
                </div>   
                {groups2}                     
            </div>
        )
        
    }
}

Friends.propTypes = {
    groups: PropTypes.object,
    profile: PropTypes.object
}

const mapStateToProps = state => ({
    
    interests: state.interests,
    groups: state.groups,
    profile: state.profile
})


export default connect(mapStateToProps, {addFriendGroup, getFriendGroups})(withRouter(Friends));