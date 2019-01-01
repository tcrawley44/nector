import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExperience} from '../../actions/profileActions';


 class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            errors: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit(e){
        e.preventDefault();
        
        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location
        }
       
        this.props.addExperience(expData, this.props.history);
        
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const {errors} = this.state;
        

        return (
            <div className = "add-experience">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-md-8 m-auto">
                            <Link to= "/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder = "*company"
                                name = "company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                            />
                            <TextFieldGroup
                                placeholder = "*title"
                                name = "title"
                                value={this.state.title}
                                onChange={this.onChange}
                                error={errors.title}
                            />
                            <TextFieldGroup
                                placeholder = "*location"
                                name = "location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                            />
                            <input type="submit" value="Submit" className ="btn btn-info btn-block mt-4"></input>
                        </form>
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}

const mapStateToProps = state => (
    {
       profile: state.profile,
       errors: state.errors 
    }
)

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience)); 