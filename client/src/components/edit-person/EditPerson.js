import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {createProfile, getInterests} from "../../actions/profileActions";
import Interests from "../add-person/Interests";
import{getTree,test} from "../../actions/treeactions";
import {addNode} from "../../actions/nodeActions";
import "./EditPersonStyles.css";



class EditPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            name: "",
            sex: "",
            age: "",
            
            city: "",
            state: "",
            interests: [],
            bio: "",
            errors: {}
            
        }
        this.props.test();
        //this.props.addNode("Books", "Conceptual");
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }
    
    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit(e){
        e.preventDefault();

        
        //console.log(this.props.interests, "interests here");
        const profileData = {
            name: this.state.name,
            sex: this.state.sex,
            age: this.state.age,
            city: this.state.city,
            state: this.state.state, 
           
            interests: this.state.interests,
            bio: this.state.bio
        }
        //console.log("what about here");
        this.props.createProfile(profileData, this.props.history);
    }

    getDataFromChild = (dataFromChild) => {
        console.log(dataFromChild);
        //this.state.interests = this.state.interests.push(dataFromChild);
        console.log(this.state.interests[0]);
        //empty
        if(this.state.interests[0] === undefined){
            this.state.interests.push(dataFromChild);
        }else{
            console.log(this.state.interests[1]);
            //same second level
            if(dataFromChild[1][0] === this.state.interests[0][1][0]){
                this.state.interests[0][1].push(dataFromChild[1][1])
            }else{//not same second level
                this.state.interests[0].push(dataFromChild[1]);
            }
        }
        
    }

    onChange(e) {
        
            this.setState({[e.target.name]: e.target.value});
        
    }

    onSelectChange(e) {
        this.setState({status: e.target.value});
        //console.log(this.status);
        //console.log("derp");
    }

    render() {
        const {errors} = this.state; 
        
        const {tree} = this.props; 
        //console.log(tree);
        //console.log("here2");
        //select options for status
        const options = [
            
            {
                label: 'male',
                value: "male"
            },
            
            {label: 'female', value: "female"}
        ];

       

        return (
            <div className = "add-person">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-md-8 m-auto">
                            <h1 className = "display-4 text-center">Edit Person</h1>
                            <p className = "lead text-center">
                                enter info
                            </p>
                            <small className = "d-block pb-3">* = required fields</small>

                            <form  onSubmit = {this.onSubmit}>
                               
                                <TextFieldGroup 
                                    placeholder = "name"
                                    name = "name"
                                    value = {this.state.name}
                                    onChange = {this.onChange}
                                    error = {errors.name}
                                    info = "name"
                                    autoComplete = "off"
                                    
                                />
                                <SelectListGroup 
                                    placeholder = "sex"
                                    name = "sex"
                                    value = {this.state.sex}
                                    onChange = {this.onChange}
                                    options = {options}
                                    error = {errors.sex}
                                    info = "sex"
                                />
                                <TextFieldGroup 
                                    placeholder = "age"
                                    name = "age"
                                    value = {this.state.age}
                                    onChange = {this.onChange}
                                    error = {errors.age}
                                    info = "age"
                                />
                                <TextFieldGroup 
                                    placeholder = "city"
                                    name = "city"
                                    value = {this.state.city}
                                    onChange = {this.onChange}
                                    error = {errors.city}
                                    info = "city"
                                />
                                <TextFieldGroup 
                                    placeholder = "state"
                                    name = "state"
                                    value = {this.state.state}
                                    onChange = {this.onChange}
                                    error = {errors.state}
                                    info = "state"
                                />
                                
                                
                                
                                
                                <TextAreaFieldGroup 
                                    placeholder = "bio"
                                    name = "bio"
                                    value = {this.state.bio}
                                    onChange = {this.onChange}
                                    error = {errors.bio}
                                    info = "bio"
                                />

                               
                                <input type = "submit" value= "Submit" className = "btn btn-info btn-block mt-4"/>
                            </form>   
                        
                        </div>
                    </div>
                </div>
                <br />
                <div className = "interests">
                    <div className = "row">
                        <div className = "col">
                             <br />
                            
                            <h1 className = "display-4 text-center">Interests</h1>
                            
                            <Interests sendDataToParent = {this.getDataFromChild} tree2 = {tree.tree} />
                             
                            <div className = "container">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

EditPerson.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    test: PropTypes.func.isRequired,
    tree: PropTypes.object.isRequired,
    interests: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    tree: state.tree,
    interests: state.interests
});

export default connect(mapStateToProps, {createProfile, addNode, test, getInterests})(withRouter(EditPerson));