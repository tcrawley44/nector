import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {createProfile, getInterests, updateProfile} from "../../actions/profileActions";
import Interests from "../add-person/Interests";
import{getTree,test} from "../../actions/treeactions";
import {addNode} from "../../actions/nodeActions";
import "./EditPersonStyles.css";



class EditPerson extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           
            name: "",
            sex: "male",
            age: "",
            
            city: "",
            state: "",
            interests: [],
            bio: "",
            errors: {},
            derr: "",
            newEdit: false
        }
        
        //this.props.addNode("Books", "Conceptual");
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }
    
    componentDidMount(){
        this.props.test();
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({derr: this.derr});
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        
        
    }
    onSubmit(e){
        e.preventDefault();

        
        //console.log(this.props.interests, "interests here");
        const profileData = {
            name: this.props.currName,
            sex: this.state.sex,
            age: this.state.age,
            city: this.state.city,
            state: this.state.state, 
           
            interests: this.state.interests,
            bio: this.state.bio
        }
        console.log(profileData.interests, "interests");
        if(localStorage.user != ""){
            profileData.name = this.props.currName
        }else{
            profileData.name = this.props.currName;
            this.state.newEdit = true; 
        }

        
        console.log(profileData.name);
        //console.log(profileData.name);
        //console.log("what about here");
        
        this.props.updateProfile(profileData, this.props.history);
        
        
        
    }

    getDataFromChild = (dataFromChild) => {
        const mergeTrees = (parentTree, childTree) => {
            let found = false; 
            let searchedAllChildren = false; 
            let i = 1; 
            let atTheEnd = false; 
            console.log(childTree, parentTree);
            if(childTree[1] === undefined || parentTree[i] === undefined){
                atTheEnd = true; 
                console.log("true");
            }
            while(!found && !searchedAllChildren && !atTheEnd){
                console.log("childtree", childTree[1][0], "parenttree", parentTree[i][0])
                console.log("makes it here?")
                if(childTree[1][0] === parentTree[i][0]){
                    found = true; 
                }
                if((parentTree.length != 1)&&(i != (parentTree.length-1))&&(!found)){
                    i = i + 1; 
                }else{
                    searchedAllChildren = true; 
                }

            }
            console.log("makes it here2?")
            if(found){
                console.log("i",i);
                mergeTrees(parentTree[i],childTree[1]);
            }else{
                
                    parentTree.push(childTree[1]);
                
                
            }
        }
        console.log("child being sent: ", dataFromChild)
        if(this.state.interests[0] === undefined){
            this.state.interests.push(dataFromChild);
        }else{
            mergeTrees(this.state.interests[0],dataFromChild)
            console.log(this.state.interests, "after mergeTree");
        }
        
    }

    getUpdateFromChild = () => {
        this.props.test();
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

        if(this.state.newEdit && this.props.auth.id != ""){
            this.props.history.push("/profile/" + this.props.auth.id);
        }

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
            <div className = "edit-person">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-md-8 m-auto">
                            <h1 className = "display-4 text-center text-white">Edit Person</h1>
                            <p className = "lead text-center text-white">
                                enter info
                            </p>
                            <small className = "d-block pb-3 text-white">* = required fields</small>

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
                                
                                
                                
                                
                                {/* <TextAreaFieldGroup 
                                    placeholder = "bio"
                                    name = "bio"
                                    value = {this.state.bio}
                                    onChange = {this.onChange}
                                    error = {errors.bio}
                                    info = "bio"
                                /> */}

                               
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
                            
                            <h1 className = "display-4 text-center text-white">Interests</h1>
                            
                            <Interests updateParent = {this.getUpdateFromChild} sendDataToParent = {this.getDataFromChild} tree2 = {tree.tree} />
                             
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
    interests: PropTypes.object,
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    tree: state.tree,
    interests: state.interests,
    auth: state.auth
});

export default connect(mapStateToProps, {updateProfile, createProfile, addNode, test, getInterests})(withRouter(EditPerson));