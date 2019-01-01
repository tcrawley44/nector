import React, { Component } from 'react'
import isEmpty from "../../validation/is-empty";
class ProfileHeader extends Component {
  render() {

    const {profile} = this.props; 
    //console.log(profile);
    console.log(profile[0].user.name);
    console.log('derp');
    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            
            <div className="text-center">
              <h1 className="display-4 text-center">{profile[0].user.name}</h1>
              <p className="lead text-center">{profile[0].status}  {isEmpty(profile[0].company) ? null 
                : (<span>at {profile[0].company}</span>)} </p>
              {isEmpty(profile[0].company) ? null 
                : (<p> {profile[0].company}</p>)}
               
            </div> 
          </div>
        </div> 
      </div> 
    )
  }
} 


export default ProfileHeader;