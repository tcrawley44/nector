import React, { Component } from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import "./ItemStyles.css";

class ProfileItem extends Component {
  render() {

    const {profile} = this.props;

    return (
      <div>
        <div className = "row">
          <div >
            
          </div>
          <div >
          
            <h3 className = "dark"><Link to = {`/profile/${profile.handle}`} className = "btn btn-info">{profile.name}</Link></h3>
            
            {/* <Link to = {`/profile/${profile.handle}`} className = "btn btn-info">view profile</Link> */}
          </div>
          
        </div>
        
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;
