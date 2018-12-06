import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import {Link} from 'react-router-dom';
import ProfileActions from './ProfileActions'; 
import Experience from './Experience';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const {user} =this.props.auth;
        const {profile,loading} = this.props.profile; 

        let dashboardContent; 

        if(profile === null || loading) {
            dashboardContent = <h4>Loading...</h4>
        } else {
            //check if logged in user has profile data
            if(Object.keys(profile).length > 0){
                dashboardContent = (
                    <div>
                        <p className = "lead text-muted">Welcome <Link to ={` /profiles/${profile.handle}`}>
                        {user.name}</Link> </p>
                        <ProfileActions />
                        <Experience experience={profile.experience}/>
                        
                    </div>
                )
            }else {
                //user is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className = "lead text-muted">welcome {user.name}</p>
                        <p> you have not setup a profile, please add here</p>
                        <Link to = "/create-profile" className = "btn btn-lg btn-info">
                            create profile
                        </Link>
                    </div>
                )
            }
        }

        return (
        <div className = "dashboard">
            <div className = "container">
                <div className = "row">
                    <div clasname = "col-md-12">
                        <h1 className = "display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);