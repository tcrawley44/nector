import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {createProfile, getCurrentProfile} from "../../actions/profileActions";
import isEmpty from '../../validation/is-empty';
class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            handle: "",
            company: "",
            location: "",
            status: "",
            website: "",
            skills: "",
            bio: "",
            errors: {}
            
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentDidMount(){
        console.log("test3");
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        
        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            ///bring skills array back to csv
            const skillsCSV = profile.skills.join(",");

            //if profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.handle = !isEmpty(profile.company) ? profile.company : '';
            //set component fields state
            
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status, 
                skills: skillsCSV,
                bio: profile.bio
            })
        }
    }
    onSubmit(e){
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status, 
            skills: this.state.skills,
            bio: this.state.bio
        }

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectChange(e) {
        this.setState({status: e.target.value});
        
    }

    render() {
        const {errors, displaySocialInputs} = this.state; 
        

        let socialInputs; 
        
        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <TextFieldGroup
                        placeholder = "derp"
                        name = "derp"
                        value = "derp"
                        onChange = {this.onChange}
                        errors = {errors.handle}
                    />
                </div>    
            )
            
            
        }

        //select options for status
        const options = [
            {label: 'turdburgler', value: "turdwrangler"},
            {
                label: '*select professional status',
                value: "*select professional status"
            },
            
            {label: 'tard', value: "tard"}
        ];

        return (
            <div className = "create-profile">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-md-8 m-auto">
                            <h1 className = "display-4 text-center">Edit profile</h1>
                            
                            <small className = "d-block pb-3">* = required fields</small>

                            <form onSubmit = {this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder = "* Profile Handle"
                                    name = "handle"
                                    value = {this.state.handle}
                                    onChange = {this.onChange}
                                    error = {errors.handle}
                                    info = "unique handle"
                                />
                                <SelectListGroup 
                                    placeholder = "Status"
                                    name = "Status"
                                    value = {this.state.status}
                                    onChange = {this.onSelectChange}
                                    options = {options}
                                    error = {errors.status}
                                    info = "unique status"
                                />
                                <TextFieldGroup 
                                    placeholder = "Company"
                                    name = "company"
                                    value = {this.state.company}
                                    onChange = {this.onChange}
                                    error = {errors.company}
                                    info = "company"
                                />
                                <TextFieldGroup 
                                    placeholder = "website"
                                    name = "website"
                                    value = {this.state.website}
                                    onChange = {this.onChange}
                                    error = {errors.website}
                                    info = "website"
                                />
                                <TextFieldGroup 
                                    placeholder = "location"
                                    name = "location"
                                    value = {this.state.location}
                                    onChange = {this.onChange}
                                    error = {errors.location}
                                    info = "location"
                                />
                                <TextFieldGroup 
                                    placeholder = "skills"
                                    name = "skills"
                                    value = {this.state.skills}
                                    onChange = {this.onChange}
                                    error = {errors.skills}
                                    info = "skills"
                                />
                                <TextAreaFieldGroup 
                                    placeholder = "bio"
                                    name = "bio"
                                    value = {this.state.bio}
                                    onChange = {this.onChange}
                                    error = {errors.bio}
                                    info = "bio"
                                />

                                <div className = "mb-3">
                                    <button type = "button" onClick ={() => {
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }}


                                        className = "btn btn-dark">
                                        Extra stuff
                                    </button>
                                </div>
                                {socialInputs}
                                <input type = "submit" value= "Submit" className = "btn btn-info btn-block mt-4"/>
                            </form>   
                        
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));