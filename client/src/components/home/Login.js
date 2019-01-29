import React, { Component } from 'react'
import TextFieldGroup from "../common/TextFieldGroup";
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Profiles from "../profiles/Profiles";
import {registerUser, newLoginUser} from "../../actions/authActions";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            email: "",
            password: "",
            password2: ""
        }
        
        //this.props.addNode("Books", "Conceptual");
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(){
        
    }
    onSubmit(e){
        e.preventDefault();

        
        //console.log(this.props.interests, "interests here");
        const profileData = {
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(this.state.password2.length);
        if(this.state.password2.length > 0){
            this.props.registerUser(profileData);
            this.props.history.push('/welcome');
        }else{
            this.props.newLoginUser(profileData);
            
            
        }
        
        //this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        
        this.setState({[e.target.name]: e.target.value});
    
    }

  render() {
      const {displaySignUp, displayEmailErrors} = this.state;
      let display; 
      let emailErrors;
      let emailErrorMessage; 
      let emailInput; 

      if(displayEmailErrors){
        emailErrors = (
            <p className = "mb-0 ml-4"> email not found</p>
        );
        emailInput = (
            <input 
                autoComplete = "new-password"
                type ="email"
                className="form-control form-control-lg mb-0 " 
                placeholder="email"
                name="email"
                value = {this.state.email} 
                onChange = {this.onChange}
                            


            /> 
        )
      }else{
          emailInput =(
            <input 
                autoComplete = "new-password"
                type ="email"
                className="form-control form-control-lg mb-3 " 
                placeholder="email"
                name="email"
                value = {this.state.email} 
                onChange = {this.onChange}
                        


            /> 
          )
      }
      
      console.log(this.props.auth.id);
      if(this.props.auth.id != ""){
        this.props.history.push('/profile/' + this.props.auth.id);
      }
      if(displaySignUp){
          display = (
            <div className = " row align-self-center mt-5 ">

                <div className = "col-md-8  m-auto">
                    <form  onSubmit = {this.onSubmit}>
                    
                        <TextFieldGroup 
                            placeholder = "email"
                            name = "email"
                            value = {this.state.email}
                            onChange = {this.onChange}
                            
                            info = "email"
                            autoComplete = "off"
                            
                        />
                        
                        <input 

                            autoComplete = "new-password"
                            type ="password"
                            className="form-control form-control-lg" 
                            placeholder="password"
                            name="password"
                            value = {this.state.password} 
                            onChange = {this.onChange}
                        
                            
                        />  

                        <input 

                            autoComplete = "new-password"
                            type ="password"
                            className="form-control form-control-lg mt-2" 
                            placeholder="confirm password"
                            name="password2"
                            value = {this.state.password2} 
                            onChange = {this.onChange}


                        />  
                        
                        
                        
                        

                    
                        <input type = "submit" value= "Create account" className = "btn btn-info btn-block mt-4"/>
                    </form> 
                    
                </div>
            </div>  
          )
      }else{
          display = (
            <div className = " row align-self-center mt-3 ">

                <div className = "col-md-8  m-auto">
                    <form  onSubmit = {this.onSubmit}>
                    
                        
                        {emailInput} 

                        {emailErrors}

                        <input 

                            autoComplete = "new-password"
                            type ="password"
                            className="form-control form-control-lg " 
                            placeholder="password"
                            name="password"
                            value = {this.state.password} 
                            onChange = {this.onChange}
                        
                            
                        />  
                        
                        
                        
                        

                    
                        <input type = "submit" value= "Login" className = "btn btn-info btn-block mt-4"/>
                    </form> 
                    <div className = "btn btn-info btn-block mt-4" onClick ={() => {
                            this.setState(prevState => ({
                                displaySignUp: !prevState.displaySignUp
                            }))}}>Sign Up
                    </div>  
                </div>
            </div>
          )
      }
    return (
        
                    
                    <div className = "container">
                        <div className = "row mt-3">
                            
                            <div className = "col-6  m-auto  ">
                                <h1 className = "text-light ">Nector</h1>
                            </div>
                            
                        </div>
                        

                            
                        {display}

                        

                    </div>

    )
  }
}



Login.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {registerUser, newLoginUser})(withRouter(Login));