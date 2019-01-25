import React, { Component } from 'react'
import {searchByName} from "../../actions/profileActions"
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import PropTypes from 'prop-types';
 class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
       
        name: "",
        
    }
    
    //this.props.addNode("Books", "Conceptual");
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  onSubmit(e){
    e.preventDefault();

    
    //console.log(this.props.interests, "interests here");
    const profileData = {
        name: this.state.name,
        email: this.props.auth.user
    }
    this.props.searchByName(profileData);

    this.setState(prevState => ({
      display2: !prevState.display2
    }))
  }

  onChange(e) {
        
    this.setState({[e.target.name]: e.target.value});

  }

  render() {
    const {display2} = this.state; 
    let d2; 

    if(display2){
      d2 = (
        <div className = " row mt-5 ml-2 mr-2">
        <p className = "ml-2 mr-2">
        It looks like someone has already created a placeholder account for you! 
        Placeholder accounts help users keep up with their IRL friends, even before their 
        friends have created accounts!

    
        </p>
        <p className = "ml-2 mr-2">
           Placeholder accounts may contain some info about you, including who you know, and based on what your friends know about you, 
           but you can expand or edit this information. 

    
        </p>
        <p className = "ml-2 mr-2">
           Click below to go to your profile

    
        </p>
        <div className = "col">
        
          <div className = "btn btn-info" onClick ={() => {
                this.props.history.push("/profile/" + this.props.profile.id);
          }}>Go to profile</div>
        </div>
        </div>
      )
    }else{
      d2 = (
        <div className = "container ">
        <div className = "row">
          <h1 className = "welcome m-auto">Welcome</h1>  
          <p className = "ml-2 mr-2 mt-2 ">My name is Nector, and I am here to help you connect!</p>
          <p className = "ml-4 mr-2 ">What is your name?</p>

          <form  className = "m-auto" onSubmit = {this.onSubmit}>
            <input 

              autoComplete = "new-password"
              type ="text"
              className="form-control form-control-lg m-auto" 
              placeholder="name"
              name="name"
              value = {this.state.name} 
              onChange = {this.onChange}


            />          
            <input type = "submit" value= "Submit" className = "btn btn-info btn-block mt-4"/>
          </form>                     
                                
                                
                                
                                
                                
                               
                               
          
        </div>
        
          
      </div>
      )
    }
    return (
      <div>
        {d2}
      </div>

      
      
    )
  }
}



Welcome.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {searchByName})(withRouter(Welcome));