import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class ProfileQueries extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           
           currentProfile: ""
        
        }
        
        
    }

   

    render() {

        const {displayChildren} = this.state;
        let display; 

        if(displayChildren){
            let profileItems = this.props.profile.profile.people[this.props.auth.id].queries[0].results.map(profile => (
                                
                <div className = "btn  btn-info mt-2 " >
                   
                        
                
                    
                    {profile}
                    
                </div>
                
            ))
            display = (
                <div>
                    {profileItems}
                </div>
            )
        }
        console.log(this.props.profile.profile.people[0].queries);
        return (
            <div>
                <div className = "btn btn-info" onClick ={() => {
                    this.setState(prevState => ({
                    displayChildren: !prevState.displayChildren
                    }))}}> {this.props.profile.profile.people[this.props.auth.id].queries[0].name}</div>
                    <div className = "  mb-2 ml-3">
                    {display}</div>
            </div>
        )
    }
}




ProfileQueries.propTypes = {
    
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps)(ProfileQueries);