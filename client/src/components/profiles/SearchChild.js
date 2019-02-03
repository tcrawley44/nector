import React, { Component } from 'react'
import TextFieldGroup from "../common/TextFieldGroup";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

class SearchChild extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
           name: "",
           id: ""
        
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        
    }

    onSubmit(e){

        const data = {
            name: this.state.name
        }
        let peeps = this.props.profile.profile.people;
        console.log(data.name);
        let i = 0; 
        let found = false; 
        while( i < peeps.length && !found){
            if(peeps[i].name === data.name){
                this.state.id = peeps[i].id
                found = true; 
            }
            i = i + 1; 
        }
        console.log(this.state.id);
        this.props.history.push("/profile/" + this.state.id);

    }

    onChange(e) {
        
        this.setState({[e.target.name]: e.target.value});
    
    }

    render() {
        return (
            <div>
                <div className ="ml-3 w-50">       
                    <TextFieldGroup 
                        placeholder = "name"
                        name = "name"
                        value = {this.state.name}
                        onChange = {this.onChange}
                        
                        info = "name"
                        autoComplete = "off"        
                                
                    />  
                      
                </div>   
                <div className = "btn btn-info ml-3 mb-2" onClick ={() => {
                    this.onSubmit();
                }}>
                Submit
                </div>
            </div>
                
            
        )
    }
}

SearchChild.propTypes = {
    
    interests: PropTypes.object,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object,
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    
    interests: state.interests,
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps)(withRouter(SearchChild)); 