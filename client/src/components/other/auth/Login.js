import React, { Component } from 'react'
import TextFieldGroup from '../common/TextFieldGroup';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            
            email: '',
            password: '',
            
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
  
    onChange(e) {
        this.setState({[e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
  
        const userData = {
  
          
          email: this.state.email,
          password: this.state.password,
          
        }
        
        this.props.loginUser(userData);
    }

  render() {

    const {errors} = this.state; 

    return (
      <div>
        <div className="login">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to Nector</p>
                <form onSubmit = {this.onSubmit}>
                    <TextFieldGroup 
                        placeholder = "Email Address"
                        name ="email"
                        type = "email"
                        value = {this.state.email}
                        onChange = {this.onChange}
                    />
                    <TextFieldGroup 
                        placeholder = "Password"
                        name ="password"
                        type = "password"
                        value = {this.state.password}
                        onChange = {this.onChange}
                        
                    />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
    loginUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);